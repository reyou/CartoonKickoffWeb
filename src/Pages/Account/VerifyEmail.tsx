import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthenticatedRoute from '../../Components/AuthenticatedRoute';
import ErrorPanel from '../../Components/ErrorPanel';
import SuccessPanel from '../../Components/SuccessPanel';
import HttpError from '../../Lib/HttpError';
import Utils from '../../Lib/Utils';
import { ValidationErrorMap } from '../../Lib/ValidationErrorMap';
import PageLayout from '../../PageLayout';
import Http from '../../Services/Http';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    'loading' | 'success' | 'error'
  >('loading');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrorMap>({});
  const [httpError, setHttpError] = useState<HttpError | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const userId = searchParams.get('userId');
    const token = searchParams.get('token');
    if (userId && token) {
      setUserId(userId);
      setToken(token);
      verifyAccount(token, userId);
    } else {
      setVerificationStatus('error');
      setErrorMessages(['No verification token found in the URL.']);
    }
  }, [searchParams]);

  const verifyAccount = async (token: string, userId: string) => {
    try {
      setVerificationStatus('loading');
      setSuccessMessage('');
      setHttpError(null);
      setErrorMessages([]);
      await Utils.sleep();
      const response = await Http.post(`account/verify/email`, {
        token,
        userId
      });
      setVerificationStatus('success');
      setSuccessMessage(response.data.message);
    } catch (error: any) {
      const httpError = error as HttpError;
      setHttpError(httpError);
      const errorMessages = [httpError.message];
      if (httpError.data?.message) {
        errorMessages.push(httpError.data.message);
      }
      setErrorMessages(errorMessages);
      setVerificationStatus('error');
      if (httpError.data?.errors) {
        setErrors(httpError.data?.errors);
      }
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return <p>Verifying your email, please wait...</p>;
      case 'success':
        return <></>;
      case 'error':
        return <h4>Error verifying email</h4>;
    }
  };

  interface VerificationEmailProps {
    errorMessages: string[];
    httpError: HttpError | null;
  }

  const VerificationEmail = ({
    errorMessages,
    httpError
  }: VerificationEmailProps) => {
    if (!errorMessages || errorMessages.length === 0) {
      return <></>;
    }

    const handleRetry = async () => {
      await verifyAccount(userId, token);
    };

    if (httpError && httpError.isNetworkError) {
      return (
        <>
          <button
            onClick={handleRetry}
            className='btn btn-link link-primary'
            style={{
              padding: 0,
              border: 'none',
              backgroundColor: 'transparent',
              verticalAlign: 'baseline'
            }}
          >
            Click here
          </button>
          {` to try again.`}
        </>
      );
    } else if (
      httpError &&
      httpError.data &&
      httpError.data.errorCode === 'ACCOUNT_ALREADY_VERIFIED'
    ) {
      return (
        <>
          <Link to='/account' className='link-primary'>
            Click here
          </Link>{' '}
          {' to access your account.'}
        </>
      );
    }
    return <></>;
  };

  interface LoginLinkProps {
    successMessage: string;
  }

  const SuccessLink = ({ successMessage }: LoginLinkProps) => {
    if (successMessage.length > 0) {
      return (
        <>
          <Link to='/account' className='link-primary'>
            Click here
          </Link>{' '}
          {' to access your account.'}
        </>
      );
    }
    return <></>;
  };

  return (
    <AuthenticatedRoute>
      <PageLayout title='Email verification'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='text-center'>{renderContent()}</div>
            <ErrorPanel
              errorMessages={errorMessages}
              errors={errors}
            ></ErrorPanel>
            <VerificationEmail
              errorMessages={errorMessages}
              httpError={httpError}
            ></VerificationEmail>
            <SuccessPanel successMessage={successMessage}></SuccessPanel>
            <SuccessLink successMessage={successMessage}></SuccessLink>
          </div>
        </div>
      </PageLayout>
    </AuthenticatedRoute>
  );
}
