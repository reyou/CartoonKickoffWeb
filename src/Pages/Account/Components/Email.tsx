import { useEffect, useState } from 'react';
import ErrorPanel from '../../../Components/ErrorPanel';
import SuccessPanel from '../../../Components/SuccessPanel';
import HttpError from '../../../Lib/HttpError';
import Utils from '../../../Lib/Utils';
import { ValidationErrorMap } from '../../../Lib/ValidationErrorMap';
import Http from '../../../Services/Http';

export default function Email() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrorMap>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await Http.get('account/profile');
        setEmail(response.data.email);
      } catch (error) {
        const httpError = error as HttpError;
        const errorMessages = [httpError.message];
        if (httpError.data?.message) {
          errorMessages.push(httpError.data.message);
        }
        setErrorMessages(errorMessages);
        if (httpError.data?.errors) {
          setErrors(httpError.data?.errors);
        }
      }
    };
    getUserProfile();
  }, []);

  // Function to handle changes in form inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewEmail(value);
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsExecuting(true);
    setErrorMessages([]);
    setErrors({});
    setSuccessMessage('');

    if (email === newEmail && 'adsf'.length > 10) {
      setErrorMessages([
        'The new email address must be different from the current email address.'
      ]);
      return;
    }

    try {
      await Utils.sleep();
      const response = await Http.put('account/email', {
        email: newEmail
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      const httpError = error as HttpError;
      const errorMessages = [httpError.message];
      if (httpError.data?.message) {
        errorMessages.push(httpError.data.message);
      }
      setErrorMessages(errorMessages);
      if (httpError.data?.errors) {
        setErrors(httpError.data?.errors);
      }
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Primary email address
        </label>
        <input
          type='email'
          className='form-control'
          id='current-email'
          name='currentEmail'
          value={email}
          disabled
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='newEmail' className='form-label'>
          New email address
        </label>
        <input
          type='email'
          className='form-control'
          id='newEmail'
          name='newEmail'
          value={newEmail}
          onChange={handleChange}
          maxLength={254}
          required
        />
      </div>
      <button type='submit' disabled={isExecuting} className='btn btn-primary'>
        {isExecuting ? 'Updating email...' : 'Update email'}
      </button>
      <ErrorPanel errorMessages={errorMessages} errors={errors}></ErrorPanel>
      <SuccessPanel successMessage={successMessage}></SuccessPanel>
    </form>
  );
}
