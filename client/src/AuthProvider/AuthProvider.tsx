import { useState } from "react";
import { AuthContext } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("userName")
  );

  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role")
  );

  const login = (
    token: string,
    userName: string,
    role: string
  ) => {

    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("role", role);

    setToken(token);
    setUserName(userName);
    setRole(role);
  };

  const logout = () => {

    localStorage.clear();

    setToken(null);
    setUserName(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userName,
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}