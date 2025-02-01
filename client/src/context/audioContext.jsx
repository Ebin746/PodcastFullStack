import { useContext, createContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play or pause audio
  const audioPlay = (id, src) => {
    if (id === currentlyPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    } else {
      if (!audioRef.current.paused) {
        audioRef.current.pause(); // Pause any currently playing audio
      }
      audioRef.current.src = src; // Set the new audio source
      audioRef.current.play();
      setCurrentlyPlaying(id);
      setIsPlaying(true);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + 20, audioRef.current.duration);
      audioRef.current.currentTime = newTime;
    }
  };
  
  const skipBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - 20, 0);
      audioRef.current.currentTime = newTime;
    }
  };
  useEffect(() => {
    // Handle 'ended' event to reset the state when audio ends
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    };

    const currentAudio = audioRef.current;

    // Attach the event listener
    currentAudio.addEventListener("ended", handleEnded);

    // Cleanup on unmount
    return () => {
      currentAudio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{ isPlaying, currentlyPlaying, audioPlay, skipForward, skipBackward }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);