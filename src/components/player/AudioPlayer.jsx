import { useContext, useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiSkipBack, FiSkipForward } from 'react-icons/fi';
import { PlayerContext } from '../../context/PlayerContext';

const AudioPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    progress,
    duration,
    playTrack,
    pauseTrack,
    resumeTrack,
    updateProgress,
    updateVolume,
    updateDuration
  } = useContext(PlayerContext);

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          pauseTrack();
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack, pauseTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      updateProgress(currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      updateDuration(audioRef.current.duration);
    }
  };

  const handleProgressBarClick = (e) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      const newTime = clickPosition * duration;
      
      audioRef.current.currentTime = newTime;
      updateProgress(newTime);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      updateVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      updateVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    updateVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 py-4 px-4 z-40 transition-colors duration-300 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90"
        >
          <audio
            ref={audioRef}
            src={currentTrack.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => pauseTrack()}
          />
          
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Track Info */}
              <div className="flex items-center mb-3 md:mb-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={currentTrack.coverUrl} 
                    alt={currentTrack.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <h4 className="font-poppins font-medium text-gray-800 dark:text-white">{currentTrack.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{currentTrack.artist}</p>
                </div>
              </div>
              
              {/* Player Controls */}
              <div className="flex flex-col items-center w-full md:w-1/2">
                <div className="flex items-center space-x-4">
                  <button className="text-gray-700 dark:text-gray-300 hover:text-streama-pink dark:hover:text-streama-pink transition-colors">
                    <FiSkipBack size={20} />
                  </button>
                  
                  <button 
                    onClick={isPlaying ? pauseTrack : resumeTrack}
                    className="bg-streama-gradient hover:bg-opacity-90 text-white rounded-full p-3 transition-all shadow-lg hover:shadow-streama-pink/30 hover:scale-105"
                  >
                    {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} className="ml-0.5" />}
                  </button>
                  
                  <button className="text-gray-700 dark:text-gray-300 hover:text-streama-pink dark:hover:text-streama-pink transition-colors">
                    <FiSkipForward size={20} />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full mt-3 flex items-center space-x-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{formatTime(progress)}</span>
                  <div 
                    ref={progressBarRef}
                    onClick={handleProgressBarClick}
                    className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer relative group"
                  >
                    <div 
                      className="h-full bg-streama-gradient"
                      style={{ width: `${(progress / duration) * 100}%` }}
                    ></div>
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white shadow-md border-2 border-streama-pink opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ left: `calc(${(progress / duration) * 100}% - 8px)` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{formatTime(duration)}</span>
                </div>
              </div>
              
              {/* Volume Control */}
              <div className="flex items-center space-x-2 mt-3 md:mt-0">
                <button 
                  onClick={toggleMute}
                  className="text-gray-700 dark:text-gray-300 hover:text-streama-pink dark:hover:text-streama-pink transition-colors"
                >
                  {isMuted || volume === 0 ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 md:w-24 accent-streama-pink"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioPlayer; 