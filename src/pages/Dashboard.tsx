import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { AddBookDialog } from "@/components/AddBookDialog";
import { BookCard } from "@/components/BookCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Book } from "@/types";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching books:", error);
    } else {
      setBooks(data as Book[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    fetchBooks();
  }, [fetchBooks]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <AddBookDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onBookAdded={fetchBooks}
      />
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto p-4 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Library</h1>
              <p className="text-sm text-primary-foreground/80">{user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => setIsDialogOpen(true)} variant="secondary">Add Book</Button>
              <Button onClick={handleLogout} variant="ghost" className="hover:bg-primary-foreground/20 hover:text-primary">Logout</Button>
            </div>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h2 className="text-xl font-semibold">Your library is empty</h2>
              <p className="text-muted-foreground mt-2">Add your first book to get started.</p>
              <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>Add Book</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
      </main>
    </>
  );
};

export default Dashboard;