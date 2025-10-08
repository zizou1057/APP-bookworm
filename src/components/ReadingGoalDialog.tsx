import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { showError, showSuccess } from "@/utils/toast";
import { useState } from "react";

const formSchema = z.object({
  target_pages: z.coerce.number().positive({ message: "Las páginas deben ser un número positivo." }),
  period: z.enum(["week", "month"], {
    required_error: "Por favor selecciona un período.",
  }),
});

interface ReadingGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoalSet: () => void;
}

export const ReadingGoalDialog = ({ open, onOpenChange, onGoalSet }: ReadingGoalDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target_pages: undefined,
      period: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      showError("Debes iniciar sesión para establecer una meta.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("reading_goals").upsert({
      user_id: user.id,
      target_pages: values.target_pages,
      period: values.period,
      created_at: new Date().toISOString(),
    }, {
      onConflict: "user_id"
    });

    if (error) {
      showError(error.message);
    } else {
      showSuccess("¡Meta de lectura establecida con éxito!");
      onGoalSet();
      form.reset();
      onOpenChange(false);
    }
    setIsSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Establecer Meta de Lectura</DialogTitle>
          <DialogDescription>
            Define tu objetivo de lectura y te mostraremos cuántas páginas debes leer por día.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="target_pages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de páginas</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ej: 500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un período" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="week">Semana</SelectItem>
                      <SelectItem value="month">Mes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Establecer Meta"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};