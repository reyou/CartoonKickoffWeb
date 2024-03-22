import axios, { AxiosResponse } from 'axios';
import Environment from './Environment';

export default class Http {
  static async post(route: string, body: any): Promise<AxiosResponse> {
    const endpoint = Environment.getEndpoint(route);
    try {
      const response = await axios.post(endpoint, body);
      return response;
    } catch (error) {
      console.error('HTTP error', error);
      throw error;
    }
  }
}
