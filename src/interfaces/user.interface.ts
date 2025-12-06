export interface UserInterface {
  id?: number;
  name: string;
  last_name: string;
  avatar_url: string;
  email: string;
  business_owner: boolean;
  is_blocked?: boolean;
  plan?: string;
}

export interface UpdateProfileInterface {
  name: string;
  last_name: string;
  avatar?: File;
  business_owner: boolean;
}

export interface ProfileFormState {
  message: unknown;
  success: boolean;
}

export interface UpdatePasswordInterface {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface PatchUserPasswordResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}
