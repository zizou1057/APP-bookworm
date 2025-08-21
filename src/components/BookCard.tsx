import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookWithProgress } from "@/types";
import { Progress } from "@/components/ui/progress";

interface BookCardProps {
  book: BookWithProgress;
  onClick: () => void;
}

const statusVariantMap: { [key: string]: "default" | "secondary" | "outline" | "destructive" | null | undefined } = {
  'read': 'default',
  'reading': 'secondary',
  'to-read': 'outline',
};

export const BookCard = ({ book, onClick }: BookCardProps) => {
  const progress = book.total_pages && book.totalPagesRead > 0
    ? (book.totalPagesRead / book.total_pages) * 100
    : 0;

  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="truncate">{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>
      {book.status === 'reading' && book.total_pages && (
        <CardContent>
          <div className="flex justify-between items-center mb-1 text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
          <p className="text-xs text-right mt-1 text-muted-foreground">{book.totalPagesRead} / {book.total_pages} pages</p>
        </CardContent>
      )}
      <CardFooter>
        <Badge variant={statusVariantMap[book.status] || 'outline'}>
          {book.status.replace('-', ' ')}
        </Badge>
      </CardFooter>
    </Card>
  );
};