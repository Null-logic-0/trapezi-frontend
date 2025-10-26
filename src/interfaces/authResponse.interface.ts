export interface AuthResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
}

export interface AuthFormState {
    success: boolean;
    message: string;
    values?: {
        name?: string,
        last_name?: string,
        email: string,
    }
    fieldErrors?: Record<string, string>;

}

export interface CreateUserResponse {
    success: boolean;
    message?: string;
    data?: any;
    errors?: Record<string, string[]>;
}
