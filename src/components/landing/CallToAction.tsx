import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  return (
    <section className="bg-primary text-primary-foreground py-12 md:py-24 text-center">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          ¿LISTO PARA EMPEZAR TU AVENTURA DE LECTURA?
        </h2>
        <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed mb-8">
          Regístrate ahora. Es completamente GRATIS
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link to="/signup">Quiero ser un book worm</Link>
        </Button>
      </div>
    </section>
  );
};