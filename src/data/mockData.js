// Dados simulados para o aplicativo

// Áudios
export const audioData = [
  {
    id: '1',
    title: 'Meditação Guiada para Iniciantes',
    artist: 'Maria Silva',
    duration: '10:15',
    coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://example.com/audio1.mp3',
    description: 'Uma meditação suave para iniciantes que ajuda a acalmar a mente e encontrar paz interior.',
    category: 'Meditação',
    tags: ['iniciantes', 'relaxamento', 'guiada'],
    releaseDate: '2023-05-15',
    plays: 12500,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Hipnose para Dormir Profundamente',
    artist: 'Carlos Mendes',
    duration: '25:30',
    coverUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://example.com/audio2.mp3',
    description: 'Esta hipnose ajuda a relaxar profundamente e preparar o corpo e a mente para um sono reparador.',
    category: 'Hipnose',
    tags: ['sono', 'relaxamento', 'noite'],
    releaseDate: '2023-06-20',
    plays: 8700,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Sons da Natureza: Floresta Tropical',
    artist: 'Natureza Viva',
    duration: '45:00',
    coverUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://example.com/audio3.mp3',
    description: 'Imersão sonora em uma floresta tropical com sons de pássaros, água e vento entre as árvores.',
    category: 'Sons Ambientes',
    tags: ['natureza', 'relaxamento', 'ambiente'],
    releaseDate: '2023-04-10',
    plays: 15200,
    isFeatured: false
  },
  {
    id: '4',
    title: 'Meditação para Ansiedade',
    artist: 'Ana Rodrigues',
    duration: '18:45',
    coverUrl: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://example.com/audio4.mp3',
    description: 'Técnicas de respiração e visualização para acalmar a ansiedade e trazer tranquilidade.',
    category: 'Meditação',
    tags: ['ansiedade', 'estresse', 'respiração'],
    releaseDate: '2023-07-05',
    plays: 22300,
    isFeatured: true
  },
  {
    id: '5',
    title: 'Música para Concentração',
    artist: 'Foco Total',
    duration: '60:00',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://example.com/audio5.mp3',
    description: 'Música ambiente projetada para aumentar o foco e a produtividade durante o trabalho ou estudo.',
    category: 'Música',
    tags: ['concentração', 'estudo', 'trabalho'],
    releaseDate: '2023-03-22',
    plays: 31500,
    isFeatured: false
  },
  {
    id: '6',
    title: 'Relaxamento Muscular Progressivo',
    artist: 'Dr. Paulo Santos',
    duration: '22:10',
    coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    audioUrl: 'https://example.com/audio6.mp3',
    description: 'Técnica de relaxamento que envolve tensionar e relaxar grupos musculares específicos para reduzir a tensão física.',
    category: 'Relaxamento',
    tags: ['tensão', 'músculos', 'relaxamento'],
    releaseDate: '2023-08-12',
    plays: 9800,
    isFeatured: false
  }
];

// Categorias
export const categories = [
  { id: '1', name: 'Meditação', count: 24 },
  { id: '2', name: 'Hipnose', count: 18 },
  { id: '3', name: 'Sons Ambientes', count: 15 },
  { id: '4', name: 'Música', count: 22 },
  { id: '5', name: 'Relaxamento', count: 10 }
];

// Playlists
export const playlists = [
  {
    id: '1',
    title: 'Meditações Favoritas',
    description: 'Minha coleção de meditações para diferentes momentos do dia',
    coverUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    trackCount: 12,
    createdBy: 'Usuário',
    isPublic: true
  },
  {
    id: '2',
    title: 'Para Dormir',
    description: 'Sons e meditações que ajudam a relaxar antes de dormir',
    coverUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    trackCount: 8,
    createdBy: 'Usuário',
    isPublic: true
  },
  {
    id: '3',
    title: 'Foco no Trabalho',
    description: 'Áudios para aumentar a concentração durante o trabalho',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    trackCount: 15,
    createdBy: 'Usuário',
    isPublic: false
  },
  {
    id: '4',
    title: 'Meditação Matinal',
    description: 'Comece o dia com estas meditações energizantes',
    coverUrl: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    trackCount: 7,
    createdBy: 'Usuário',
    isPublic: true
  }
];

// Exportações adicionais para compatibilidade com os arquivos existentes
export const allAudios = audioData;
export const featuredAudios = audioData.filter(audio => audio.isFeatured);
export const popularAudios = [...audioData].sort((a, b) => b.plays - a.plays).slice(0, 4);
export const newReleases = [...audioData].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).slice(0, 4);