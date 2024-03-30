import axios, { AxiosResponse, isAxiosError } from 'axios';
import HttpError from '../Lib/HttpError';
import HttpResponse from '../Lib/HttpResponse';
import Environment from './Environment';

export default class Http {
  static async get(route: string): Promise<HttpResponse> {
    const endpoint = Environment.getEndpoint(route);
    try {
      const axiosResponse = await axios.get(endpoint);
      const httpResponse = new HttpResponse(
        axiosResponse.status,
        axiosResponse.data.data,
        axiosResponse.data.date,
        axiosResponse.data.guid
      );
      return httpResponse;
    } catch (error) {
      const parsedError = Http.parseError(error);
      throw parsedError;
    }
  }

  static async post(route: string, body: any): Promise<HttpResponse> {
    const endpoint = Environment.getEndpoint(route);
    try {
      const axiosResponse = await axios.post(endpoint, body);
      const httpResponse = new HttpResponse(
        axiosResponse.status,
        axiosResponse.data.data,
        axiosResponse.data.date,
        axiosResponse.data.guid
      );
      return httpResponse;
    } catch (error) {
      const parsedError = Http.parseError(error);
      throw parsedError;
    }
  }

  private static parseError(error: any) {
    if (isAxiosError(error)) {
      let httpError = new HttpError(
        error.message,
        error.response?.status,
        error
      );

      httpError.code = error.code;
      if (error.response?.statusText) {
        httpError.statusText = error.response?.statusText;
        httpError.message += ' - ' + httpError.statusText;
      }

      httpError.url = error.request.responseURL;
      let responseData = error.response?.data;
      if (responseData) {
        if (responseData.data) {
          // Api error
          httpError.data = responseData.data;
          httpError.type = responseData.type;
          httpError.date = responseData.date;
          httpError.guid = responseData.guid;
        } else {
          // Framework error
          httpError.type = responseData.type;
          httpError.title = responseData.title;
          httpError.statusCode = responseData.status;
          httpError.traceId = responseData.traceId;
          httpError.data = responseData;
        }
      }
      return httpError;
    } else if (error instanceof Error) {
      let httpError = new HttpError('An unexpected error occurred', -1, error);
      return httpError;
    }
    return new HttpError(
      'An unknown error occurred',
      -1,
      new Error('Unknown error.')
    );
  }
}
