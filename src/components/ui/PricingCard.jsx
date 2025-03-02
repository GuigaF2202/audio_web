import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { useState } from 'react';

const PricingCard = ({ 
  title, 
  price, 
  period = 'mês', 
  description, 
  features = [], 
  buttonText = 'Começar agora', 
  buttonLink = '/register',
  popular = false,
  color = 'streama-pink'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 
        ${popular ? 'ring-4 ring-streama-pink' : ''} 
        transition-all duration-500 transform ${isHovered ? 'scale-105 shadow-xl' : ''}
        hover:border-streama-pink relative z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {popular && (
        <span className="bg-streama-pink text-white text-xs font-semibold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 animate-pulse">
          POPULAR
        </span>
      )}
      <h5 className="mb-4 text-xl font-medium text-gray-500">{title}</h5>
      <div className="flex items-baseline text-gray-900">
        <span className="text-3xl font-semibold">R$</span>
        <span className={`text-5xl font-extrabold tracking-tight transition-colors duration-300 ${isHovered ? 'text-streama-pink' : ''}`}>
          {price}
        </span>
        <span className="ms-1 text-xl font-normal text-gray-500">/{period}</span>
      </div>
      <p className="text-gray-500 mt-4">{description}</p>
      <ul className="space-y-5 my-7">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} style={{ transitionDelay: `${index * 50}ms` }}>
            <FiCheck className={`w-4 h-4 me-2 text-${color}`} />
            <span className="text-base font-normal text-gray-500">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to={buttonLink}
        className={`bg-${color} hover:bg-opacity-90 text-white font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center
          transition-all duration-300 ${isHovered ? 'py-3 shadow-lg' : ''}`}
      >
        {buttonText}
      </Link>
      
      {/* Efeito de brilho no fundo quando hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-streama-pink/5 to-violet-purple/5 rounded-lg transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
};

export default PricingCard; 