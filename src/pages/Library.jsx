import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiFilter, FiX, FiPlay, FiPlus, FiClock, FiCalendar, FiStar } from 'react-icons/fi';
import { PlayerContext } from '../context/PlayerContext';

// Dados simulados para demonstração
import { allAudios, categories } from '../data/mockData';

const Library = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playAudio } = useContext(PlayerContext);
  
  const [audios, setAudios] = useState([]);
  const [filteredAudios, setFilteredAudios] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Extrair parâmetros da URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    const sortParam = params.get('sort');
    
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
    if (sortParam) setSortBy(sortParam);
  }, [location]);
  
  // Carregar áudios
  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setAudios(allAudios);
      setLoading(false);
    }, 800);
  }, []);
  
  // Filtrar e ordenar áudios
  useEffect(() => {
    if (audios.length === 0) return;
    
    let result = [...audios];
    
    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      result = result.filter(audio => audio.category === selectedCategory);
    }
    
    // Filtrar por busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(audio => 
        audio.title.toLowerCase().includes(query) || 
        audio.artist.toLowerCase().includes(query) ||
        audio.description.toLowerCase().includes(query)
      );
    }
    
    // Ordenar
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        break;
      case 'popular':
        result.sort((a, b) => b.plays - a.plays);
        break;
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    
    setFilteredAudios(result);
  }, [audios, selectedCategory, searchQuery, sortBy]);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateUrl({ category });
  };
  
  const handleSortChange = (sort) => {
    setSortBy(sort);
    updateUrl({ sort });
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    updateUrl({ search: searchQuery });
  };
  
  const updateUrl = (params) => {
    const urlParams = new URLSearchParams(location.search);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        urlParams.set(key, value);
      } else {
        urlParams.delete(key);
      }
    });
    
    navigate(`${location.pathname}?${urlParams.toString()}`);
  };
  
  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('newest');
    navigate('/library');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-streama-pink"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-streama-pink font-poppins">Biblioteca de Áudios</h1>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <FiFilter className="text-streama-pink" />
          <span>Filtros</span>
        </button>
      </div>
      
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-streama-pink font-poppins">Filtros e Ordenação</h2>
            <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-streama-pink transition-colors">
              <FiX size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Categorias</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`block px-3 py-2 rounded-lg w-full text-left transition-all duration-300 ${
                    selectedCategory === 'all' 
                      ? 'bg-streama-gradient text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Todas as Categorias
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`block px-3 py-2 rounded-lg w-full text-left transition-all duration-300 ${
                      selectedCategory === category.name 
                        ? 'bg-streama-gradient text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Ordenar por</h3>
              <div className="space-y-2">
                {[
                  { id: 'newest', label: 'Mais Recentes', icon: <FiCalendar className="inline mr-2" /> },
                  { id: 'oldest', label: 'Mais Antigos', icon: <FiCalendar className="inline mr-2" /> },
                  { id: 'popular', label: 'Mais Populares', icon: <FiStar className="inline mr-2" /> },
                  { id: 'az', label: 'A-Z', icon: null },
                  { id: 'za', label: 'Z-A', icon: null }
                ].map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleSortChange(option.id)}
                    className={`block px-3 py-2 rounded-lg w-full text-left transition-all duration-300 ${
                      sortBy === option.id 
                        ? 'bg-streama-gradient text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option.icon}{option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Buscar</h3>
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por título, artista..."
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-streama-pink dark:bg-gray-700"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-streama-gradient text-white rounded-r-lg hover:opacity-90 transition-opacity"
                  >
                    Buscar
                  </button>
                </div>
              </form>
              
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
      )}
      
      {filteredAudios.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4 text-streama-pink">Nenhum áudio encontrado</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tente ajustar seus filtros ou buscar por outro termo.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-streama-gradient text-white rounded-full hover:opacity-90 transition-opacity"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAudios.map(audio => (
            <div 
              key={audio.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700 group"
            >
              <div className="relative">
                <img 
                  src={audio.coverUrl} 
                  alt={audio.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => playAudio(audio)}
                    className="bg-streama-gradient text-white p-3 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg"
                  >
                    <FiPlay size={24} className="ml-1" />
                  </button>
                </div>
                <div className="absolute top-2 right-2 bg-streama-pink text-white text-xs px-2 py-1 rounded-full">
                  {audio.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-poppins font-semibold text-lg mb-1 text-gray-800 dark:text-white">{audio.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{audio.artist}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <FiClock className="mr-1" /> {new Date(audio.releaseDate).toLocaleDateString()}
                  </span>
                  <button className="text-streama-pink hover:text-violet-purple transition-colors">
                    <FiPlus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library; 