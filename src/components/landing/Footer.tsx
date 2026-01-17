import { Book, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react"; // Importar useState
import { supabase } from "@/lib/supabase"; // Importar supabase
import { showError, showSuccess } from "@/utils/toast"; // Importar toasts

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      showError("Por favor, ingresa tu correo electrónico.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email: email }]);

      if (error) {
        if (error.code === "23505") { // Unique violation error code
          showError("Este correo ya está suscrito.");
        } else {
          showError("Error al suscribirse: " + error.message);
        }
      } else {
        showSuccess("¡Gracias por suscribirte!");
        setEmail(""); // Limpiar el input
      }
    } catch (err) {
      showError("Ocurrió un error inesperado.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#3b3b3b] text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1: Brand and Socials */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white">
              <Book className="h-6 w-6" />
              <span>BookWorm</span>
            </Link>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter className="h-5 w-5" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-white"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Compañía</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white hover:underline">Sobre BookWorm</a></li>
              <li><a href="#features" className="hover:text-white hover:underline">Características</a></li>
              <li><a href="#testimonials" className="hover:text-white hover:underline">Reseñas</a></li>
              <li><Link to="/login" className="hover:text-white hover:underline">Iniciar sesión</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Mantente al día
            </h3>
            <p>Recibe las últimas actualizaciones y ofertas especiales.</p>
            <form className="flex gap-2" onSubmit={handleSubmit}> {/* Añadir onSubmit */}
              <Input 
                type="email" 
                placeholder="Ingresa tu correo electrónico" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-secondary"
                value={email} // Controlar el valor del input
                onChange={(e) => setEmail(e.target.value)} // Actualizar el estado
                disabled={isLoading} // Deshabilitar durante la carga
              />
              <Button type="submit" variant="secondary" disabled={isLoading}> {/* Deshabilitar el botón */}
                {isLoading ? "Suscribiendo..." : "Suscribirse"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} BookWorm. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white hover:underline">Política de Privacidad</Link>
            <Link to="/terms" className="hover:text-white hover:underline">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};