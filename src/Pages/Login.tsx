import { AxiosResponse } from 'axios';
import { useState, FormEvent } from 'react';
import HttpError from '../Lib/HttpError';
import HttpResponse from '../Lib/HttpResponse';
import PageLayout from '../PageLayout';
import Http from '../Services/Http';

function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage('');
    setSuccessMessage('');
    await sleep(2000);
    let response: HttpResponse | undefined;
    try {
      response = await Http.post('account/login', {
        email,
        password
      });
    } catch (error) {
      const httpError = error as HttpError;
      setErrorMessage(httpError.message);
    } finally {
      if (response) {
        setSuccessMessage(response.data.message);
        setLoginDisabled(true);
        // redirect user to redict
        // but remember only redirect within the site
      }
      setIsLoggingIn(false);
    }
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
            id='email'
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
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          disabled={isLoggingIn || loginDisabled}
          className='btn btn-primary'
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </button>
        {errorMessage && (
          <div className='alert alert-danger mt-3' role='alert'>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className='alert alert-success mt-3' role='alert'>
            {successMessage}
          </div>
        )}
      </form>
    </PageLayout>
  );
}

export default LoginPage;
