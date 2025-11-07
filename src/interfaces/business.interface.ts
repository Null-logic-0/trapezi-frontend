type Business = {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  isOpen: boolean;
  isVIP?: boolean;
};

export interface BusinessProps {
  businesses: Business[];
}
