import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const detailsData = [
  {
    title: "Registra Cada Detalle",
    description: "Registra tu progreso de lectura con precisión. Anota la página en la que estás, escribe tus pensamientos a medida que surgen y guarda esas citas inolvidables. BookWorm mantiene todas tus notas de lectura organizadas.",
    image: "/images/photo-1709486973903-ba0f098a28bf.jpg", // Usando la imagen adjunta aquí
    reverse: false,
  },
  {
    badge: "Con tecnología IA",
    title: "Descubre Tu Próximo Favorito",
    description: "Nuestro motor de recomendación inteligente te ayuda a encontrar libros que te encantarán. Basándonos en tu historial de lectura y géneros favoritos, te sugeriremos joyas ocultas y nuevos lanzamientos populares.",
    image: "/placeholder.svg", // Usando un placeholder para el segundo elemento
    reverse: true,
  },
  {
    title: "Visualiza Tu Viaje de Lectura",
    description: "Observa cómo tus hábitos de lectura cobran vida con hermosos gráficos y estadísticas. Registra cuántos libros has leído, tu ritmo y qué géneros exploras más a lo largo del tiempo.",
    image: "/placeholder.svg", // Usando un placeholder para el tercer elemento
    reverse: false,
  },
];

export const Details = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Detalles increíbles, libros asombrosos.
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            Cada función está diseñada para enriquecer tu experiencia de lectura, desde la nota más pequeña hasta el mayor descubrimiento.
          </p>
        </div>
        <div className="space-y-16 md:space-y-24">
          {detailsData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
                item.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 flex justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg shadow-lg w-full max-w-md object-cover h-auto"
                />
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
                <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                <Button variant="link" className="p-0 h-auto text-base">Saber Más</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};