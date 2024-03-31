import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorPanel from '../../Components/ErrorPanel';
import SuccessPanel from '../../Components/SuccessPanel';
import HttpError from '../../Lib/HttpError';
import Utils from '../../Lib/Utils';
import { ValidationErrorMap } from '../../Lib/ValidationErrorMap';
import PageLayout from '../../PageLayout';
import Http from '../../Services/Http';

export default function Verify() {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    'loading' | 'success' | 'error'
  >('loading');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ValidationErrorMap>({});

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    if (token && userId) {
      verifyAccount(token, userId);
    } else {
      setVerificationStatus('error');
      setErrorMessages(['No verification token found in the URL.']);
    }
  }, [searchParams]);

  const verifyAccount = async (token: string, userId: string) => {
    try {
      await Utils.sleep();
      // Replace with your actual API endpoint
      const response = await Http.post(`account/verify`, {
        token,
        userId
      });
      setVerificationStatus('success');
      setSuccessMessage(response.data.message);
    } catch (error: any) {
      const httpError = error as HttpError;
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
        return <p>Verifying your account, please wait...</p>;
      case 'success':
        return <></>;
      case 'error':
        return <h4>Error verifying account</h4>;
    }
  };

  interface VerificationEmailProps {
    errorMessages: string[];
  }

  const VerificationEmail = ({ errorMessages }: VerificationEmailProps) => {
    const navigate = useNavigate();
    if (!errorMessages || errorMessages.length === 0) {
      return <></>;
    }

    const handleSignUpClick = () => {
      navigate('/account/sign-up', { replace: true });
    };

    return (
      <p>
        <button
          onClick={handleSignUpClick}
          className='btn btn-link link-primary'
          style={{
            padding: 0,
            border: 'none',
            backgroundColor: 'transparent',
            verticalAlign: 'baseline'
          }}
        >
          Click here
        </button>{' '}
        to sign up again with your email address.
      </p>
    );
  };

  return (
    <PageLayout title='Account verification'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='text-center'>{renderContent()}</div>
          <ErrorPanel
            errorMessages={errorMessages}
            errors={errors}
          ></ErrorPanel>
          <VerificationEmail errorMessages={errorMessages}></VerificationEmail>
          <SuccessPanel successMessage={successMessage}></SuccessPanel>
        </div>
      </div>
    </PageLayout>
  );
}
