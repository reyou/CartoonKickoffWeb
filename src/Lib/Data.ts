import { ValidationErrorMap } from './ValidationErrorMap';

export type Data = {
  type: string;
  title?: string;
  status?: number;
  errors?: ValidationErrorMap;
  traceId?: string;
  message: string;
  errorCode: string;
};
