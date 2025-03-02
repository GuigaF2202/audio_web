import { createContext, useContext, useState, useEffect } from 'react';

// Altere a declaração do contexto para exportá-lo diretamente
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simula verificação de token ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Função de login
  async function login(email, password) {
    // Simulação de API
    try {
      // Em um app real, isso seria uma chamada de API
      // const response = await axios.post('/api/auth/login', { email, password });
      
      // Simulação de resposta
      if (email === 'usuario@exemplo.com' && password === 'senha123') {
        const userData = {
          id: '1',
          name: 'Usuário Teste',
          email: email,
          photoURL: null
        };
        
        setCurrentUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      } else {
        throw new Error('Email ou senha incorretos');
      }
    } catch (error) {
      throw error;
    }
  }

  // Função de registro
  async function register(name, email) {
    // Simulação de API
    try {
      // Em um app real, isso seria uma chamada de API
      // const response = await axios.post('/api/auth/register', { name, email, password });
      
      // Simulação de resposta
      const userData = {
        id: Date.now().toString(),
        name: name,
        email: email,
        photoURL: null
      };
      
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  }

  // Função de logout
  async function logout() {
    // Em um app real, isso seria uma chamada de API
    // await axios.post('/api/auth/logout');
    
    setCurrentUser(null);
    localStorage.removeItem('user');
  }

  // Função de recuperação de senha
  async function resetPassword() {
    // Em um app real, isso seria uma chamada de API
    // await axios.post('/api/auth/reset-password', { email });
    
    // Simulação de envio de email
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  // Função de atualização de perfil
  async function updateProfile(name, photoURL) {
    try {
      // Em um app real, isso seria uma chamada de API
      // const response = await axios.put('/api/auth/profile', { name, photoURL });
      
      // Atualiza o usuário local
      const updatedUser = {
        ...currentUser,
        name: name || currentUser.name,
        photoURL: photoURL || currentUser.photoURL
      };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    user: currentUser,
    login,
    register,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}