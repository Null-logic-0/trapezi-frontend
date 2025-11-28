import { TutorialInterface } from "@/interfaces/tutorial.interface";

export type Tutorials = {
  tutorials: TutorialInterface[];
  pagination: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_count: number;
  };
};
