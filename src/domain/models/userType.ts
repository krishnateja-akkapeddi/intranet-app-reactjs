export interface UserType {
  userId: number;
  password: string;
  email: string;
  name: string;
  created_date: number;
  updated_date: number;
  enabled: boolean;
  role: Role;
  token?: string;
  profilePic: string;
}
export interface Role {
  roleId: number;
  role: string;
  created_date: number;
  updated_date: number;
}
