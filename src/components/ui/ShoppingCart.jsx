import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiCreditCard, FiArrowLeft } from 'react-icons/fi';

const ShoppingCart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento de itens do carrinho (em uma aplicação real, viria de uma API ou localStorage)
    setTimeout(() => {
      setCartItems([
        {
          id: 1,
          name: 'Plano Profissional',
          description: 'Streaming de áudio para rádios em crescimento',
          price: 79.90,
          quantity: 1,
          image: '/assets/plan-pro.jpg'
        },
        {
          id: 2,
          name: 'Consultoria de Áudio',
          description: 'Sessão de consultoria para configuração de equipamentos',
          price: 150.00,
          quantity: 1,
          image: '/assets/service-consulting.jpg'
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="absolute top-0 right-0 w-full md:w-96 h-full bg-black backdrop-filter backdrop-blur-lg border-l border-white/10 shadow-2xl transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-white/10">
            <h2 className="text-xl font-bold text-white flex items-center">
              <FiShoppingBag className="mr-2 text-audio-yellow" />
              Seu Carrinho
            </h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <FiX className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-5 space-y-5">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-audio-yellow"></div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiShoppingBag className="h-10 w-10 text-white/70" />
                </div>
                <p className="text-white/70 text-lg mb-6">Seu carrinho está vazio</p>
                <Link
                  to="/pricing"
                  className="px-6 py-3 bg-gradient-to-r from-audio-pink to-audio-purple text-white rounded-full hover:shadow-lg hover:shadow-audio-pink/30 transition-all duration-300"
                >
                  Ver Planos
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4 border-b border-white/10 pb-5">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/placeholder-image.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-white/60 text-sm">{item.description}</p>
                    
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <FiMinus className="w-4 h-4 text-white" />
                        </button>
                        <span className="text-white w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <FiPlus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-white font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Footer - Total and Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-white/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white/80">Subtotal</span>
                <span className="text-white font-medium">R$ {calculateTotal().toFixed(2)}</span>
              </div>
              <button 
                className="w-full py-3 bg-gradient-to-r from-audio-yellow to-audio-orange rounded-full text-black font-bold hover:shadow-lg hover:shadow-audio-yellow/30 transition-all duration-300 flex items-center justify-center"
              >
                <FiCreditCard className="mr-2" />
                Finalizar Compra
              </button>
              <button 
                onClick={onClose}
                className="w-full py-3 bg-white/10 rounded-full text-white mt-3 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <FiArrowLeft className="mr-2" />
                Continuar Comprando
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente para adicionar produtos ao carrinho
export const AddToCartButton = ({ product, onAddToCart }) => {
  return (
    <button 
      onClick={() => onAddToCart(product)}
      className="w-full py-3 bg-gradient-to-r from-audio-pink to-audio-purple rounded-full text-white font-medium hover:shadow-lg hover:shadow-audio-pink/30 transition-all duration-300 flex items-center justify-center space-x-2"
    >
      <FiPlus className="w-4 h-4" />
      <span>Adicionar ao Carrinho</span>
    </button>
  );
};

export default ShoppingCart; 