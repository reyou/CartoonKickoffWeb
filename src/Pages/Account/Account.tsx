import React, { useState, useEffect } from 'react';
import PageLayout from '../../PageLayout';

// Define a type for the user profile data
type UserProfile = {
  email: string;
  username: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Account() {
  // State to hold the user's profile data
  const [profile, setProfile] = useState<UserProfile>({
    email: '',
    username: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Here you would fetch the user's profile data from your API
    // For demonstration, I'm using placeholder values
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
  );
}
