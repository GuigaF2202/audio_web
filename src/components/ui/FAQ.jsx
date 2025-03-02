import { useState } from 'react';

const FAQ = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const faqs = [
    {
      question: 'O que é streaming de áudio?',
      answer: 'Streaming de áudio é uma tecnologia que permite a transmissão contínua de áudio pela internet, sem a necessidade de download completo do arquivo antes da reprodução. É utilizado por rádios online, podcasts e serviços de música, permitindo que o conteúdo seja reproduzido em tempo real.'
    },
    {
      question: 'Quais são os requisitos técnicos para começar uma rádio online?',
      answer: 'Para começar uma rádio online, você precisa basicamente de: um computador com conexão estável à internet, software de automação (como RadioDJ, SAM Broadcaster ou PlayoutONE), um servidor de streaming (que oferecemos em nossos planos), e conteúdo para transmitir. Nossa equipe pode ajudar com a configuração completa do seu sistema.'
    },
    {
      question: 'Posso transmitir ao vivo e programar conteúdo automatizado?',
      answer: 'Sim! Todos os nossos planos suportam tanto transmissões ao vivo quanto programação automatizada. Você pode alternar entre os modos conforme sua necessidade, transmitindo ao vivo em horários específicos e deixando conteúdo programado no restante do tempo.'
    },
    {
      question: 'O que acontece se eu exceder o limite de ouvintes do meu plano?',
      answer: 'Se você atingir o limite de ouvintes do seu plano, novos ouvintes receberão uma mensagem informando que o servidor está cheio. Recomendamos monitorar suas estatísticas e fazer upgrade para um plano superior quando estiver se aproximando regularmente do limite. Também oferecemos soluções de balanceamento de carga para eventos especiais.'
    },
    {
      question: 'Vocês oferecem suporte para integração com sites e aplicativos?',
      answer: 'Sim! Oferecemos APIs e widgets que facilitam a integração do seu streaming em seu site, aplicativo móvel ou qualquer outra plataforma digital. Nossos planos mais avançados incluem suporte técnico dedicado para integrações personalizadas e desenvolvimento de soluções sob medida.'
    },
    {
      question: 'Como funciona o processo de migração de outro provedor para o de vocês?',
      answer: 'Nosso processo de migração é simples e projetado para minimizar qualquer tempo de inatividade. Nossa equipe técnica cuidará da transferência dos seus dados, ajudará na configuração do novo servidor e garantirá que tudo esteja funcionando corretamente antes de fazer a transição completa. Em muitos casos, conseguimos realizar a migração sem qualquer interrupção na transmissão.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-black">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-audio-pink/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-audio-blue/10 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-4 py-1 text-xs text-audio-yellow font-medium mb-4">
            PERGUNTAS FREQUENTES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Dúvidas Comuns
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Encontre respostas rápidas para as perguntas mais frequentes sobre nossos serviços. Se não encontrar o que procura, entre em contato conosco.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isHovered={hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <a 
            href="/faq" 
            className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium border border-white/20 hover:bg-white/15 transition-all duration-300 flex items-center"
          >
            Ver Todas as Perguntas
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
    <div 
      className="h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div 
        className={`group h-full relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 ${
          isHovered 
            ? 'bg-gradient-to-b from-black to-black/70 backdrop-blur-lg shadow-xl shadow-audio-purple/10 border-audio-purple/30' 
            : 'bg-black/40 backdrop-blur-sm'
        }`}
      >
        {/* Decoração de fundo */}
        <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-audio-purple/10 filter blur-3xl transition-opacity duration-500 ${
          isHovered ? 'opacity-70' : 'opacity-0'
        }`}></div>
        
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="mb-4 flex justify-between items-start">
            <h3 className={`text-xl font-bold transition-all duration-300 ${
              isHovered ? 'text-audio-purple' : 'text-white'
            }`}>
              {question}
            </h3>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'bg-audio-purple/20 rotate-180' : 'bg-white/10'
            }`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 transition-all duration-300 ${
                  isHovered ? 'text-audio-purple' : 'text-white'
                }`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className={`overflow-hidden transition-all duration-500 ${
            isHovered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-white/70">
                {answer}
              </p>
            </div>
          </div>
          
          <div className={`mt-auto pt-4 flex justify-end transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <a 
              href="#contact" 
              className="text-sm text-audio-purple hover:underline font-medium flex items-center"
            >
              Ainda tem dúvidas?
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Borda inferior colorida */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-audio-purple transform transition-transform duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}></div>
      </div>
    </div>
  );
};

export default FAQ; 