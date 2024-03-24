import { ValidationErrorMap } from '../Lib/ValidationErrorMap';

interface ErrorPanelProps {
  errorMessages: string[];
  errors: ValidationErrorMap;
}

export default function ErrorPanel({ errorMessages, errors }: ErrorPanelProps) {
  return (
    <>
      {errorMessages.length > 0 && (
        <div className='alert alert-danger mt-3' role='alert'>
          <div>
            <strong>Error</strong>
          </div>
          {errorMessages.map((errorMessage, index) => {
            return <div key={index}> {errorMessage}</div>;
          })}
        </div>
      )}
      {Object.entries(errors).map(([field, errorMessages]) => (
        <div key={field}>
          <strong>{field}</strong>
          {errorMessages.map((error, index) => (
            <div key={index} className='alert alert-danger mt-3' role='alert'>
              - {error}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
