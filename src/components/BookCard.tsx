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
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader>
        <CardTitle className="truncate">{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {book.status === 'reading' && book.total_pages && (
          <div>
            <div className="flex justify-between items-center mb-1 text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
            <p className="text-xs text-right mt-1 text-muted-foreground">{book.totalPagesRead} / {book.total_pages} pages</p>
          </div>
        )}
        {book.status === 'read' && book.start_date && book.end_date && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Started:</strong> {new Date(book.start_date).toLocaleDateString()}</p>
            <p><strong>Finished:</strong> {new Date(book.end_date).toLocaleDateString()}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Badge variant={statusVariantMap[book.status] || 'outline'}>
          {book.status.replace('-', ' ')}
        </Badge>
      </CardFooter>
    </Card>
  );
};