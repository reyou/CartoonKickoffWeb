import React, { useState } from 'react';
import ErrorPanel from '../../../Components/ErrorPanel';
import SuccessPanel from '../../../Components/SuccessPanel';
import HttpError from '../../../Lib/HttpError';
import Utils from '../../../Lib/Utils';
import { ValidationErrorMap } from '../../../Lib/ValidationErrorMap';
import Http from '../../../Services/Http';
import styles from './Password.module.css';

export default function Password() {
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrorMap>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessages([]);
    setErrors({});
    setSuccessMessage('');
    // Check if new password and confirm password match
    if (password !== verifyPassword) {
      setErrorMessages(['Passwords must be identical.']);
      return;
    }

    if (Utils.getPasswordStrength(password) < 5) {
      setErrorMessages([
        'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
      ]);
      return;
    }

    try {
      await Utils.sleep();
      const response = await Http.put('account/password', {
        password,
        verifyPassword
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
    }
  };

  // Function to handle changes in form inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    const strength = Utils.getPasswordStrength(event.target.value);
    setPasswordStrength(strength);
  };

  const handleVerifyPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerifyPassword(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='newPassword' className='form-label'>
          New Password
        </label>
        <div className='text-muted small mb-2'>
          Leave blank if you wish to keep your current password.
        </div>
        <input
          type='password'
          className='form-control'
          id='password'
          name='password'
          value={password}
          onChange={handleChange}
        />
        <div
          className={`mt-2 ${styles.passwordStrengthMessage} ${
            styles[`strength${passwordStrength}`]
          }`}
        >
          {Utils.passwordStrengthMessage(passwordStrength)}
        </div>
      </div>
      <div className='mb-3'>
        <label htmlFor='verifyPassword' className='form-label'>
          Confirm New Password
        </label>
        <input
          type='password'
          className='form-control'
          id='verifyPassword'
          name='verifyPassword'
          value={verifyPassword}
          onChange={handleVerifyPasswordChange}
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Update Password
      </button>
      <ErrorPanel errorMessages={errorMessages} errors={errors} />
      <SuccessPanel successMessage={successMessage} />
    </form>
  );
}
