import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Dados simulados de playlists
const mockPlaylists = [
  {
    id: '1',
    title: 'Meditações Favoritas',
    description: 'Minha coleção de meditações para diferentes momentos do dia',
    coverUrl: '/assets/placeholder.svg',
    trackCount: 12,
    createdBy: 'Usuário',
    isPublic: true
  },
  {
    id: '2',
    title: 'Para Dormir',
    description: 'Sons e meditações que ajudam a relaxar antes de dormir',
    coverUrl: '/assets/placeholder.svg',
    trackCount: 8,
    createdBy: 'Usuário',
    isPublic: true
  },
  {
    id: '3',
    title: 'Foco no Trabalho',
    description: 'Áudios para aumentar a concentração durante o trabalho',
    coverUrl: '/assets/placeholder.svg',
    trackCount: 15,
    createdBy: 'Usuário',
    isPublic: false
  },
  {
    id: '4',
    title: 'Meditação Matinal',
    description: 'Comece o dia com estas meditações energizantes',
    coverUrl: '/assets/placeholder.svg',
    trackCount: 7,
    createdBy: 'Usuário',
    isPublic: true
  }
];

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    title: '',
    description: '',
    isPublic: true
  });
  const { currentUser } = useAuth();

  useEffect(() => {
    // Simulação de busca de dados
    // Em um app real, isso seria uma chamada de API
    setTimeout(() => {
      setPlaylists(mockPlaylists);
      setLoading(false);
    }, 800);
  }, []);

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    
    // Simulação de criação de playlist
    const newPlaylistObj = {
      id: Date.now().toString(),
      ...newPlaylist,
      coverUrl: '/assets/placeholder.svg',
      trackCount: 0,
      createdBy: currentUser?.displayName || 'Usuário'
    };
    
    setPlaylists([newPlaylistObj, ...playlists]);
    setShowCreateModal(false);
    setNewPlaylist({
      title: '',
      description: '',
      isPublic: true
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPlaylist(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-pink"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Minhas Playlists</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nova Playlist
        </button>
      </div>
      
      {playlists.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Você ainda não tem playlists</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Crie sua primeira playlist para organizar seus áudios favoritos
          </p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            Criar Playlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.map(playlist => (
            <Link 
              key={playlist.id} 
              to={`/playlist/${playlist.id}`}
              className="card hover:shadow-xl transition-all duration-300"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img 
                  src={playlist.coverUrl} 
                  alt={playlist.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="p-3 bg-neon-pink rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                {!playlist.isPublic && (
                  <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                    Privada
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-1">{playlist.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                {playlist.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {playlist.trackCount} {playlist.trackCount === 1 ? 'faixa' : 'faixas'}
              </p>
            </Link>
          ))}
        </div>
      )}
      
      {/* Modal de criação de playlist */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Nova Playlist</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleCreatePlaylist}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newPlaylist.title}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newPlaylist.description}
                    onChange={handleChange}
                    className="input-field min-h-[100px]"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isPublic"
                      checked={newPlaylist.isPublic}
                      onChange={handleChange}
                      className="h-4 w-4 text-neon-pink focus:ring-neon-pink border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm">Tornar esta playlist pública</span>
                  </label>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Criar Playlist
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists; 