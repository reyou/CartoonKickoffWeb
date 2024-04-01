import { Data } from './Data';

export default class HttpError extends Error {
  public statusCode: number;
  public innerException: Error;
  public code: string | undefined;
  public url: string = '';
  public statusText: string | undefined;
  public data: Data | undefined;

  public date: string = '';

  public guid: string = '';
  public type: string = '';
  public title: string = '';
  public traceId: string = '';
  public isNetworkError: boolean = false;

  constructor(
    message: string,
    statusCode: number | undefined,
    innerException: Error
  ) {
    // Pass the message to the base Error class
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.name = innerException.name ?? 'HttpError'; // Set the error name to the class name
    this.innerException = innerException;
    this.statusCode = statusCode ?? -1; // Set the custom property

    // Ensure the prototype is set correctly for subclassing built-in classes like Error
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
