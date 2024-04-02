import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorPanel from '../../Components/ErrorPanel';
import SuccessPanel from '../../Components/SuccessPanel';
import HttpError from '../../Lib/HttpError';
import HttpResponse from '../../Lib/HttpResponse';
import Utils from '../../Lib/Utils';
import { ValidationErrorMap } from '../../Lib/ValidationErrorMap';
import PageLayout from '../../PageLayout';
import Http from '../../Services/Http';

const checkPasswordStrength = (password: string): boolean => {
  // Define the minimum password length.
  const minLength = 8;

  // Regular expressions for various character types.
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumbers = /[0-9]/;
  const hasNonAlphanumerics = /[\W_]/;

  // Check the strength of the password against the criteria.
  return (
    password.length >= minLength &&
    hasUpperCase.test(password) &&
    hasLowerCase.test(password) &&
    hasNumbers.test(password) &&
    hasNonAlphanumerics.test(password)
  );
};

export default function SignUp() {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpDisabled, setSignUpDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordStrengthError, setPasswordStrengthError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrorMap>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordMatchError(false);
    setPasswordStrengthError(false);
    setIsSigningUp(true);
    await Utils.sleep();

    if (password !== verifyPassword) {
      setPasswordMatchError(true);
      setIsSigningUp(false);
      return;
    }

    if (!checkPasswordStrength(password)) {
      setPasswordStrengthError(true);
      setIsSigningUp(false);
      return;
    }

    let response: HttpResponse | undefined;
    try {
      response = await Http.post('account/sign-up', {
        email,
        password,
        verifyPassword
      });
      setSuccessMessage(response.data.message);
      setSignUpDisabled(true);
      await Utils.sleep();
      navigate('/account/sign-up-confirmation', {
        replace: true,
        state: { email: email }
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
    } finally {
      setIsSigningUp(false);
    }

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
        {passwordStrengthError && (
          <ErrorPanel
            errorMessages={[
              'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
            ]}
            errors={{}}
          ></ErrorPanel>
        )}
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
        {passwordMatchError && (
          <ErrorPanel
            errorMessages={['Passwords must be identical.']}
            errors={{}}
          ></ErrorPanel>
        )}
        <button
          type='submit'
          disabled={isSigningUp || signUpDisabled}
          className='btn btn-primary'
        >
          {isSigningUp ? 'Signing up...' : 'Sign up'}
        </button>
        <ErrorPanel errorMessages={errorMessages} errors={errors}></ErrorPanel>
        <SuccessPanel successMessage={successMessage}></SuccessPanel>
        <div className='mt-3'>
          <p>
            Already signed up?{' '}
            <Link to='/account/log-in' className='link-primary'>
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </PageLayout>
  );
}
