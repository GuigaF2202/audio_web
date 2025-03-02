import { Carousel } from "flowbite-react";
import { useState, useEffect } from "react";

const FlowbiteCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Efeito para animar a entrada de cada slide
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const slides = [
    {
      type: "content",
      title: "Qualidade HD Garantida",
      description: "Transmissão de áudio com a melhor qualidade do mercado",
      bgColor: "bg-streama-pink"
    },
    {
      type: "image",
      src: "/assets/og-image.jpeg",
      alt: "Streama Audio Web"
    },
    {
      type: "content",
      title: "Sem Travamentos",
      description: "Servidores de alta performance para uma experiência sem interrupções",
      bgColor: "bg-streama-pink-dark"
    },
    {
      type: "content",
      title: "Suporte 24/7",
      description: "Equipe técnica disponível para ajudar a qualquer momento",
      bgColor: "bg-streama-pink"
    },
    {
      type: "image",
      src: "/assets/android-chrome-192x192.png",
      alt: "Streama em todos os dispositivos",
      bgColor: "bg-white"
    }
  ];

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 max-w-5xl mx-auto relative overflow-hidden rounded-lg shadow-lg">
      <Carousel 
        leftControl={
          <div className="group flex h-full items-center justify-center px-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-12 sm:w-12 transition-all duration-300 transform group-hover:scale-110">
              <svg className="h-5 w-5 text-white sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </span>
          </div>
        }
        rightControl={
          <div className="group flex h-full items-center justify-center px-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-12 sm:w-12 transition-all duration-300 transform group-hover:scale-110">
              <svg className="h-5 w-5 text-white sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </div>
        }
        indicators={false}
        onSlideChange={handleSlideChange}
      >
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`flex h-full items-center justify-center ${slide.type === 'content' ? slide.bgColor : 'bg-white'} relative overflow-hidden`}
          >
            {slide.type === 'content' ? (
              <div className={`text-center p-8 transition-all duration-500 transform ${isAnimating && activeIndex === index ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`}>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{slide.title}</h3>
                <p className="text-lg md:text-xl text-white/90">{slide.description}</p>
                
                {/* Efeito de ondas de áudio animadas */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-16 h-16 rounded-full border-2 border-white/20 animate-ping" 
                      style={{ 
                        animationDuration: `${3 + i}s`,
                        animationDelay: `${i * 0.5}s`,
                        width: `${(i + 1) * 100}px`,
                        height: `${(i + 1) * 100}px`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              <img 
                src={slide.src} 
                alt={slide.alt}
                className={`h-full w-full object-cover transition-all duration-700 ${isAnimating && activeIndex === index ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
              />
            )}
            
            {/* Efeito de partículas */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${3 + Math.random() * 5}s`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
      
      {/* Indicadores personalizados */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-current={index === activeIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleSlideChange(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default FlowbiteCarousel; 