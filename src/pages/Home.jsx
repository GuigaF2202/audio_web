import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RoadmapPricing from '../components/ui/RoadmapPricing';
import FAQ from '../components/ui/FAQ';
import MainSlider from '../components/ui/MainSlider';
import ServicesSection from '../components/ui/ServicesSection';
import ContactUs from '../components/ui/ContactUs';

// Importando apenas os dados necessários
import { featuredAudios } from '../data/mockData';

const Home = () => {
  const { user } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (featuredAudios && featuredAudios.length > 0) {
      setLoading(false);
    }
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-streama-pink"></div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Main Slider */}
      <MainSlider />
      
      {/* ServicesSection - no estilo "All you need" do Integro */}
      <ServicesSection />
      
      {/* Painel de controle section - Mantido com pequenas modificações */}
      <div id="dashboard" className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img 
              src="/assets/dashboard-preview.svg" 
              alt="Painel de controle" 
              className="w-full h-auto rounded-lg shadow-2xl border border-gray-100 dark:border-gray-800"
            />
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="inline-block bg-gradient-to-r from-audio-pink/20 to-audio-purple/20 rounded-full px-4 py-1 text-sm text-audio-pink font-medium mb-4">
              Controle Total
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">O Painel Que Simplifica e Potencializa Sua Rádio</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              Atualizado, intuitivo e completo. O MediaCP traz controle fácil, relatórios de audiência precisos e até uma página pública para sua rádio. É tecnologia avançada, mas tão simples que parece mágica.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-audio-yellow/10 rounded-full text-audio-yellow mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Relatórios em Tempo Real</h3>
                  <p className="text-gray-600 dark:text-gray-400">Acompanhe a performance da sua rádio com dados precisos e detalhados.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-audio-pink/10 rounded-full text-audio-pink mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Interface Intuitiva</h3>
                  <p className="text-gray-600 dark:text-gray-400">Design pensado para facilitar sua navegação e controle total do sistema.</p>
                </div>
              </div>
            </div>
            <Link 
              to="/register"
              className="mt-8 inline-block px-8 py-4 bg-gradient-to-r from-audio-pink to-audio-purple text-white font-medium rounded-full hover:shadow-lg hover:shadow-audio-pink/30 transition-all duration-300"
            >
              EXPERIMENTE AGORA
            </Link>
          </div>
        </div>
      </div>
      
      {/* Tecnologias section - Com melhorias visuais */}
      <div id="technologies" className="bg-black py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-audio-pink/20 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-audio-blue/20 rounded-full filter blur-[80px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-4 py-1 text-sm text-audio-yellow font-medium mb-4">
              TECNOLOGIA DE PONTA
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tecnologias avançadas para uma experiência superior</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Trabalhamos com as melhores ferramentas do mercado para garantir que seu streaming funcione perfeitamente em qualquer dispositivo e plataforma.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 transform transition-all duration-300 hover:-translate-y-2 hover:border-audio-yellow/30">
              <div className="w-16 h-16 bg-audio-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/assets/tech-logo-1.svg" alt="Tecnologia 1" className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">Tecnologia Cloud</h3>
              <p className="text-white/60 text-sm">Servidores de alta performance com disponibilidade garantida</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 transform transition-all duration-300 hover:-translate-y-2 hover:border-audio-pink/30">
              <div className="w-16 h-16 bg-audio-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/assets/tech-logo-2.svg" alt="Tecnologia 2" className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">Algoritmos IA</h3>
              <p className="text-white/60 text-sm">Recomendações de conteúdo baseadas em preferências do usuário</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 transform transition-all duration-300 hover:-translate-y-2 hover:border-audio-blue/30">
              <div className="w-16 h-16 bg-audio-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/assets/tech-logo-3.svg" alt="Tecnologia 3" className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">CDN Global</h3>
              <p className="text-white/60 text-sm">Distribuição de conteúdo otimizada para reduzir latência</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 transform transition-all duration-300 hover:-translate-y-2 hover:border-audio-purple/30">
              <div className="w-16 h-16 bg-audio-purple/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/assets/tech-logo-4.svg" alt="Tecnologia 4" className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-white mb-2">API Avançada</h3>
              <p className="text-white/60 text-sm">Integração facilitada com qualquer plataforma ou aplicação</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Seção de Preços - Estilo Roadmap do Nerko */}
      <div id="pricing">
        <RoadmapPricing />
      </div>
      
      <ContactUs />
      
      {/* Seção de FAQ */}
      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
};

export default Home; 