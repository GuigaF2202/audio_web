import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PlayerProvider } from './context/PlayerContext';
import { ComponentThemeProvider } from './components/ui/ThemeProvider';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AudioPlayer from './components/player/AudioPlayer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Library from './pages/Library';
import AudioDetails from './pages/AudioDetails';
import Playlists from './pages/Playlists';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Layout principal
const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <AudioPlayer />
      <Footer />
    </div>
  );
};

// Criando o router com as flags de futuro
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/library" element={<Library />} />
      <Route path="/audio/:id" element={<AudioDetails />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true
    }
  }
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PlayerProvider>
          <ComponentThemeProvider>
            <RouterProvider 
              router={router} 
              future={{
                v7_startTransition: true
              }}
            />
          </ComponentThemeProvider>
        </PlayerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export { App };
export default App;