export interface BusinessInterface {
  id?: number;
  business_name: string;
  categories: string[];
  address: string;
  images: File[];
  images_url?: string[];
  menu_pdf?: File | null;
  document_pdf?: File | null;
  menu_url?: string;
  document_url?: string;
  phone?: string;
  description: string;
  working_schedule?: string;
  working_schedule_readable?: string;
  website: string;
  facebook: string;
  tiktok: string;
  instagram: string;
  is_vip?: boolean;
  latitude?: number;
  longitude?: number;
  average_rating?: number;
  currently_open?: boolean;
  identification_code?: string;
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
