export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string;
  status: 'to-read' | 'reading' | 'read';
  created_at: string;
}