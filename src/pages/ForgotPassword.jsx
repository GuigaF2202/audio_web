import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Verifique seu email para instruções de recuperação de senha');
    } catch (err) {
      setError('Falha ao redefinir senha. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <h2 className="text-2xl font-bold text-center mb-6">Recuperar Senha</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Enviaremos um link para redefinir sua senha.
              </p>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Recuperar Senha'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p>
              Lembrou sua senha?{' '}
              <Link to="/login" className="text-neon-pink hover:underline">
                Faça login
              </Link>
            </p>
          </div>
          
          <div className="mt-2 text-center">
            <p>
              Não tem uma conta?{' '}
              <Link to="/register" className="text-neon-pink hover:underline">
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 