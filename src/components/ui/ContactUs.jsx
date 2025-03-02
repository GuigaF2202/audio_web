import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiInstagram, FiTwitter, FiGlobe } from 'react-icons/fi';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    // Simulação de envio do formulário com um timeout
    setTimeout(() => {
      // Aqui seria a integração com um serviço de email real
      setSubmitting(false);
      setSubmitted(true);
      
      // Limpar o formulário após envio
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Redefinir o estado após 5 segundos
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute left-0 right-0 -top-40 w-full h-80 bg-gradient-to-b from-audio-purple/20 to-transparent blur-3xl"></div>
        <div className="absolute left-0 right-0 -bottom-40 w-full h-80 bg-gradient-to-t from-audio-blue/20 to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-4 py-1 text-xs text-audio-yellow font-medium mb-4">
            ENTRE EM CONTATO
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Vamos dar vida ao seu projeto?
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Estamos prontos para transformar suas ideias em uma experiência auditiva excepcional. 
            Preencha o formulário abaixo e entraremos em contato em até 24 horas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coluna do formulário */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-audio-green/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-audio-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Mensagem Enviada!</h3>
                <p className="text-white/70">
                  Obrigado por entrar em contato. Nossa equipe responderá em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-white/80 mb-2 text-sm font-medium">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-audio-purple/50 focus:border-transparent transition-all duration-300"
                    placeholder="Seu nome"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-white/80 mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-audio-purple/50 focus:border-transparent transition-all duration-300"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-white/80 mb-2 text-sm font-medium">
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-audio-purple/50 focus:border-transparent transition-all duration-300"
                    placeholder="Assunto da mensagem"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-white/80 mb-2 text-sm font-medium">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-audio-purple/50 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Descreva seu projeto ou dúvida..."
                  ></textarea>
                </div>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full px-6 py-4 bg-gradient-to-r from-audio-pink to-audio-purple text-white rounded-lg font-medium hover:shadow-lg hover:shadow-audio-pink/30 transition-all duration-300 flex items-center justify-center ${
                    submitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FiSend className="mr-2" />
                  )}
                  {submitting ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
            )}
          </div>
          
          {/* Coluna de informações de contato */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-8">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-audio-pink/20 flex items-center justify-center mr-4">
                    <FiMail className="text-audio-pink text-xl" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Email:</p>
                    <a href="mailto:contato@audiostream.com" className="text-white hover:text-audio-pink transition-colors duration-300">
                      contato@audiostream.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-audio-blue/20 flex items-center justify-center mr-4">
                    <FiPhone className="text-audio-blue text-xl" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Telefone:</p>
                    <a href="tel:+5511999999999" className="text-white hover:text-audio-blue transition-colors duration-300">
                      +55 (11) 99999-9999
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-audio-green/20 flex items-center justify-center mr-4">
                    <FiMapPin className="text-audio-green text-xl" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Endereço:</p>
                    <address className="text-white not-italic">
                      Av. Paulista, 1578 - Bela Vista<br />
                      São Paulo - SP, 01310-200
                    </address>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mapa ou imagem ilustrativa */}
            <div className="mt-12 rounded-xl overflow-hidden h-64 bg-white/5 border border-white/10 relative">
              <img 
                src="/assets/map.jpg" 
                alt="Localização" 
                className="w-full h-full object-cover opacity-70"
                onError={(e) => {
                  e.target.onerror = null;
                  // Fallback para um mapa estático quando a imagem não carrega
                  e.target.src = 'https://via.placeholder.com/600x300/1a1a2e/cccccc?text=Mapa+da+Localização';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex space-x-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    <FiLinkedin className="text-white" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    <FiInstagram className="text-white" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    <FiTwitter className="text-white" />
                  </a>
                  <a href="https://audiostream.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                    <FiGlobe className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs; 