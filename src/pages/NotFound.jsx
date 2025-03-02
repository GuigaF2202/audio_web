import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 text-center">
      <h1 className="text-9xl font-bold text-neon-pink mb-4">404</h1>
      
      <h2 className="text-3xl font-bold mb-6">Página Não Encontrada</h2>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Ops! A página que você está procurando parece não existir ou foi movida.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn-primary">
          Voltar para a Página Inicial
        </Link>
        
        <Link to="/library" className="btn-secondary">
          Explorar Biblioteca
        </Link>
      </div>
      
      <div className="mt-16 relative">
        <div className="w-64 h-64 bg-violet-purple bg-opacity-20 dark:bg-opacity-30 rounded-full flex items-center justify-center">
          <div className="w-48 h-48 bg-electric-blue bg-opacity-20 dark:bg-opacity-30 rounded-full flex items-center justify-center">
            <div className="w-32 h-32 bg-neon-pink bg-opacity-20 dark:bg-opacity-30 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="absolute -top-4 -right-4 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neon-pink" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
          </svg>
        </div>
        
        <div className="absolute -bottom-2 -left-2 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-purple" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 