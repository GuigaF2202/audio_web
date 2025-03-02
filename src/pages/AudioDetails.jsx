import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';

// Simulação de dados de áudio
const mockAudioData = {
  '1': {
    id: '1',
    title: 'Meditação Guiada para Iniciantes',
    artist: 'Maria Silva',
    duration: '10:15',
    coverUrl: '/assets/placeholder.svg',
    audioUrl: 'https://example.com/audio1.mp3',
    description: 'Uma meditação suave para iniciantes que ajuda a acalmar a mente e encontrar paz interior.',
    category: 'Meditação',
    tags: ['iniciantes', 'relaxamento', 'guiada'],
    releaseDate: '2023-05-15',
    plays: 12500
  },
  '2': {
    id: '2',
    title: 'Hipnose para Dormir Profundamente',
    artist: 'Carlos Mendes',
    duration: '25:30',
    coverUrl: '/assets/placeholder.svg',
    audioUrl: 'https://example.com/audio2.mp3',
    description: 'Esta hipnose ajuda a relaxar profundamente e preparar o corpo e a mente para um sono reparador.',
    category: 'Hipnose',
    tags: ['sono', 'relaxamento', 'noite'],
    releaseDate: '2023-06-20',
    plays: 8700
  },
  '3': {
    id: '3',
    title: 'Sons da Natureza: Floresta Tropical',
    artist: 'Natureza Viva',
    duration: '45:00',
    coverUrl: '/assets/placeholder.svg',
    audioUrl: 'https://example.com/audio3.mp3',
    description: 'Imersão sonora em uma floresta tropical com sons de pássaros, água e vento entre as árvores.',
    category: 'Sons Ambientes',
    tags: ['natureza', 'relaxamento', 'ambiente'],
    releaseDate: '2023-04-10',
    plays: 15200
  }
};

const AudioDetails = () => {
  const { id } = useParams();
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { playAudio } = usePlayer();
  const { currentUser } = useAuth();

  useEffect(() => {
    // Simulação de busca de dados
    // Em um app real, isso seria uma chamada de API
    setTimeout(() => {
      if (mockAudioData[id]) {
        setAudio(mockAudioData[id]);
        setLoading(false);
      } else {
        setError('Áudio não encontrado');
        setLoading(false);
      }
    }, 800);
  }, [id]);

  const handlePlay = () => {
    if (audio) {
      playAudio(audio);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-pink"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <h2 className="text-2xl font-bold mb-4">{error}</h2>
        <Link to="/" className="btn-primary">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  if (!audio) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagem de capa */}
          <div className="w-full md:w-1/3">
            <img 
              src={audio.coverUrl} 
              alt={audio.title} 
              className="w-full h-auto rounded-lg shadow-lg"
            />
            
            <div className="mt-4 flex flex-col gap-2">
              <button 
                onClick={handlePlay}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Reproduzir
              </button>
              
              {currentUser && (
                <button className="btn-secondary flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  Salvar na Biblioteca
                </button>
              )}
            </div>
          </div>
          
          {/* Detalhes do áudio */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{audio.title}</h1>
            <p className="text-xl mb-4">{audio.artist}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span>{audio.duration}</span>
              <span>•</span>
              <span>{audio.category}</span>
              <span>•</span>
              <span>{new Date(audio.releaseDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{audio.plays.toLocaleString()} reproduções</span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Descrição</h2>
              <p className="text-gray-700 dark:text-gray-300">{audio.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {audio.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Compartilhar</h2>
              <div className="flex gap-4">
                <button className="p-2 bg-blue-600 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="p-2 bg-blue-800 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </button>
                <button className="p-2 bg-green-600 text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioDetails; 