import { createContext, useState, useContext, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Inicializar o elemento de áudio
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Configurar eventos
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
    }
    
    // Limpar eventos ao desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
      }
    };
  }, []);
  
  // Atualizar o volume quando ele mudar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Atualizar a fonte de áudio quando mudar
  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.src = currentAudio.audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentAudio, isPlaying]);
  
  // Efeito para pausar/reproduzir o áudio quando isPlaying muda
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Erro ao reproduzir áudio:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    // Aqui você pode adicionar lógica para reproduzir a próxima faixa
  };
  
  const playAudio = (audio) => {
    setCurrentAudio(audio);
    setIsPlaying(true);
  };
  
  const pauseAudio = () => {
    setIsPlaying(false);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const changeVolume = (newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };
  
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <PlayerContext.Provider
      value={{
        currentAudio,
        isPlaying,
        duration,
        currentTime,
        volume,
        formatTime,
        playAudio,
        pauseAudio,
        togglePlayPause,
        seekTo,
        changeVolume
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext }; 