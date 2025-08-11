import { Button } from "@/components/ui/button";
import { BookCopy } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="p-4 px-4 md:px-6 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <BookCopy className="h-6 w-6" />
          <span>LecRead</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="#features" className="hover:underline">Features</Link>
          <Link to="#pricing" className="hover:underline">Pricing</Link>
          <Link to="#about" className="hover:underline">About</Link>
        </nav>
        <Button>Get Started</Button>
      </div>
    </header>
  );
};