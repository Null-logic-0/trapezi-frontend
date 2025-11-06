export interface MyFoodPlaceInterface {
  id: number;
  business_name: string;
  categories: string[];
  address: string;
  images_url: string[];
}

export interface BusinessInterface {
  id?: number;
  business_name: string;
  categories: string[];
  address: string;
  images: File[];
  images_url?: string[];
  menu_pdf?: File | null;
  menu_url?: string;
  description: string;
  website: string;
  facebook: string;
  tiktok: string;
  instagram: string;
}

export interface BusinessFormState {
  success: boolean;
  message: string;
  values?: {
    business_name?: string;
    categories?: string[];
    address?: string;
    images?: File[];
    menu_pdf?: File | null;
    description?: string;
    website?: string;
    facebook?: string;
    tiktok?: string;
    instagram?: string;
  };
  fieldErrors?: Record<string, string>;
}

export interface CreateBusinessResponse {
  success: boolean;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  errors?: Record<string, string[]>;
}
