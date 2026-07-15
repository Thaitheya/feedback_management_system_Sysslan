import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  userName: string | null;
  role: string | null;

  login: (token: string, userName: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);