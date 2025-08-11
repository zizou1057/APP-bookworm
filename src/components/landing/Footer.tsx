import { Book } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t mt-12 md:mt-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 py-6">
        <div className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          <span className="font-semibold">BookWorm</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BookWorm. All rights reserved.
        </p>
        <nav className="flex gap-4 text-sm">
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  );
};