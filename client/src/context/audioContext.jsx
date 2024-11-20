import { useContext, createContext, useState, useRef } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioPlay = (id, src) => {
    if (id === currentlyPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.pause();
      audioRef.current.src = src;
      audioRef.current.play();
      setCurrentlyPlaying(id);
      setIsPlaying(true);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, audioPlay }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
