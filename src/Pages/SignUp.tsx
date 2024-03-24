import { FormEvent, useState } from 'react';
import PageLayout from '../PageLayout';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // You should add form validation here.
    // For example, check if passwords match and if the email format is correct.
    // Then you can proceed to submit the form data.
  };

  return (
    <PageLayout title='Sign up'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='emailInput' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='passwordInput' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='verifyPasswordInput' className='form-label'>
            Verify Password
          </label>
          <input
            type='password'
            className='form-control'
            id='verifyPassword'
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Sign up
        </button>
      </form>
    </PageLayout>
  );
}
