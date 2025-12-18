export interface Reviews {
  id?: number;
  comment: string;
  rating: number;

  user?: {
    id: number;
    name: string;
    last_name: string;
  };
}

export interface CreateReview {
  comment: string;
  rating: number;
}

export interface ReviewFormState {
  message: unknown;
  success: boolean;
}
