import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { useNavigate } from 'react-router-dom';
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
        localStorage.removeItem('token');
      } finally {
        setIsAuthInitialized(true);
      }
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
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
