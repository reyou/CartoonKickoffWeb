import { useState, FormEvent, useEffect } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import { useAuth } from '../Components/AuthProvider';
import ErrorPanel from '../Components/ErrorPanel';
import SuccessPanel from '../Components/SuccessPanel';
import HttpError from '../Lib/HttpError';
import HttpResponse from '../Lib/HttpResponse';
import Utils from '../Lib/Utils';
import { ValidationErrorMap } from '../Lib/ValidationErrorMap';
import PageLayout from '../PageLayout';
import Http from '../Services/Http';

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrorMap>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleAuthentication = (token: string) => {
    auth?.login(token);
    const fromQuery = searchParams.get('from');
    const from = fromQuery || '/account';
    navigate(from, { replace: true });
  };

  useEffect(() => {
    if (auth !== null && auth.authToken) {
      handleAuthentication(auth.authToken);
    }
  }, [auth, navigate, searchParams]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoggingIn(true);
    setErrorMessages([]);
    setErrors({});
    setSuccessMessage('');
    await Utils.sleep();
    let response: HttpResponse | undefined;
    try {
      response = await Http.post('account/log-in', {
        email,
        password
      });
      setSuccessMessage(response.data.message);
      setLoginDisabled(true);
      handleAuthentication(response.data.token);
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
      setIsLoggingIn(false);
    }
  };

  return (
    <PageLayout title='Log in'>
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
        <ErrorPanel errorMessages={errorMessages} errors={errors}></ErrorPanel>
        <SuccessPanel successMessage={successMessage}></SuccessPanel>
        <div className='mt-3'>
          <p>
            No account?{' '}
            <Link to='/account/sign-up' className='link-primary'>
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </PageLayout>
  );
}

export default Login;
