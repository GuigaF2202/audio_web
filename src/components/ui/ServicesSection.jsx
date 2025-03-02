import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock } from 'react-icons/fi';

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const services = [
    {
      id: 1,
      icon: '/assets/services/streaming.svg',
      title: 'Análise Inicial',
      description: 'Nossa equipe avalia suas necessidades específicas e define objetivos claros para seu projeto de áudio.',
      features: [
        'Avaliação personalizada',
        'Diagnóstico técnico',
        'Definição de escopo',
        'Planejamento estratégico'
      ],
      color: 'audio-yellow'
    },
    {
      id: 2,
      icon: '/assets/services/hosting.svg',
      title: 'Estratégia e Planejamento',
      description: 'Desenvolvemos um plano detalhado para maximizar o alcance e impacto do seu conteúdo de áudio.',
      features: [
        'Segmentação de público',
        'Cronograma de execução',
        'Análise de concorrência',
        'Definição de métricas'
      ],
      color: 'audio-pink'
    },
    {
      id: 3,
      icon: '/assets/services/automation.svg',
      title: 'Implementação Técnica',
      description: 'Configuramos toda a infraestrutura necessária para transmissão e armazenamento do seu conteúdo.',
      features: [
        'Configuração de servidores',
        'Integração de APIs',
        'Otimização de qualidade',
        'Testes de performance'
      ],
      color: 'audio-blue'
    },
    {
      id: 4,
      icon: '/assets/services/website.svg',
      title: 'Design e Desenvolvimento',
      description: 'Criamos interfaces intuitivas e atraentes para seus ouvintes interagirem com seu conteúdo.',
      features: [
        'UI/UX personalizado',
        'Responsividade total',
        'Players personalizados',
        'Experiência imersiva'
      ],
      color: 'audio-purple'
    },
    {
      id: 5,
      icon: '/assets/services/consulting.svg',
      title: 'Lançamento e Distribuição',
      description: 'Levamos seu conteúdo às principais plataformas e otimizamos seu alcance global.',
      features: [
        'Publicação multiplataforma',
        'SEO para áudio',
        'Estratégia de lançamento',
        'Ativação de audiência'
      ],
      color: 'audio-orange'
    },
    {
      id: 6,
      icon: '/assets/services/distribution.svg',
      title: 'Análise e Otimização',
      description: 'Monitoramento contínuo e ajustes para melhorar constantemente seu desempenho.',
      features: [
        'Relatórios detalhados',
        'Análise de engajamento',
        'Otimização contínua',
        'Suporte dedicado'
      ],
      color: 'audio-green'
    }
  ];

  return (
    <section id="services" className="py-24 bg-black">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-4 py-1 text-xs text-audio-yellow font-medium mb-4">
            NOSSO FLUXO DE TRABALHO
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            É assim que abordamos cada projeto
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Nosso processo foi aperfeiçoado para garantir resultados excepcionais em cada etapa do desenvolvimento do seu projeto de áudio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="relative group overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Background */}
              <div 
                className={`h-full rounded-2xl border border-white/10 transition-all duration-500 p-8 ${
                  hoveredIndex === index 
                    ? 'bg-gradient-to-b from-black to-black/70 backdrop-blur-lg' 
                    : 'bg-black/40 backdrop-blur-sm'
                }`}
              >
                {/* Conteúdo do card */}
                <div className="relative z-10">
                  {/* Ícone e título */}
                  <div className="flex items-center mb-6 space-x-4">
                    <div className={`w-14 h-14 rounded-xl bg-${service.color}/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <div className="w-8 h-8">
                        <img 
                          src={service.icon} 
                          alt={service.title} 
                          className="w-full h-full object-contain"
                          width="32"
                          height="32"
                          loading="eager"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  
                  {/* Descrição */}
                  <p className="text-white/70 mb-8 h-20">{service.description}</p>
                  
                  {/* Lista de recursos (aparece ao passar o mouse) */}
                  <div className={`space-y-4 transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100 max-h-72 mb-6' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className={`w-5 h-5 rounded-full bg-${service.color}/20 flex-shrink-0 flex items-center justify-center mt-0.5`}>
                          <div className={`w-2 h-2 rounded-full bg-${service.color}`}></div>
                        </div>
                        <span className="text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Link para mais detalhes */}
                  <Link
                    to={`/services/${service.id}`}
                    className={`inline-flex items-center text-${service.color} font-medium transition-all duration-300 group-hover:translate-x-1`}
                  >
                    Saiba Mais
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
              
              {/* Indicador colorido na parte inferior */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-${service.color} transform ${
                hoveredIndex === index ? 'translate-y-0' : 'translate-y-full'
              } transition-transform duration-300`}></div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl p-8 mt-16 border border-white/10">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Pronto para transformar seu projeto de áudio?</h3>
            <p className="text-white/70">Nossa equipe está pronta para ajudar a concretizar sua visão.</p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-6 md:mt-0 px-8 py-4 bg-gradient-to-r from-audio-pink to-audio-purple text-white rounded-full font-medium hover:shadow-lg hover:shadow-audio-pink/30 transition-all duration-300 inline-flex items-center whitespace-nowrap"
          >
            <FiClock className="mr-2" />
            Agendar Consulta
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 