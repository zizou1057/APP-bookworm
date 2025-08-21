import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { BookWithProgress, ReadingLog } from "@/types";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { showError, showSuccess } from "@/utils/toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

interface BookDetailsDialogProps {
  book: BookWithProgress | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookUpdated: () => void;
}

const logSchema = z.object({
  pages_read: z.coerce.number().positive({ message: "Pages must be a positive number." }),
  date_read: z.string().min(1, { message: "Date is required." }),
});

export const BookDetailsDialog = ({ book, open, onOpenChange, onBookUpdated }: BookDetailsDialogProps) => {
  const [logs, setLogs] = useState<ReadingLog[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof logSchema>>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      pages_read: undefined,
      date_read: new Date().toISOString().split('T')[0],
    },
  });

  const fetchLogs = async () => {
    if (!book) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("reading_logs")
      .select("*")
      .eq("book_id", book.id)
      .order("date_read", { ascending: false });

    if (error) {
      showError("Failed to fetch reading logs.");
    } else {
      setLogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && book) {
      fetchLogs();
      form.reset({
        pages_read: undefined,
        date_read: new Date().toISOString().split('T')[0],
      });
    }
  }, [open, book]);

  const handleStatusChange = async (status: 'reading' | 'read') => {
    if (!book) return;
    
    const updates: Partial<BookWithProgress> = { status };
    const today = new Date().toISOString().split('T')[0];

    if (status === 'reading' && !book.start_date) {
      updates.start_date = today;
    } else if (status === 'read' && !book.end_date) {
      updates.end_date = today;
    }

    const { error } = await supabase.from("books").update(updates).eq("id", book.id);
    if (error) {
      showError(error.message);
    } else {
      showSuccess(`Book status updated to ${status}!`);
      onBookUpdated();
    }
  };

  async function onLogSubmit(values: z.infer<typeof logSchema>) {
    if (!book) return;

    const { error } = await supabase.from("reading_logs").insert({
      book_id: book.id,
      pages_read: values.pages_read,
      date_read: values.date_read,
    });

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Progress logged!");
      form.reset({
        pages_read: undefined,
        date_read: new Date().toISOString().split('T')[0],
      });
      fetchLogs();
      onBookUpdated();
    }
  }

  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>{book.author}</DialogDescription>
        </DialogHeader>
        
        {(book.start_date || book.end_date) && (
          <div className="flex justify-between text-sm text-muted-foreground border-b pb-2">
            {book.start_date && <span>Started: <strong>{new Date(book.start_date).toLocaleDateString()}</strong></span>}
            {book.end_date && <span>Finished: <strong>{new Date(book.end_date).toLocaleDateString()}</strong></span>}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex gap-2">
            {book.status === 'to-read' && <Button onClick={() => handleStatusChange('reading')}>Start Reading</Button>}
            {book.status === 'reading' && <Button onClick={() => handleStatusChange('read')}>Finish Book</Button>}
          </div>
          
          {book.status === 'reading' && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onLogSubmit)} className="p-4 border rounded-lg space-y-4">
                <h4 className="font-semibold">Log Your Progress</h4>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="pages_read"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>Pages Read</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date_read"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">Log</Button>
              </form>
            </Form>
          )}

          <div>
            <h4 className="font-semibold mb-2">Reading History</h4>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
              {loading ? <p>Loading...</p> : logs.length > 0 ? (
                logs.map(log => (
                  <div key={log.id} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
                    <span>Read <strong>{log.pages_read}</strong> pages</span>
                    <span className="text-muted-foreground">{new Date(log.date_read).toLocaleDateString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No reading history yet.</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};