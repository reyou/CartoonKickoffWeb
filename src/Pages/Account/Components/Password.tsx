import { useEffect, useState } from 'react';
import ErrorPanel from '../../../Components/ErrorPanel';
import SuccessPanel from '../../../Components/SuccessPanel';
import Utils from '../../../Lib/Utils';
import { ValidationErrorMap } from '../../../Lib/ValidationErrorMap';

// Define a type for the user profile data
type UserProfile = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Password() {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrorMap>({});
  const [successMessage, setSuccessMessage] = useState('');

  // State to hold the user's profile data
  const [profile, setProfile] = useState<UserProfile>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {}, [profile]);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessages([]);
    setErrors({});
    setSuccessMessage('');
    // Check if new password and confirm password match
    if (profile.newPassword !== profile.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Here you would handle updating the user's profile
    console.log('Updating profile:', profile);
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
        Update Password
      </button>
      <ErrorPanel errorMessages={errorMessages} errors={errors}></ErrorPanel>
      <SuccessPanel successMessage={successMessage}></SuccessPanel>
    </form>
  );
}
