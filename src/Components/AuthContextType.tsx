export interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}
