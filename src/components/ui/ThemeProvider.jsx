import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../context/ThemeContext';

// Criando o contexto do tema
export const ComponentThemeContext = createContext({});

// Hook personalizado para acessar o tema
export const useComponentTheme = () => {
  return useContext(ComponentThemeContext);
};

// Componente ThemeProvider
export const ComponentThemeProvider = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState({});

  // Temas para os componentes
  const lightTheme = {
    // Tema para o componente Card
    card: {
      root: {
        base: "flex rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300",
        children: "flex h-full flex-col justify-center gap-4 p-6",
        horizontal: {
          off: "flex-col",
          on: "flex-col md:max-w-xl md:flex-row"
        },
        href: "hover:bg-gray-100"
      },
      img: {
        base: "",
        horizontal: {
          off: "rounded-t-lg",
          on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        }
      }
    },
    
    // Tema para o componente Button
    button: {
      base: "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none",
      color: {
        primary: "text-white bg-streama-gradient hover:opacity-90 focus:ring-streama-pink-light",
        secondary: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200",
        success: "text-white bg-green-600 hover:bg-green-700 focus:ring-green-300",
        danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-300"
      },
      size: {
        xs: "px-3 py-2 text-xs",
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
        xl: "px-6 py-3.5 text-base"
      },
      icon: {
        base: "inline-flex items-center",
        left: "mr-2",
        right: "ml-2"
      }
    },
    
    // Tema para o componente Input
    input: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-streama-pink focus:ring-streama-pink",
      sizes: {
        sm: "p-2 text-sm",
        md: "p-2.5 text-sm",
        lg: "p-4 text-base"
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full"
      }
    },
    
    // Tema para o AudioCard
    audioCard: {
      root: "bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02]",
      details: "p-4",
      title: "text-lg font-bold text-gray-800 line-clamp-1",
      artist: "text-sm text-gray-600 line-clamp-1",
      category: "text-xs bg-streama-pink text-white px-2 py-0.5 rounded-full inline-block mt-2",
      duration: "text-xs text-gray-500 mt-1"
    },
    
    // Tema para o Player
    player: {
      root: "bg-white border-t border-gray-200 py-3 shadow-lg",
      controls: "flex items-center justify-center space-x-4",
      progressBar: "h-1 w-full bg-gray-200 rounded-full overflow-hidden",
      progressFill: "h-full bg-streama-gradient",
      volume: "w-24 h-1 bg-gray-200 rounded-full overflow-hidden",
      volumeFill: "h-full bg-streama-gradient"
    }
  };

  const darkTheme = {
    // Tema para o componente Card
    card: {
      root: {
        base: "flex rounded-lg border border-gray-700 bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300",
        children: "flex h-full flex-col justify-center gap-4 p-6",
        horizontal: {
          off: "flex-col",
          on: "flex-col md:max-w-xl md:flex-row"
        },
        href: "hover:bg-gray-700"
      },
      img: {
        base: "",
        horizontal: {
          off: "rounded-t-lg",
          on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        }
      }
    },
    
    // Tema para o componente Button
    button: {
      base: "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none",
      color: {
        primary: "text-white bg-streama-gradient hover:opacity-90 focus:ring-streama-pink-dark",
        secondary: "text-white bg-gray-800 border border-gray-600 hover:bg-gray-700 focus:ring-gray-700",
        success: "text-white bg-green-700 hover:bg-green-800 focus:ring-green-800",
        danger: "text-white bg-red-700 hover:bg-red-800 focus:ring-red-900"
      },
      size: {
        xs: "px-3 py-2 text-xs",
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
        xl: "px-6 py-3.5 text-base"
      },
      icon: {
        base: "inline-flex items-center",
        left: "mr-2",
        right: "ml-2"
      }
    },
    
    // Tema para o componente Input
    input: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-streama-pink focus:ring-streama-pink",
      sizes: {
        sm: "p-2 text-sm",
        md: "p-2.5 text-sm",
        lg: "p-4 text-base"
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full"
      }
    },
    
    // Tema para o AudioCard
    audioCard: {
      root: "bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700 hover:scale-[1.02]",
      details: "p-4",
      title: "text-lg font-bold text-white line-clamp-1",
      artist: "text-sm text-gray-300 line-clamp-1",
      category: "text-xs bg-streama-pink text-white px-2 py-0.5 rounded-full inline-block mt-2",
      duration: "text-xs text-gray-400 mt-1"
    },
    
    // Tema para o Player
    player: {
      root: "bg-gray-800 border-t border-gray-700 py-3 shadow-lg",
      controls: "flex items-center justify-center space-x-4",
      progressBar: "h-1 w-full bg-gray-700 rounded-full overflow-hidden",
      progressFill: "h-full bg-streama-gradient",
      volume: "w-24 h-1 bg-gray-700 rounded-full overflow-hidden",
      volumeFill: "h-full bg-streama-gradient"
    }
  };

  // Atualiza o tema quando o modo escuro muda
  useEffect(() => {
    setCurrentTheme(darkMode ? darkTheme : lightTheme);
  }, [darkMode]);

  return (
    <ComponentThemeContext.Provider value={currentTheme}>
      {children}
    </ComponentThemeContext.Provider>
  );
};

ComponentThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}; 