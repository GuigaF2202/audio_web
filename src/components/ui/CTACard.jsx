import { Link } from 'react-router-dom';
import { useState } from 'react';

const CTACard = ({
  title,
  description,
  buttonText = 'Começar agora',
  buttonLink = '/register',
  secondaryButtonText,
  secondaryButtonLink,
  imageSrc,
  imageAlt = 'Imagem promocional',
  bgColor = 'bg-streama-gradient'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`w-full p-6 ${bgColor} rounded-lg shadow-lg overflow-hidden transition-all duration-500 transform ${isHovered ? 'scale-[1.02] shadow-xl' : ''} relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efeito de partículas animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-white/20 transition-all duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: isHovered ? `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)` : 'translate(0, 0)',
              transitionDelay: `${i * 100}ms`
            }}
          ></div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center relative z-10">
        <div className="w-full md:w-2/3 mb-6 md:mb-0 md:pr-6">
          <h3 className={`text-2xl font-bold text-white mb-3 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`}>{title}</h3>
          <p className={`text-white text-opacity-90 mb-6 transition-all duration-300 ${isHovered ? 'translate-x-2 text-opacity-100' : ''}`}>{description}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={buttonLink}
              className={`px-5 py-2.5 bg-white text-streama-pink font-medium rounded-lg text-sm hover:bg-opacity-90 transition-all duration-300 ${isHovered ? 'shadow-lg px-6 py-3 -translate-y-1' : ''}`}
            >
              {buttonText}
            </Link>
            {secondaryButtonText && (
              <Link
                to={secondaryButtonLink || buttonLink}
                className={`px-5 py-2.5 bg-transparent border border-white text-white font-medium rounded-lg text-sm hover:bg-white hover:bg-opacity-10 transition-all duration-300 ${isHovered ? 'border-opacity-100 shadow-lg' : 'border-opacity-70'}`}
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
        {imageSrc && (
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={imageSrc}
              alt={imageAlt}
              className={`max-h-48 md:max-h-64 object-contain rounded-lg transition-all duration-500 ${isHovered ? 'scale-110 rotate-3 drop-shadow-2xl' : ''}`}
            />
          </div>
        )}
      </div>
      
      {/* Efeito de brilho no hover */}
      <div 
        className={`absolute inset-0 bg-white/5 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: isHovered ? 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)' : ''
        }}
      ></div>
    </div>
  );
};

export default CTACard; 