export interface Profile {
  login: string;
  password: string;
}

export interface TokenData {
  accessToken: string;
  refreshToken: string;
}

export interface UserRegistrationData {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface ProfileData {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}
type Role = "ADMIN" | "USER" | "MODERATOR";
