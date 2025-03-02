import PricingCard from './PricingCard';

const PricingSection = () => {
  const pricingPlans = [
    {
      title: 'Plano Básico',
      price: '29,90',
      description: 'Ideal para rádios pequenas e podcasts iniciantes.',
      features: [
        'Até 100 ouvintes simultâneos',
        'Qualidade de áudio 128kbps',
        'Painel de controle básico',
        'Suporte por e-mail',
        '99.5% de uptime garantido'
      ],
      buttonText: 'Escolher Básico',
      color: 'streama-pink'
    },
    {
      title: 'Plano Profissional',
      price: '79,90',
      description: 'Perfeito para rádios em crescimento e podcasts estabelecidos.',
      features: [
        'Até 500 ouvintes simultâneos',
        'Qualidade de áudio 320kbps',
        'Painel de controle completo',
        'Suporte prioritário',
        '99.9% de uptime garantido',
        'Estatísticas avançadas'
      ],
      buttonText: 'Escolher Profissional',
      popular: true,
      color: 'streama-pink'
    },
    {
      title: 'Plano Empresarial',
      price: '199,90',
      description: 'Solução completa para rádios comerciais e grandes produtoras.',
      features: [
        'Ouvintes ilimitados',
        'Qualidade de áudio HD',
        'Painel de controle personalizado',
        'Suporte 24/7 dedicado',
        '99.99% de uptime garantido',
        'API completa',
        'Servidor dedicado'
      ],
      buttonText: 'Escolher Empresarial',
      color: 'streama-pink'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-streama-pink mb-4">Planos e Preços</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para sua rádio ou podcast. Todos os planos incluem acesso ao nosso painel de controle e suporte técnico.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="relative">
              <PricingCard {...plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 