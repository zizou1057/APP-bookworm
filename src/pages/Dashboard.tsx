import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Library</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
      </header>
      <main>
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">Your library is empty</h2>
          <p className="text-muted-foreground mt-2">Add your first book to get started.</p>
          <Button className="mt-4">Add Book</Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;