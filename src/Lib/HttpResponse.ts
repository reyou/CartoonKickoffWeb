export default class HttpResponse {
  public data: any;
  public statusCode: number;
  public date: string;
  public guid: string;

  constructor(statusCode: number, data: any, date: string, guid: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.date = date;
    this.guid = guid;
  }
}
