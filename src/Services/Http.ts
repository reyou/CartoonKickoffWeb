import axios, { AxiosResponse, isAxiosError } from 'axios';
import HttpError from '../Lib/HttpError';
import HttpResponse from '../Lib/HttpResponse';
import Environment from './Environment';

export default class Http {
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
      if (isAxiosError(error)) {
        let httpError = new HttpError(
          error.message,
          error.response?.status,
          error
        );
        httpError.code = error.code;
        httpError.statusText = error.response?.statusText;
        httpError.url = error.request.responseURL;
        throw httpError;
      } else if (error instanceof Error) {
        let httpError = new HttpError(
          'An unexpected error occurred',
          -1,
          error
        );
        throw httpError;
      }
      throw new HttpError(
        'An unknown error occurred',
        -1,
        new Error('Unknown error.')
      );
    }
  }
}
