import axios, { AxiosResponse } from 'axios';
import Environment from './Environment';

export default class Http {
  static async post(route: string, body: any): Promise<AxiosResponse> {
    const endpoint = Environment.getEndpoint(route);
    try {
      const response = await axios.post(endpoint, body);
      return response;
    } catch (error) {
      console.log({
        file: __filename,
        function: 'HTTP error',
        error,
        guid: 'f924863a-e72c-4029-a4b0-515fc1281da8'
      });
      throw error;
    }
  }
}
