import { useState, FormEvent } from 'react';
import PageLayout from '../PageLayout';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Login with:', email, password);
    // Here you would typically handle the login logic,
    // for example sending a request to your backend server.
  };

  return (
    <PageLayout title='Login'>
      <form onSubmit={handleLogin}>
        <div className='mb-3'>
          <label htmlFor='emailInput' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='emailInput'
            aria-describedby='emailHelp'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='passwordInput' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='passwordInput'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary w-100'>
          Login
        </button>
      </form>
    </PageLayout>
  );
}

export default LoginPage;
