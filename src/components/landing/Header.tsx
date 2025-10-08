import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="p-4 px-4 md:px-6 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Book className="h-6 w-6" />
          <span>BookWorm</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#features" className="hover:underline">Características</a>
          <a href="#testimonials" className="hover:underline">Reseñas</a>
        </nav>
        <Button asChild>
          <Link to="/login">Iniciar Sesión</Link>
        </Button>
      </div>
    </header>
  );
};