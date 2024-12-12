import { useContext, createContext, useState, useRef, useEffect } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    // Handle 'ended' event to reset the state when audio ends
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    };

    // Attach the event listener
    audioRef.current.addEventListener("ended", handleEnded);

    // Cleanup on unmount
    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, currentlyPlaying, audioPlay }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
