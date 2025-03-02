import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

const SimpleNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implementar a busca
      console.log('Buscando por:', searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white shadow-md py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 bg-streama-pink rounded-full flex items-center justify-center mr-2 transition-transform duration-300 group-hover:rotate-12">
              <span className="text-white text-xl font-bold">*</span>
            </div>
            <span className="logo-poep">PОЕP</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/streama" className="text-streama-pink font-medium hover:text-streama-pink-dark transition-colors">
              Streama
            </Link>
            <Link to="/" className="text-gray-700 font-medium hover:text-streama-pink transition-colors">
              Inicio
            </Link>
            <Link to="/biblioteca" className="text-gray-700 font-medium hover:text-streama-pink transition-colors">
              Biblioteca
            </Link>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar áudios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-1 rounded-md w-40 focus:w-56 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-streama-pink"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FiSearch className="transition-transform duration-300 hover:scale-110" />
              </button>
            </form>
            
            <Link to="/login" className="text-streama-pink font-medium hover:text-streama-pink-dark transition-colors">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 space-y-4 animate-fadeIn">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Buscar áudios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-streama-pink"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FiSearch />
              </button>
            </form>

            <Link to="/streama" className="block text-streama-pink font-medium hover:text-streama-pink-dark transition-colors py-2">
              Streama
            </Link>
            <Link to="/" className="block text-gray-700 font-medium hover:text-streama-pink transition-colors py-2">
              Inicio
            </Link>
            <Link to="/biblioteca" className="block text-gray-700 font-medium hover:text-streama-pink transition-colors py-2">
              Biblioteca
            </Link>
            <Link to="/login" className="block text-streama-pink font-medium hover:text-streama-pink-dark transition-colors py-2">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SimpleNavbar; 