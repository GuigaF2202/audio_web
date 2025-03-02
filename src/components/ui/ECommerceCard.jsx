import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';

const ECommerceCard = ({
  title,
  price,
  oldPrice,
  imageSrc,
  imageAlt = 'Produto',
  rating = 5,
  reviewCount = 0,
  buttonText = 'Adicionar ao carrinho',
  buttonLink = '/register',
  detailsLink
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden group">
        <Link to={detailsLink || buttonLink}>
          <img 
            className="p-8 rounded-t-lg h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110" 
            src={imageSrc} 
            alt={imageAlt} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        <button 
          className={`absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-transform duration-300 ${isHovered ? 'scale-110' : ''} ${isFavorite ? 'animate-pulse' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <FiHeart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-streama-pink'}`} />
        </button>
        
        {/* Tag de desconto */}
        {oldPrice && (
          <div className="absolute top-4 left-4 bg-streama-pink text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-0 hover:rotate-3 transition-transform duration-300">
            {Math.round((1 - parseFloat(price.replace('.', '')) / parseFloat(oldPrice.replace('.', ''))) * 100)}% OFF
          </div>
        )}
      </div>
      <div className="px-5 pb-5">
        <Link to={detailsLink || buttonLink}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 hover:text-streama-pink transition-colors duration-300 mt-4">{title}</h5>
        </Link>
        {rating > 0 && (
          <div className="flex items-center mt-2.5 mb-5">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'text-yellow-300' : 'text-gray-300'} transition-transform duration-300 ${isHovered && i < rating ? 'scale-125' : ''}`} 
                style={{ transitionDelay: `${i * 50}ms` }}
                aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="currentColor" 
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
            ))}
            {reviewCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">{reviewCount} avaliações</span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className={`text-3xl font-bold transition-colors duration-300 ${isHovered ? 'text-streama-pink' : 'text-gray-900'}`}>R${price}</span>
            {oldPrice && (
              <span className="text-sm text-gray-500 line-through">R${oldPrice}</span>
            )}
          </div>
          <Link 
            to={buttonLink}
            className={`flex items-center bg-streama-pink hover:bg-opacity-90 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300 ${isHovered ? 'shadow-lg px-6 py-3' : ''}`}
          >
            <FiShoppingCart className={`mr-2 transition-transform duration-300 ${isHovered ? 'animate-bounce' : ''}`} />
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ECommerceCard; 