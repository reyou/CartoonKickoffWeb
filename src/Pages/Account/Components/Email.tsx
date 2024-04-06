import { useEffect, useState } from 'react';
import ErrorPanel from '../../../Components/ErrorPanel';
import SuccessPanel from '../../../Components/SuccessPanel';
import HttpError from '../../../Lib/HttpError';
import Utils from '../../../Lib/Utils';
import { ValidationErrorMap } from '../../../Lib/ValidationErrorMap';
import Http from '../../../Services/Http';

// Define a type for the user profile data
type UserProfile = {
  email: string;
  newEmail: string;
};

export default function Email() {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrorMap>({});
  const [successMessage, setSuccessMessage] = useState('');

  // State to hold the user's profile data
  const [profile, setProfile] = useState<UserProfile>({
    email: '',
    newEmail: ''
  });

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await Http.get('account/profile');
        setProfile({
          ...profile,
          email: response.data.email
        });
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

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessages([]);
    setErrors({});
    setSuccessMessage('');

    if (profile.email === profile.newEmail) {
      setErrorMessages([
        'The new email address must be different from the current email address.'
      ]);
      return;
    }

    await Utils.sleep();
    setSuccessMessage('Success! - Replace this message: response.data.message');
  };

  // Function to handle changes in form inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
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
          value={profile.email}
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
          value={profile.newEmail}
          onChange={handleChange}
          maxLength={254}
          required
        />
      </div>
      <button type='submit' className='btn btn-primary'>
        Update Email
      </button>
      <ErrorPanel errorMessages={errorMessages} errors={errors}></ErrorPanel>
      <SuccessPanel successMessage={successMessage}></SuccessPanel>
    </form>
  );
}
