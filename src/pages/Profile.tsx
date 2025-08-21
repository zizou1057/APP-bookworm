import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showError, showSuccess } from "@/utils/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Book, Profile as ProfileType } from "@/types";
import { BookOpen, BookCheck, BookPlus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const profileFormSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  country: z.string().optional(),
  gender: z.string().optional(),
});

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      country: "",
      gender: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116: row not found
          showError("Error fetching profile: " + profileError.message);
        } else if (profileData) {
          setProfile(profileData);
          form.reset(profileData);
        }

        // Fetch books for stats
        const { data: booksData, error: booksError } = await supabase
          .from("books")
          .select("status")
          .eq("user_id", user.id);
        
        if (booksError) {
          showError("Error fetching books: " + booksError.message);
        } else {
          setBooks(booksData || []);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [form]);

  const bookStats = useMemo(() => {
    return books.reduce((acc, book) => {
      if (book.status === 'read') acc.read++;
      if (book.status === 'reading') acc.reading++;
      if (book.status === 'to-read') acc.toRead++;
      return acc;
    }, { read: 0, reading: 0, toRead: 0 });
  }, [books]);

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    if (!user) return;

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...values,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Profile updated successfully!");
    }
  }

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`;
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-8 max-w-2xl">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-24 w-full mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="container mx-auto p-4 md:p-8 max-w-2xl">
        <div className="mb-4">
          <Button asChild variant="outline">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Regresar a la biblioteca
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.email}`} alt="User avatar" />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{profile?.first_name || 'User'} Profile</CardTitle>
            <CardDescription>View and edit your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="first_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl><Input placeholder="Tu nombre" {...field} /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="last_name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl><Input placeholder="Tu apellido" {...field} /></FormControl>
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <FormControl><Input placeholder="Tu país" {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Género</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Selecciona tu género" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="male">Masculino</SelectItem>
                        <SelectItem value="female">Femenino</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefiero no decirlo</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
                <div>
                  <FormLabel>Correo</FormLabel>
                  <Input value={user?.email} disabled className="mt-2 bg-muted" />
                </div>
                <Button type="submit" className="w-full">Guardar Cambios</Button>
              </form>
            </Form>

            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold text-center mb-4">LIBROS AGREGADOS</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Card className="p-4">
                    <BookCheck className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <p className="text-2xl font-bold">{bookStats.read}</p>
                    <p className="text-sm text-muted-foreground">Leídos</p>
                  </Card>
                </div>
                <div>
                  <Card className="p-4">
                    <BookOpen className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <p className="text-2xl font-bold">{bookStats.reading}</p>
                    <p className="text-sm text-muted-foreground">Leyendo</p>
                  </Card>
                </div>
                <div>
                  <Card className="p-4">
                    <BookPlus className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                    <p className="text-2xl font-bold">{bookStats.toRead}</p>
                    <p className="text-sm text-muted-foreground">Por Leer</p>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;