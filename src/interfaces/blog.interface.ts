export interface BlogInterface {
  id: number;
  title: string;
  content: string;
  formatted_content?: string[];
  image_url: string;
  created_at: string;
}
