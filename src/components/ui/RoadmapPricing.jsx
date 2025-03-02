import { Link } from 'react-router-dom';
import { useState } from 'react';

const RoadmapPricing = () => {
  const pricingPlans = [
    {
      phase: 'BÁSICO',
      title: 'Plano Essencial',
      price: '29,90',
      description: 'Ideal para rádios pequenas e podcasts iniciantes que estão começando sua jornada no streaming de áudio.',
      features: [
        'Até 100 ouvintes simultâneos',
        'Qualidade de áudio 128kbps',
        'Painel de controle básico',
        'Suporte por e-mail',
        '99.5% de uptime garantido'
      ],
      buttonText: 'Começar Agora',
      color: 'yellow',
      completed: true
    },
    {
      phase: 'PADRÃO',
      title: 'Plano Profissional',
      price: '79,90',
      description: 'Perfeito para rádios em crescimento e podcasts estabelecidos que precisam de mais recursos e maior alcance.',
      features: [
        'Até 500 ouvintes simultâneos',
        'Qualidade de áudio 320kbps',
        'Painel de controle completo',
        'Suporte prioritário',
        '99.9% de uptime garantido',
        'Estatísticas avançadas'
      ],
      buttonText: 'Atualizar Plano',
      color: 'pink',
      popular: true,
      active: true
    },
    {
      phase: 'PREMIUM',
      title: 'Plano Empresarial',
      price: '199,90',
      description: 'Solução completa para rádios comerciais e grandes produtoras que precisam de desempenho máximo.',
      features: [
        'Ouvintes ilimitados',
        'Qualidade de áudio HD',
        'Painel de controle personalizado',
        'Suporte 24/7 dedicado',
        '99.99% de uptime garantido',
        'API completa',
        'Servidor dedicado'
      ],
      buttonText: 'Falar com Vendas',
      color: 'blue'
    },
    {
      phase: 'ULTIMATE',
      title: 'Plano Enterprise',
      price: 'Personalizado',
      description: 'Para redes de rádio, grandes conglomerados de mídia e empresas que necessitam de soluções sob medida.',
      features: [
        'Infraestrutura dedicada',
        'SLA personalizado',
        'Marca própria (white label)',
        'Integração com sistemas existentes',
        'Consultoria técnica dedicada',
        'Treinamento para equipe',
        'Monitoramento 24/7'
      ],
      buttonText: 'Solicitar Proposta',
      color: 'purple',
      comingSoon: true
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-black">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-4 py-1 text-xs text-audio-yellow font-medium mb-4">
            PLANOS E PREÇOS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Escolha o Plano Ideal Para Você</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Oferecemos diferentes planos para atender às suas necessidades específicas. Comece com o básico e faça upgrade conforme seu crescimento.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
          {pricingPlans.map((plan, index) => (
            <RoadmapPricingCard 
              key={index} 
              {...plan} 
              index={index}
              isLast={index === pricingPlans.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const RoadmapPricingCard = ({ 
  phase, 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  color, 
  index, 
  isLast,
  completed,
  active,
  popular,
  comingSoon
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Classes baseadas na cor
  const getBgColorClass = (colorName, opacity) => {
    const opacityClass = opacity ? `/${opacity}` : '';
    return `bg-audio-${colorName}${opacityClass}`;
  };

  const getTextColorClass = (colorName) => {
    return `text-audio-${colorName}`;
  };

  const getBorderColorClass = (colorName) => {
    return `border-audio-${colorName}`;
  };

  const getShadowColorClass = (colorName, opacity = 10) => {
    return `shadow-audio-${colorName}/${opacity}`;
  };

  // Determinar classes baseadas no estado
  const numberCircleClasses = active 
    ? `${getBorderColorClass(color)} ${getBgColorClass(color, 20)}` 
    : completed 
      ? `${getBorderColorClass(color)} ${getBgColorClass(color, 10)}` 
      : 'border-white/30 bg-white/5';

  const phaseBadgeClasses = `inline-block px-3 py-1 rounded-full text-xs font-medium ${getBgColorClass(color, 20)} ${getTextColorClass(color)} mb-2`;

  const priceClasses = `text-3xl font-bold ${getTextColorClass(color)}`;

  const buttonClasses = active || isHovered 
    ? `${getBgColorClass(color)} hover:bg-opacity-90` 
    : completed 
      ? `${getBgColorClass(color, 70)} hover:${getBgColorClass(color)}` 
      : comingSoon 
        ? 'bg-white/10 hover:bg-white/20 cursor-not-allowed' 
        : `${getBgColorClass(color, 50)} hover:${getBgColorClass(color)}`;

  const statusIndicatorClasses = completed 
    ? 'bg-audio-yellow' 
    : getBgColorClass(color);

  const hoverClasses = isHovered 
    ? `transform translate-y-[-5px] shadow-lg ${getShadowColorClass(color)}` 
    : '';
  
  return (
    <div 
      className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-300 h-full ${hoverClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cabeçalho do card com número integrado */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className={phaseBadgeClasses}>
            {phase}
          </div>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${numberCircleClasses} backdrop-blur-md text-white text-sm font-bold`}>
          {index + 1}
        </div>
      </div>
      
      {popular && (
        <div className="absolute top-3 right-16 bg-audio-yellow/20 text-audio-yellow text-xs font-semibold px-3 py-1 rounded-full">
          POPULAR
        </div>
      )}
      
      {comingSoon && (
        <div className="absolute top-3 right-16 bg-white/10 text-white/70 text-xs font-semibold px-3 py-1 rounded-full">
          EM BREVE
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      
      <div className="flex items-baseline mb-3">
        {price === 'Personalizado' ? (
          <span className="text-3xl font-bold text-white">{price}</span>
        ) : (
          <>
            <span className="text-xl font-medium text-white/70">R$</span>
            <span className={priceClasses}>{price}</span>
            <span className="text-white/70 ml-1">/mês</span>
          </>
        )}
      </div>
      
      <p className="text-white/70 mb-6">{description}</p>
      
      {/* Lista de recursos */}
      <ul className="space-y-3 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <div className={`w-5 h-5 rounded-full ${getBgColorClass(color, 20)} flex items-center justify-center mt-0.5 mr-3 flex-shrink-0`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill={getColorHex(color)}>
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-white/80">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Botão de ação */}
      <Link
        to="/register"
        className={`w-full inline-block text-center py-3 px-6 rounded-xl ${buttonClasses} text-white font-medium transition-all duration-300`}
      >
        {buttonText}
      </Link>
      
      {/* Indicador de status */}
      {(completed || active) && (
        <div className={`absolute -top-2 -left-2 w-4 h-4 rounded-full ${statusIndicatorClasses} flex items-center justify-center`}>
          {completed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 text-black" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <div className="w-2 h-2 rounded-full bg-white"></div>
          )}
        </div>
      )}
    </div>
  );
};

// Função auxiliar para definir cores em formato hexadecimal para SVGs
function getColorHex(color) {
  const colorMap = {
    'yellow': '#FFD166',
    'pink': '#FF6B98',
    'blue': '#3E7BFA',
    'purple': '#A855F7',
    'orange': '#FF9F1A',
    'green': '#10B981'
  };
  
  return colorMap[color] || '#FFFFFF';
}

export default RoadmapPricing; 