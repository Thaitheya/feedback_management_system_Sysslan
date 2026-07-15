export interface RegisterRequest {
    userName: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN";
}

export interface AuthenticationResponse {
  token: string;
  userName: string;
  role: "USER" | "ADMIN";
}


export interface LoginRequest {
    userName: string;
    password: string;
}

