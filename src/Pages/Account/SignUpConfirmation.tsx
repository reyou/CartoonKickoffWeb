import PageLayout from '../../PageLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function SignUpConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  useEffect(() => {
    if (!email) {
      navigate('/', { replace: true });
    }
  }, [email, navigate]);

  return (
    <PageLayout title='Verify Your Account'>
      <p>
        A verification email has been sent to <strong>{email}</strong>. Please
        check your inbox and click on the link provided to activate your
        account.
      </p>
    </PageLayout>
  );
}
