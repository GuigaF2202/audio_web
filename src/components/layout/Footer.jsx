import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiArrowUp, FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Aqui você implementaria a lógica real para assinar a newsletter
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Seção Subscribe - Movida para cima */}
      <div className="py-16 relative overflow-hidden">
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-4 py-1 text-xs text-audio-yellow font-medium mb-4">
                NEWSLETTER
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Mantenha-se Atualizado</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Inscreva-se para receber novidades, atualizações de produtos, dicas técnicas e ofertas exclusivas.
              </p>
            </div>
            
            <div className="relative">
              {/* Formulário */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 relative z-10">
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                      <input
                        type="email"
                        placeholder="Digite seu email"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-audio-yellow/50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      className="py-3 px-8 bg-gradient-to-r from-audio-yellow to-audio-orange text-black font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-audio-yellow/30 relative overflow-hidden group flex items-center justify-center"
                    >
                      <span className="relative z-10 flex items-center">
                        {subscribed ? 'Inscrito!' : 'Inscrever-se'}
                        {!subscribed && <FiSend className="ml-2" />}
                      </span>
                    </button>
                  </div>
                  <p className="text-white/50 text-xs text-center">
                    Ao inscrever-se, você concorda com nossa Política de Privacidade
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Informações do Footer */}
      <div className="container mx-auto px-4 pt-16 pb-8 bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo e Sobre */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/assets/audio-web-logo.png" 
                alt="Audio Web Logo" 
                className="h-12" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/audio-web-logo.svg";
                }}
              />
            </Link>
            <p className="text-white/70 mb-6">
              Oferecemos soluções completas de streaming de áudio e serviços para rádios online, podcasts e produtores de conteúdo.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-audio-pink/20 transition-colors">
                <FiInstagram size={18} className="text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-audio-blue/20 transition-colors">
                <FiTwitter size={18} className="text-white" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-audio-yellow/20 transition-colors">
                <FiFacebook size={18} className="text-white" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-audio-orange/20 transition-colors">
                <FiYoutube size={18} className="text-white" />
              </a>
            </div>
          </div>
          
          {/* Links Rápidos */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-white/70 hover:text-audio-yellow transition-colors flex items-center">
                  <FiArrowUp className="mr-2 rotate-45 text-audio-yellow" size={14} />
                  Início
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-audio-yellow transition-colors flex items-center">
                  <FiArrowUp className="mr-2 rotate-45 text-audio-yellow" size={14} />
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-audio-yellow transition-colors flex items-center">
                  <FiArrowUp className="mr-2 rotate-45 text-audio-yellow" size={14} />
                  Preços
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 hover:text-audio-yellow transition-colors flex items-center">
                  <FiArrowUp className="mr-2 rotate-45 text-audio-yellow" size={14} />
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-audio-yellow transition-colors flex items-center">
                  <FiArrowUp className="mr-2 rotate-45 text-audio-yellow" size={14} />
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Serviços */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Nossos Serviços</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/services/streaming" className="text-white/70 hover:text-audio-yellow transition-colors flex items-center">
                  <FiArrowUp className="mr-2 rotate-45 text-audio-yellow" size={14} />
                  Streaming de Áudio
                </Link>
              </li>
              <li>
                <Link to="/services/podcast" className="text-white/70 hover:text-audio-yellow transition-colors flex items-center">
                  <FiArrowUp className="mr-2 rotate-45 text-audio-yellow" size={14} />
                  Hospedagem de Podcast
                </Link>
              </li>
              <li>
                <Link to="/services/automation" className="text-white/70 hover:text-audio-yellow transition-colors flex items-center">
                  <FiArrowUp className="mr-2 rotate-45 text-audio-yellow" size={14} />
                  Automação de Rádio
                </Link>
              </li>
              <li>
                <Link to="/services/websites" className="text-white/70 hover:text-audio-yellow transition-colors flex items-center">
                  <FiArrowUp className="mr-2 rotate-45 text-audio-yellow" size={14} />
                  Sites e Aplicativos
                </Link>
              </li>
              <li>
                <Link to="/services/consulting" className="text-white/70 hover:text-audio-yellow transition-colors flex items-center">
                  <FiArrowUp className="mr-2 rotate-45 text-audio-yellow" size={14} />
                  Consultoria Técnica
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="text-audio-yellow mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/70">Av. Paulista, 1000, São Paulo - SP, Brasil</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="text-audio-yellow mr-3 flex-shrink-0" />
                <a href="tel:+551199999999" className="text-white/70 hover:text-white">+55 11 9999-9999</a>
              </li>
              <li className="flex items-center">
                <FiMail className="text-audio-yellow mr-3 flex-shrink-0" />
                <a href="mailto:contato@audioweb.com" className="text-white/70 hover:text-white">contato@audioweb.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Separador */}
        <div className="w-full h-px bg-white/10 my-8"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <p className="text-white/60 text-xs">
            &copy; {currentYear} ÁudioWeb. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <Link to="/terms" className="text-white/60 text-xs hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacy" className="text-white/60 text-xs hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/cookies" className="text-white/60 text-xs hover:text-white transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
      
      {/* Botão Voltar ao Topo */}
      <div className="text-center py-4 bg-gray-900">
        <button 
          onClick={scrollToTop}
          className="inline-flex items-center justify-center h-12 w-12 bg-audio-yellow/90 rounded-full text-black hover:bg-audio-yellow transition-all duration-300"
          aria-label="Voltar ao topo"
        >
          <FiArrowUp className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer; 