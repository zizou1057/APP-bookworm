import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface BookDetailsDialogProps {
  book: BookWithProgress | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookUpdated: () => void;
  onDelete: () => void;
}

const logSchema = z.object({
  pages_read: z.coerce.number().positive({ message: "Pages must be a positive number." }),
  date_read: z.string().min(1, { message: "Date is required." }),
});

const bookDetailsSchema = z.object({
  status: z.enum(["to-read", "reading", "read"]),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  notes: z.string().optional(),
});

export const BookDetailsDialog = ({ book, open, onOpenChange, onBookUpdated, onDelete }: BookDetailsDialogProps) => {
  const [logs, setLogs] = useState<ReadingLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const logForm = useForm<z.infer<typeof logSchema>>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      pages_read: undefined,
      date_read: new Date().toISOString().split('T')[0],
    },
  });

  const detailsForm = useForm<z.infer<typeof bookDetailsSchema>>({
    resolver: zodResolver(bookDetailsSchema),
  });

  const status = detailsForm.watch("status");

  useEffect(() => {
    if (status === 'reading') {
      detailsForm.setValue('end_date', '');
    } else if (status === 'to-read') {
      detailsForm.setValue('start_date', '');
      detailsForm.setValue('end_date', '');
    }
  }, [status, detailsForm]);

  const fetchLogs = async () => {
    if (!book) return;
    setLoadingLogs(true);
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
    setLoadingLogs(false);
  };

  useEffect(() => {
    if (open && book) {
      fetchLogs();
      logForm.reset({
        pages_read: undefined,
        date_read: new Date().toISOString().split('T')[0],
      });
      detailsForm.reset({
        status: book.status,
        start_date: book.start_date || '',
        end_date: book.end_date || '',
        notes: book.notes || '',
      });
    }
  }, [open, book, detailsForm, logForm]);

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
      logForm.reset({
        pages_read: undefined,
        date_read: new Date().toISOString().split('T')[0],
      });
      fetchLogs();
      onBookUpdated();
    }
  }

  async function onDetailsSubmit(values: z.infer<typeof bookDetailsSchema>) {
    if (!book) return;

    const { error } = await supabase
      .from("books")
      .update({
        status: values.status,
        start_date: values.start_date || null,
        end_date: values.end_date || null,
        notes: values.notes || null,
      })
      .eq("id", book.id);

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Book details updated!");
      onBookUpdated();
    }
  }

  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md flex flex-col max-h-[90vh]"> {/* Added flex-col and max-h */}
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>{book.author}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 overflow-y-auto flex-grow pr-2"> {/* Added overflow-y-auto, flex-grow, and pr-2 for scrollbar */}
          {/* Edit Book Details Form */}
          <Form {...detailsForm}>
            <form onSubmit={detailsForm.handleSubmit(onDetailsSubmit)} className="p-4 border rounded-lg space-y-4">
              <h4 className="font-semibold">Edit Details</h4>
              <FormField
                control={detailsForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="to-read">To Read</SelectItem>
                        <SelectItem value="reading">Reading</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                {(status === 'reading' || status === 'read') && (
                  <FormField
                    control={detailsForm.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>Start Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />
                )}
                {status === 'read' && (
                  <FormField
                    control={detailsForm.control}
                    name="end_date"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>End Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <FormField
                control={detailsForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your thoughts, quotes, or summaries..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </Form>

          {/* Log Progress Form */}
          {book.status === 'reading' && (
            <Form {...logForm}>
              <form onSubmit={logForm.handleSubmit(onLogSubmit)} className="p-4 border rounded-lg space-y-4">
                <h4 className="font-semibold">Log Your Progress</h4>
                <div className="flex gap-2">
                  <FormField
                    control={logForm.control}
                    name="pages_read"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormLabel>Pages Read</FormLabel>
                        <FormControl><Input type="number" placeholder="50" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={logForm.control}
                    name="date_read"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">Log</Button>
              </form>
            </Form>
          )}

          {/* Reading History */}
          <div>
            <h4 className="font-semibold mb-2">Reading History</h4>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
              {loadingLogs ? <p>Loading...</p> : logs.length > 0 ? (
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
        <DialogFooter className="mt-4"> {/* Added mt-4 for spacing */}
            <Button variant="destructive" onClick={onDelete}>Delete Book</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};