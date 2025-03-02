import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componentes internos do Dashboard
const Overview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Visão Geral</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Tempo Total de Escuta</h3>
          <p className="text-3xl font-bold text-neon-pink">42h 15m</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Últimos 30 dias</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Áudios Favoritos</h3>
          <p className="text-3xl font-bold text-neon-pink">18</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Playlists</h3>
          <p className="text-3xl font-bold text-neon-pink">5</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Criadas por você</p>
        </div>
      </div>
      
      <div className="card mb-8">
        <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(item => (
            <div key={item} className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0"></div>
              <div>
                <h4 className="font-medium">Você ouviu Meditação para Foco</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Há {item} hora{item !== 1 ? 's' : ''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recomendados para Você</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(item => (
            <div key={item} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="w-full h-32 bg-gray-200 dark:bg-gray-600 rounded-md mb-3"></div>
              <h4 className="font-medium mb-1">Meditação Guiada #{item}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">15 minutos</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { currentUser, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    bio: '',
    notifications: true
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await updateProfile(formData.name);
      setMessage('Perfil atualizado com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Erro ao atualizar perfil: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Meu Perfil</h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded-lg ${message.includes('Erro') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <div className="card mb-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8 mb-6">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button 
                type="button"
                className="text-neon-pink hover:underline text-sm"
              >
                Alterar foto
              </button>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">O email não pode ser alterado</p>
              </div>
              
              <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium mb-1">
                  Biografia
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="input-field min-h-[100px]"
                  placeholder="Conte um pouco sobre você..."
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-neon-pink focus:ring-neon-pink border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm">Receber notificações por email</span>
                </label>
              </div>
              
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Segurança</h3>
        
        <div className="mb-6">
          <button className="text-neon-pink hover:underline">
            Alterar senha
          </button>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-red-600">Zona de Perigo</h3>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Sair da conta
            </button>
            
            <button className="px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50">
              Excluir minha conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'system',
    autoplay: true,
    quality: 'high',
    language: 'pt-BR'
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Configurações</h2>
      
      <div className="card mb-8">
        <h3 className="text-lg font-semibold mb-4">Aparência</h3>
        
        <div className="mb-6">
          <label htmlFor="theme" className="block text-sm font-medium mb-1">
            Tema
          </label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="input-field"
          >
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
            <option value="system">Sistema (automático)</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label htmlFor="language" className="block text-sm font-medium mb-1">
            Idioma
          </label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="input-field"
          >
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">English (US)</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
      
      <div className="card mb-8">
        <h3 className="text-lg font-semibold mb-4">Reprodução</h3>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="autoplay"
              checked={settings.autoplay}
              onChange={handleChange}
              className="h-4 w-4 text-neon-pink focus:ring-neon-pink border-gray-300 rounded"
            />
            <span className="ml-2">Reprodução automática</span>
          </label>
        </div>
        
        <div className="mb-6">
          <label htmlFor="quality" className="block text-sm font-medium mb-1">
            Qualidade de áudio
          </label>
          <select
            id="quality"
            name="quality"
            value={settings.quality}
            onChange={handleChange}
            className="input-field"
          >
            <option value="low">Baixa (economiza dados)</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Sobre</h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Versão 1.0.0
          </p>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="text-neon-pink hover:underline text-sm">
            Termos de Serviço
          </a>
          <a href="#" className="text-neon-pink hover:underline text-sm">
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
};

// Layout do Dashboard
const DashboardLayout = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) return null;
  
  const isActive = (path) => {
    return location.pathname === `/dashboard${path}` ? 
      'bg-neon-pink text-white' : 
      'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="card sticky top-24">
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>
            
            <nav className="space-y-2">
              <Link 
                to="/dashboard" 
                className={`block px-4 py-2 rounded-lg transition-colors ${isActive('')}`}
              >
                Visão Geral
              </Link>
              <Link 
                to="/dashboard/profile" 
                className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/profile')}`}
              >
                Meu Perfil
              </Link>
              <Link 
                to="/dashboard/settings" 
                className={`block px-4 py-2 rounded-lg transition-colors ${isActive('/settings')}`}
              >
                Configurações
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Conteúdo */}
        <div className="w-full md:w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// Componente principal do Dashboard que define as rotas
const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default Dashboard; 