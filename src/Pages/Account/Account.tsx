import React, { useState, useEffect } from 'react';
import AuthenticatedRoute from '../../Components/AuthenticatedRoute';
import HttpError from '../../Lib/HttpError';
import { ValidationErrorMap } from '../../Lib/ValidationErrorMap';
import PageLayout from '../../PageLayout';
import Http from '../../Services/Http';

// Define a type for the user profile data
type UserProfile = {
  email: string;
  username: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Account() {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrorMap>({});

  // State to hold the user's profile data
  const [profile, setProfile] = useState<UserProfile>({
    email: '',
    username: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await Http.get('account/profile');
        console.log({
          file: __filename,
          function: 'functionName',
          response,
          guid: 'a1f59fe8-783a-495f-a71b-23abbccbc21f'
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
    setProfile({
      email: 'user@example.com',
      username: 'username',
      newPassword: '', // Passwords should never be displayed or fetched in plain text
      confirmPassword: '' // Passwords should never be displayed or fetched in plain text
    });
  }, []);

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if new password and confirm password match
    if (profile.newPassword !== profile.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Here you would handle updating the user's profile
    console.log('Updating profile:', profile);
  };

  // Function to handle changes in form inputs
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <AuthenticatedRoute>
      <PageLayout title='Account'>
        <div className='container my-4'>
          <h3>Profile Information</h3>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                type='text'
                className='form-control'
                id='username'
                name='username'
                value={profile.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                New Password (leave blank if you do not want to change it)
              </label>
              <input
                type='password'
                className='form-control'
                id='newPassword'
                name='newPassword'
                value={profile.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='confirmPassword' className='form-label'>
                Verify New Password
              </label>
              <input
                type='password'
                className='form-control'
                id='confirmPassword'
                name='confirmPassword'
                value={profile.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Update Profile
            </button>
          </form>
        </div>
      </PageLayout>
    </AuthenticatedRoute>
  );
}
