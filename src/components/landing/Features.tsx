import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookCheck, Library, Bell, BarChart, Users, Cloud } from "lucide-react";

const features = [
  {
    icon: <BookCheck className="h-8 w-8 text-primary" />,
    title: "Seguimiento Detallado de Libros",
    description: "Mantén un registro meticuloso de cada libro que lees. Sigue tu progreso por página o capítulo, añade notas personales y guarda tus citas favoritas, todo en un solo lugar.",
  },
  {
    icon: <Library className="h-8 w-8 text-primary" />,
    title: "Gestión de Biblioteca Personal",
    description: "Organiza toda tu colección de libros. Crea estanterías personalizadas, etiqueta libros por género o estado de ánimo y visualiza fácilmente lo que has leído, lo que estás leyendo y lo que sigue.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Analíticas de Lectura Reveladoras",
    description: "Visualiza tus hábitos de lectura. Obtén información sobre tu velocidad de lectura, géneros favoritos y observa tu progreso a lo largo del tiempo para mantenerte motivado y descubrir nuevos patrones.",
  },
  {
    icon: <Cloud className="h-8 w-8 text-primary" />,
    title: "Sincronización Fluida Multiplataforma",
    description: "Accede a tu biblioteca de lectura en cualquier momento y lugar. Tus datos se sincronizan de forma segura en todos tus dispositivos, para que puedas cambiar de tu portátil a tu teléfono sin perder el ritmo.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="container mx-auto px-4 md:px-6 py-12 md:py-24 bg-white dark:bg-muted rounded-lg shadow-lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Funcionalidades Poderosas para Amantes de los Libros</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          BookWorm está lleno de herramientas diseñadas para mejorar tu experiencia de lectura, organizar tu biblioteca y ayudarte a alcanzar tus metas de lectura.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              {feature.icon}
              <CardTitle className="mt-4">{feature.title}</CardTitle>
              <CardDescription className="mt-2">{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};