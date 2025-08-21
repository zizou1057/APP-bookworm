import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { AddBookDialog } from "@/components/AddBookDialog";
import { BookCard } from "@/components/BookCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Book, BookWithProgress } from "@/types";
import { BookDetailsDialog } from "@/components/BookDetailsDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { showError, showSuccess } from "@/utils/toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<BookWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookWithProgress | null>(null);
  const [bookToDelete, setBookToDelete] = useState<BookWithProgress | null>(null);

  const fetchBooksAndProgress = useCallback(async () => {
    setLoading(true);
    const { data: booksData, error: booksError } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (booksError) {
      console.error("Error fetching books:", booksError);
      setLoading(false);
      return;
    }

    const { data: logsData, error: logsError } = await supabase
      .from("reading_logs")
      .select("book_id, pages_read");

    if (logsError) {
      console.error("Error fetching logs:", logsError);
    }

    const progressMap = new Map<string, number>();
    if (logsData) {
      for (const log of logsData) {
        const current = progressMap.get(log.book_id) || 0;
        progressMap.set(log.book_id, current + log.pages_read);
      }
    }

    const booksWithProgress = (booksData as Book[]).map(book => ({
      ...book,
      totalPagesRead: progressMap.get(book.id) || 0,
    }));

    setBooks(booksWithProgress);
    setLoading(false);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    fetchBooksAndProgress();
  }, [fetchBooksAndProgress]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleBookClick = (book: BookWithProgress) => {
    setSelectedBook(book);
    setIsDetailsDialogOpen(true);
  };

  const handleDeleteRequest = (book: BookWithProgress) => {
    setBookToDelete(book);
  };

  const confirmDelete = async () => {
    if (!bookToDelete) return;

    const { error } = await supabase.from("books").delete().eq("id", bookToDelete.id);

    if (error) {
      showError(error.message);
    } else {
      showSuccess(`"${bookToDelete.title}" was deleted.`);
      fetchBooksAndProgress();
    }
    setBookToDelete(null);
    setIsDetailsDialogOpen(false); // Close details dialog if open
  };

  return (
    <>
      <AddBookDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onBookAdded={fetchBooksAndProgress}
      />
      {selectedBook && (
        <BookDetailsDialog
          book={selectedBook}
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
          onBookUpdated={() => {
            fetchBooksAndProgress();
            const updatedBook = books.find(b => b.id === selectedBook?.id);
            if (updatedBook) setSelectedBook(updatedBook);
          }}
          onDelete={() => handleDeleteRequest(selectedBook)}
        />
      )}
      <AlertDialog open={!!bookToDelete} onOpenChange={() => setBookToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete "{bookToDelete?.title}" and all of its reading logs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto p-4 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Library</h1>
              <p className="text-sm text-primary-foreground/80">{user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => setIsAddDialogOpen(true)} variant="secondary">Add Book</Button>
              <Button onClick={handleLogout} variant="ghost" className="hover:bg-primary-foreground/20 hover:text-primary">Logout</Button>
            </div>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[150px] w-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h2 className="text-xl font-semibold">Your library is empty</h2>
              <p className="text-muted-foreground mt-2">Add your first book to get started.</p>
              <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>Add Book</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onClick={() => handleBookClick(book)}
                  onDelete={() => handleDeleteRequest(book)}
                />
              ))}
            </div>
          )}
      </main>
    </>
  );
};

export default Dashboard;