import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMonitor, FiCheck } from 'react-icons/fi';

const Settings = () => {
  const { darkMode, toggleTheme, setTheme, resetThemeToSystem } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('aparencia');

  const tabs = [
    { id: 'aparencia', label: 'Aparência' },
    { id: 'conta', label: 'Conta' },
    { id: 'privacidade', label: 'Privacidade' },
    { id: 'notificacoes', label: 'Notificações' }
  ];

  const themeOptions = [
    { id: 'light', label: 'Tema Claro', icon: <FiSun size={24} /> },
    { id: 'dark', label: 'Tema Escuro', icon: <FiMoon size={24} /> },
    { id: 'system', label: 'Usar Preferência do Sistema', icon: <FiMonitor size={24} /> }
  ];

  const handleThemeChange = (themeId) => {
    if (themeId === 'system') {
      resetThemeToSystem();
    } else {
      setTheme(themeId);
    }
  };

  const getCurrentTheme = () => {
    // Verificar se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) return 'system';
    return savedTheme;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-poppins">Configurações</h1>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((tab) => (
              <li key={tab.id} className="mr-2">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-block p-4 font-medium text-gray-500 dark:text-gray-400 hover:text-streama-pink dark:hover:text-streama-pink border-b-2 ${
                    activeTab === tab.id
                      ? 'border-streama-pink text-streama-pink dark:text-streama-pink'
                      : 'border-transparent'
                  } rounded-t-lg`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Aparência Tab */}
        {activeTab === 'aparencia' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Tema</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Escolha como o Audio Web deve aparecer para você.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themeOptions.map((option) => {
                const isActive = (option.id === 'system' && getCurrentTheme() === 'system') || 
                                (option.id === 'light' && getCurrentTheme() === 'light' && !darkMode) ||
                                (option.id === 'dark' && getCurrentTheme() === 'dark' && darkMode);
                
                return (
                  <div 
                    key={option.id}
                    onClick={() => handleThemeChange(option.id)}
                    className={`rounded-lg border-2 p-4 cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? 'border-streama-pink bg-streama-pink bg-opacity-5' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-streama-pink'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${isActive ? 'bg-streama-pink text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                          {option.icon}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
                      </div>
                      {isActive && <FiCheck className="text-streama-pink" size={20} />}
                    </div>
                    
                    {option.id === 'system' && (
                      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        Ajusta automaticamente baseado nas configurações do seu dispositivo.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Animações</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Escolha como as animações devem ser exibidas.
              </p>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-200">Reduzir animações</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-streama-pink peer-focus:ring-opacity-30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-streama-pink"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Outros Tabs */}
        {activeTab !== 'aparencia' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center py-12">
              <FiMonitor size={64} className="text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                Página em desenvolvimento
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Esta seção de configurações ainda está sendo desenvolvida. 
                Volte em breve para novas opções de personalização.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 