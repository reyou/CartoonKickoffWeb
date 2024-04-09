import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface AuthenticatedRouteProps {
  children: JSX.Element;
}

export default function AuthenticatedRoute({
  children
}: AuthenticatedRouteProps): JSX.Element | null {
  let auth = useAuth();
  let location = useLocation();

  if (auth && !auth.isAuthInitialized) {
    return <div>Loading...</div>;
  }

  if (auth && !auth.authToken) {
    const redirectUrl = `${location.pathname}${location.search}`;
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);
    return (
      <Navigate to={`/account/log-in?redirect=${encodedRedirectUrl}`} replace />
    );
  }

  return children;
}
