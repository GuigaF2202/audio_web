import Carousel from './Carousel';

const CarouselSection = () => {
  // Dados para o carrossel
  const carouselItems = [
    {
      type: 'image',
      src: '/assets/og-image.jpeg',
      alt: 'Streama Audio Web'
    },
    {
      type: 'content',
      title: 'Qualidade HD Garantida',
      description: 'Transmissão de áudio com a melhor qualidade do mercado'
    },
    {
      type: 'content',
      title: 'Sem Travamentos',
      description: 'Servidores de alta performance para uma experiência sem interrupções'
    },
    {
      type: 'content',
      title: 'Suporte 24/7',
      description: 'Equipe técnica disponível para ajudar a qualquer momento'
    },
    {
      type: 'image',
      src: '/assets/android-chrome-192x192.png',
      alt: 'Streama em todos os dispositivos'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-streama-pink mb-8">
          Conheça a Streama
        </h2>
        <div className="max-w-5xl mx-auto">
          <Carousel items={carouselItems} height="h-64 sm:h-80 md:h-96" />
        </div>
      </div>
    </section>
  );
};

export default CarouselSection; 