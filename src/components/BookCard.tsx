import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookWithProgress } from "@/types";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Trash2, BookOpen, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

interface BookCardProps {
  book: BookWithProgress;
  onClick: () => void;
  onDelete: () => void;
}

const statusVariantMap: { [key: string]: "default" | "secondary" | "outline" | "destructive" | null | undefined } = {
  'read': 'default',
  'reading': 'secondary',
  'to-read': 'outline',
};

const statusTextMap: { [key: string]: string } = {
  'read': 'Leído',
  'reading': 'Leyendo',
  'to-read': 'Por leer',
};

export const BookCard = ({ book, onClick, onDelete }: BookCardProps) => {
  const progress = book.total_pages && book.totalPagesRead > 0
    ? (book.totalPagesRead / book.total_pages) * 100
    : 0;

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardHeader>
        <CardTitle className="truncate">{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {book.status === 'reading' && book.total_pages && (
          <div>
            <div className="flex justify-between items-center mb-1 text-sm text-muted-foreground">
              <span>Progreso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
            <p className="text-xs text-right mt-1 text-muted-foreground">{book.totalPagesRead} / {book.total_pages} páginas</p>
          </div>
        )}
        
        {book.status === 'to-read' && book.total_pages && (
          <div className="text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 flex-shrink-0" />
              <span>{book.total_pages} páginas</span>
            </div>
          </div>
        )}

        {book.status === 'read' && (
          <div className="text-sm text-muted-foreground space-y-2 pt-2">
            {book.total_pages && (
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 flex-shrink-0" />
                <span>{book.total_pages} páginas</span>
              </div>
            )}
            {book.start_date && (
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 flex-shrink-0" />
                <span>Empezado: {new Date(book.start_date).toLocaleDateString()}</span>
              </div>
            )}
            {book.end_date && (
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 flex-shrink-0" />
                <span>Terminado: {new Date(book.end_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant={statusVariantMap[book.status] || 'outline'}>
            {statusTextMap[book.status] || book.status}
          </Badge>
          {book.notes && <MessageSquare className="h-4 w-4 text-muted-foreground" title="Este libro tiene notas" />}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDeleteClick}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  );
};