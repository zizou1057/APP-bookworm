export interface ReadingLog {
  id: string;
  book_id: string;
  date_read: string;
  pages_read: number;
  created_at: string;
}

export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string;
  status: 'to-read' | 'reading' | 'read';
  created_at: string;
  total_pages?: number;
  start_date?: string;
  end_date?: string;
  notes?: string;
}

export interface BookWithProgress extends Book {
  totalPagesRead: number;
}

export interface Profile {
  id: string;
  updated_at?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  gender?: string;
}

export interface ReadingGoal {
  user_id: string;
  target_pages: number;
  period: 'week' | 'month';
  created_at: string;
}