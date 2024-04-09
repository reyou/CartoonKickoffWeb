import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { useNavigate } from 'react-router-dom';
import HttpError from '../Lib/HttpError';
import Http from '../Services/Http';
import AuthContextType from './AuthContextType';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    initializeToken();
  }, []);

  const initializeToken = async () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      try {
        await Http.get('account', {
          Authorization: `Bearer ${token}`
        });
        setAuthToken(token);
      } catch (error) {
        const httpError = error as HttpError;
        if (httpError.statusCode === 401) {
          localStorage.removeItem('token');
          setAuthToken(null);
        }
      } finally {
        setIsAuthInitialized(true);
      }
    } else {
      setIsAuthInitialized(true);
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
    setIsAuthInitialized(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    navigate('/logged-out');
  };

  return (
    <AuthContext.Provider
      value={{ authToken, isAuthInitialized, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
