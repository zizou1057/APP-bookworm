const testimonialsData = [
  {
    quote: "BookWorm ha cambiado por completo mi forma de leer. Nunca ha sido tan fácil hacer un seguimiento de mi progreso y mis notas.",
    name: "Alex Johnson",
    title: "Lector Ávido",
    avatar: "/placeholder-user.jpg",
  },
  {
    quote: "¡Las recomendaciones de la IA son perfectas! He descubierto muchísimos autores y géneros nuevos que no habría encontrado de otra manera.",
    name: "Samantha Lee",
    title: "Presidenta del Club de Lectura",
    avatar: "/placeholder-user.jpg",
  },
  {
    quote: "Me encantan las funciones de comunidad. Comentar libros con otros lectores añade una dimensión completamente nueva a mi experiencia de lectura.",
    name: "Michael Chen",
    title: "Estudiante de Literatura",
    avatar: "/placeholder-user.jpg",
  },
  {
    quote: "Como profesional ocupado, BookWorm me ayuda a aprovechar al máximo mi tiempo de lectura. Es simple, intuitivo y potente.",
    name: "Jessica Williams",
    title: "CEO, Soluciones Tecnológicas",
    avatar: "/placeholder-user.jpg",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 md:py-24 bg-muted/50 dark:bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Lo que Dicen Nuestros Lectores
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            Únete a una comunidad de lectores apasionados que están llevando su lectura al siguiente nivel.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-background p-6 rounded-lg shadow">
              <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};