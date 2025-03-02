import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = ({ items, height = "h-64 sm:h-72 md:h-80 lg:h-96" }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-lg`}>
      {/* Slides */}
      <div className="relative h-full">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {item.type === 'image' ? (
              <img 
                src={item.src} 
                alt={item.alt || `Slide ${index + 1}`} 
                className="absolute block w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-streama-pink">
                <div className="text-center text-white p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h3>
                  <p className="text-lg md:text-xl">{item.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controles de navegação */}
      <button 
        type="button" 
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrevious}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <FiChevronLeft className="w-6 h-6 text-white" />
          <span className="sr-only">Anterior</span>
        </span>
      </button>
      <button 
        type="button" 
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
          <FiChevronRight className="w-6 h-6 text-white" />
          <span className="sr-only">Próximo</span>
        </span>
      </button>

      {/* Indicadores */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-current={index === activeIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel; 