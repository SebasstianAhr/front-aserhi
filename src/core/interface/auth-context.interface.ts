export interface User {
  identification: string;
  email: string;
  name: string;
  lastName: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}