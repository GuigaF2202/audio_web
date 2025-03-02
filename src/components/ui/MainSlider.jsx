import { useState, useEffect, useRef, createElement } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const MainSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const intervalRef = useRef(null);
  const slidesRef = useRef([]);
  
  const slides = [
    {
      id: 1,
      title: "Streaming de Áudio Profissional",
      subtitle: "Revolucione sua experiência de áudio",
      description: "A plataforma mais avançada para transmissão de rádios online, podcasts e conteúdo de áudio, com tecnologia de ponta e qualidade superior.",
      image: "/assets/slider-1.jpg",
      buttonText: "Explorar Soluções",
      buttonLink: "/services",
      backgroundColor: "from-audio-blue/30 to-audio-purple/30"
    },
    {
      id: 2,
      title: "Solução Completa para Rádios",
      subtitle: "Tecnologia de ponta para seu projeto",
      description: "Do streaming ao gerenciamento de conteúdo, oferecemos tudo que você precisa para criar e expandir sua estação de rádio online.",
      image: "/assets/slider-2.jpg",
      buttonText: "Ver Planos",
      buttonLink: "/pricing",
      backgroundColor: "from-audio-orange/30 to-audio-pink/30"
    },
    {
      id: 3,
      title: "Podcasts e Áudio On Demand",
      subtitle: "Alcance sua audiência em qualquer lugar",
      description: "Distribua seu conteúdo para milhões de ouvintes com nossa infraestrutura robusta de streaming e hospedagem de podcasts.",
      image: "/assets/slider-3.jpg",
      buttonText: "Começar Agora",
      buttonLink: "/register",
      backgroundColor: "from-audio-yellow/30 to-audio-orange/30"
    }
  ];

  // Pré-carregar as imagens para evitar piscadas
  useEffect(() => {
    const preloadImages = async () => {
      try {
        slidesRef.current = slides.map(() => createElement('div'));
        
        const promises = slides.map((slide) => {
          return new Promise((resolve) => {
            const img = new window.Image();
            img.src = slide.image;
            img.onload = resolve;
            img.onerror = resolve; // Continuar mesmo se uma imagem falhar
          });
        });
        
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Erro ao pré-carregar imagens:", error);
        setImagesLoaded(true); // Mostrar o slider mesmo que haja um erro
      }
    };
    
    preloadImages();
  }, []);

  useEffect(() => {
    if (autoplay) {
      intervalRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, slides.length]);
  
  const pauseAutoplay = () => {
    setAutoplay(false);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  };
  
  const resumeAutoplay = () => {
    setAutoplay(true);
  };

  if (!imagesLoaded) {
    return (
      <div id="home" className="relative min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-audio-yellow"></div>
      </div>
    );
  }

  return (
    <div 
      id="home"
      className="relative min-h-screen overflow-hidden bg-black"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Fundo com grid pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-20"></div>
      </div>
      
      {/* Slides */}
      <div className="relative h-screen pt-24 flex items-center">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Fundo gradient personalizado por slide */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${slide.backgroundColor} opacity-30`}></div>
            
            {/* Imagem de fundo */}
            <div className="absolute inset-0 z-0 opacity-20">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
                style={{ transform: 'scale(1.1)' }}
              />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-16 md:mb-0 text-center md:text-left">
                  <div className="inline-block bg-white/5 backdrop-blur-md rounded-full px-4 py-2 text-sm text-audio-yellow font-medium mb-4">
                    {slide.subtitle}
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-poppins leading-tight">
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i} className="inline-block">
                        {i === 1 && (
                          <span className="relative inline-block">
                            <span className="relative z-10">{word}</span>
                            <span className="absolute bottom-2 left-0 w-full h-3 bg-audio-yellow/30 -z-0 skew-x-3"></span>
                          </span>
                        )} {i !== 1 && word} {' '}
                      </span>
                    ))}
                  </h1>
                  <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0">
                    {slide.description}
                  </p>
                  
                  <Link 
                    to={slide.buttonLink} 
                    className="inline-flex items-center px-8 py-4 rounded-full font-medium text-white bg-gradient-to-r from-audio-pink to-audio-purple transition-all duration-300 hover:shadow-lg hover:shadow-audio-pink/30 group"
                  >
                    <span className="relative z-10 mr-2">{slide.buttonText}</span>
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
                
                <div className="md:w-1/2 flex justify-center md:justify-end">
                  <div className="relative">
                    {/* Card central com glassmorphism */}
                    <div className="relative z-20 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl transform hover:scale-[1.02] transition-all duration-500 max-w-md">
                      <div className="w-full h-72 overflow-hidden rounded-xl mb-6">
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="w-full h-full object-cover"
                          loading="eager"
                        />
                      </div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-white text-xl font-semibold mb-1">{slide.title}</h3>
                          <p className="text-white/70">{slide.subtitle}</p>
                        </div>
                        <div className="bg-audio-pink/20 backdrop-blur-md rounded-full px-3 py-1 text-xs text-white border border-white/10">
                          Em Destaque
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Seta amarela no canto direito */}
        <div className="fixed right-10 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
          <div className="p-3 bg-audio-yellow rounded-full">
            <FiArrowRight className="text-black h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;