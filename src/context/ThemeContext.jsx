import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  // Função para aplicar o tema ao documento
  const applyTheme = useCallback((isDark) => {
    // Adicionar classe de transição para suavizar a mudança
    document.documentElement.classList.add('theme-transition');
    
    // Aplicar o tema após um pequeno delay para garantir que a classe de transição foi aplicada
    setTimeout(() => {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Remover a classe de transição após a mudança
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
      }, 300);
    }, 5);
  }, []);

  // Efeito para carregar as preferências de tema do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Se há um tema salvo, use-o. Caso contrário, verifique as preferências do sistema
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setDarkMode(shouldBeDark);
    applyTheme(shouldBeDark);
    setThemeLoaded(true);
  }, [applyTheme]);

  // Ouvinte para mudanças nas preferências de cor do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Apenas mude o tema automaticamente se não houver preferência salva
      if (!localStorage.getItem('theme')) {
        const newDarkMode = e.matches;
        setDarkMode(newDarkMode);
        applyTheme(newDarkMode);
      }
    };
    
    // Adiciona o ouvinte para mudanças na preferência do sistema
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback para browsers antigos
      mediaQuery.addListener(handleChange);
    }
    
    // Remove o ouvinte quando o componente é desmontado
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback para browsers antigos
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [applyTheme]);

  // Alterna o tema entre claro e escuro
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    applyTheme(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  // Define o tema específico (claro ou escuro)
  const setTheme = (themeName) => {
    const newDarkMode = themeName === 'dark';
    setDarkMode(newDarkMode);
    applyTheme(newDarkMode);
    localStorage.setItem('theme', themeName);
  };

  // Reseta para as preferências do sistema
  const resetThemeToSystem = () => {
    localStorage.removeItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    applyTheme(prefersDark);
  };

  // Não renderiza nada até que o tema seja carregado para evitar flashes
  if (!themeLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        darkMode, 
        toggleTheme,
        setTheme,
        resetThemeToSystem
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}; 