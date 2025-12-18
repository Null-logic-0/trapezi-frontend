import { BusinessInterface } from "@/interfaces/places.interface";

export type Places = {
  places: BusinessInterface[];
  pagination: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_count: number;
  };
};
