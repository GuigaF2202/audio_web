import { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingBag, FiMoon, FiSun, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideNavbar, setHideNavbar] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      
      // Detectar direção do scroll
      if (offset > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(offset);
      
      // Detectar quando está perto do footer
      if (offset + windowHeight > documentHeight - 300) {
        setNearFooter(true);
      } else {
        setNearFooter(false);
      }
      
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Detectar seção ativa
      const sections = ['home', 'services', 'dashboard', 'technologies', 'pricing', 'faq', 'contact'];
      let currentSection = 'home';
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
          }
        }
      });
      
      setActiveSection(currentSection);
      
      // Verificar se deve esconder o navbar quando chegar na seção Newsletter
      const newsletterSection = document.querySelector('.py-20.relative.overflow-hidden');
      if (newsletterSection) {
        const newsletterRect = newsletterSection.getBoundingClientRect();
        if (newsletterRect.top <= 150 && newsletterRect.bottom >= 0) {
          setHideNavbar(true);
        } else {
          setHideNavbar(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setIsOpen(false);
      setActiveSection(id);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const scrollToNext = () => {
    let nextSection;
    
    if (activeSection === 'home') nextSection = 'services';
    else if (activeSection === 'services') nextSection = 'technologies';
    else if (activeSection === 'technologies') nextSection = 'pricing';
    else if (activeSection === 'pricing') nextSection = 'faq';
    else if (activeSection === 'faq') nextSection = 'contact';
    else if (activeSection === 'contact') nextSection = 'home';
    
    scrollToSection(nextSection);
  };

  if (hideNavbar) {
    return null;
  }

  return (
    <nav 
      ref={navRef}
      className={`fixed w-full top-0 z-50 transition-all duration-500 
        ${scrolled 
          ? 'bg-black/90 backdrop-blur-lg shadow-md h-20 flex items-center' 
          : 'bg-transparent h-24 flex items-center'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 w-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo - sempre visível */}
          <Link to="/" className="flex items-center group">
            <div className="logo-container transition-opacity duration-300">
              <img 
                src="/assets/audio-web-logo.png" 
                alt="Audio Web Logo" 
                className="h-10 w-auto" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/audio-web-logo.svg";
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`font-poppins ${activeSection === 'home' ? 'text-audio-yellow' : 'text-white hover:text-audio-yellow'} font-medium transition-colors relative group uppercase text-sm`}
            >
              Início
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-audio-yellow transition-all duration-300 ${activeSection === 'home' ? 'w-full' : 'w-0 group-hover:w-full'} opacity-70`}></span>
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className={`font-poppins ${activeSection === 'services' ? 'text-audio-yellow' : 'text-white hover:text-audio-yellow'} font-medium transition-colors relative group uppercase text-sm`}
            >
              Serviços
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-audio-yellow transition-all duration-300 ${activeSection === 'services' ? 'w-full' : 'w-0 group-hover:w-full'} opacity-70`}></span>
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className={`font-poppins ${activeSection === 'pricing' ? 'text-audio-yellow' : 'text-white hover:text-audio-yellow'} font-medium transition-colors relative group uppercase text-sm`}
            >
              Preços
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-audio-yellow transition-all duration-300 ${activeSection === 'pricing' ? 'w-full' : 'w-0 group-hover:w-full'} opacity-70`}></span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`font-poppins ${activeSection === 'contact' ? 'text-audio-yellow' : 'text-white hover:text-audio-yellow'} font-medium transition-colors relative group uppercase text-sm`}
            >
              Contato
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-audio-yellow transition-all duration-300 ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'} opacity-70`}></span>
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className={`font-poppins ${activeSection === 'faq' ? 'text-audio-yellow' : 'text-white hover:text-audio-yellow'} font-medium transition-colors relative group uppercase text-sm`}
            >
              FAQ
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-audio-yellow transition-all duration-300 ${activeSection === 'faq' ? 'w-full' : 'w-0 group-hover:w-full'} opacity-70`}></span>
            </button>
          </div>

          {/* Theme Toggle, Cart and Login Button */}
          <div className="hidden md:flex items-center space-x-5">
            <button 
              onClick={toggleTheme}
              className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FiSun className="text-white h-5 w-5" />
              ) : (
                <FiMoon className="text-white h-5 w-5" />
              )}
            </button>
            
            <Link 
              to="/cart" 
              className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 relative"
              aria-label="Cart"
            >
              <FiShoppingBag className="text-white h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-audio-yellow text-black text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/login" 
              className={`relative overflow-hidden px-6 py-2.5 rounded-full font-medium transition-all duration-300 uppercase text-sm
                ${scrolled 
                  ? 'bg-gradient-to-r from-audio-pink to-audio-purple text-white' 
                  : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
                }
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-audio-pink before:to-audio-orange 
                before:scale-x-0 before:opacity-0 hover:before:scale-x-100 hover:before:opacity-100
                before:transition-all before:duration-300 before:origin-left
              `}
            >
              <span className="relative z-10">Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FiSun className="text-white h-5 w-5" />
              ) : (
                <FiMoon className="text-white h-5 w-5" />
              )}
            </button>
            
            <Link 
              to="/cart" 
              className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 relative"
              aria-label="Cart"
            >
              <FiShoppingBag className="text-white h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-audio-yellow text-black text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full focus:outline-none ${
                scrolled ? 'bg-white/20' : 'bg-audio-purple/30'
              } backdrop-blur-md`}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} className="text-white" /> : <FiMenu size={24} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 space-y-4 bg-black/90 backdrop-blur-xl rounded-2xl p-6 animate-fadeIn border border-white/10">
            <button onClick={() => scrollToSection('home')} className={`block w-full text-left font-poppins ${activeSection === 'home' ? 'text-audio-yellow' : 'text-white'} transition-colors py-2 font-medium uppercase text-sm`}>
              Início
            </button>
            <button onClick={() => scrollToSection('services')} className={`block w-full text-left font-poppins ${activeSection === 'services' ? 'text-audio-yellow' : 'text-white'} transition-colors py-2 font-medium uppercase text-sm`}>
              Serviços
            </button>
            <button onClick={() => scrollToSection('pricing')} className={`block w-full text-left font-poppins ${activeSection === 'pricing' ? 'text-audio-yellow' : 'text-white'} transition-colors py-2 font-medium uppercase text-sm`}>
              Preços
            </button>
            <button onClick={() => scrollToSection('contact')} className={`block w-full text-left font-poppins ${activeSection === 'contact' ? 'text-audio-yellow' : 'text-white'} transition-colors py-2 font-medium uppercase text-sm`}>
              Contato
            </button>
            <button onClick={() => scrollToSection('faq')} className={`block w-full text-left font-poppins ${activeSection === 'faq' ? 'text-audio-yellow' : 'text-white'} transition-colors py-2 font-medium uppercase text-sm`}>
              FAQ
            </button>
            <Link 
              to="/login" 
              className="block w-full text-center mt-4 bg-gradient-to-r from-audio-pink to-audio-purple px-6 py-2.5 rounded-full font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-audio-pink/30 uppercase text-sm"
            >
              Login
            </Link>
          </div>
        )}
      </div>
      
      {/* Botão de navegação moderno */}
      <div className="fixed right-10 bottom-10 z-50 hidden md:block">
        <button
          onClick={() => activeSection === 'contact' || activeSection === 'faq' ? scrollToTop() : scrollToNext()}
          className="group flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-full p-3 border border-white/10 hover:bg-white/10 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-audio-pink to-audio-purple flex items-center justify-center">
            {activeSection === 'contact' || activeSection === 'faq' ? (
              <FiArrowUp className="text-white" />
            ) : (
              <FiArrowDown className="text-white" />
            )}
          </div>
          <span className="text-white text-xs mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
            {activeSection === 'contact' || activeSection === 'faq' ? 'Topo' : 'Próximo'}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 