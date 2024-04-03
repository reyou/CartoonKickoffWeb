export default interface AuthContextType {
  authToken: string | null;
  isAuthInitialized: boolean;
  login: (token: string) => void;
  logout: () => void;
}
