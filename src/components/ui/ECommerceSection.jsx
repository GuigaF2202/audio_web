import ECommerceCard from './ECommerceCard';

const ECommerceSection = () => {
  const products = [
    {
      title: 'Microfone Profissional Streama Pro',
      price: '599,90',
      oldPrice: '799,90',
      imageSrc: '/assets/tech-logo-1.svg',
      rating: 5,
      reviewCount: 120,
      buttonText: 'Comprar agora',
      detailsLink: '/products/microfone-pro'
    },
    {
      title: 'Mesa de Som Digital Streama Mix',
      price: '1.299,90',
      oldPrice: '1.499,90',
      imageSrc: '/assets/tech-logo-2.svg',
      rating: 4,
      reviewCount: 85,
      buttonText: 'Comprar agora',
      detailsLink: '/products/mesa-som'
    },
    {
      title: 'Fones de Ouvido Streama Studio',
      price: '349,90',
      oldPrice: '429,90',
      imageSrc: '/assets/tech-logo-3.svg',
      rating: 5,
      reviewCount: 210,
      buttonText: 'Comprar agora',
      detailsLink: '/products/fones-studio'
    },
    {
      title: 'Interface de Áudio Streama Connect',
      price: '899,90',
      oldPrice: '1.099,90',
      imageSrc: '/assets/android-chrome-192x192.png',
      rating: 4,
      reviewCount: 65,
      buttonText: 'Comprar agora',
      detailsLink: '/products/interface-audio'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-streama-pink mb-4">Equipamentos Profissionais</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Descubra nossa linha de equipamentos profissionais para elevar a qualidade do seu áudio.
            Produtos selecionados com a garantia de qualidade Streama.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ECommerceCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ECommerceSection; 