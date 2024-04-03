export default class AuthUtils {
  static getToken() {
    return localStorage.getItem('token');
  }

  static attachTokenToHeaders(headers: any = {}) {
    const token = AuthUtils.getToken();
    if (token) {
      return {
        ...headers,
        Authorization: `Bearer ${token}`
      };
    }
    return headers;
  }
}
