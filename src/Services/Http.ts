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
        console.log({
          file: __filename,
          function: 'functionName',
          httpError,
          guid: '6eff766e-0f9b-4119-a966-fc6178888a63'
        });
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
