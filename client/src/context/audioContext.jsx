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

  const skipForward=()=>{
    if(audioRef.current.src){
   audioRef.current.currentTime=Math.min(audioRef.current.currentTime+10,audioRef.current.duration)
   console.log(audioRef.current.currentTime)
    }
  }
  const skipBackward=()=>{
    if(audioRef.current.src){
   audioRef.current.currentTime=Math.max(audioRef.current.currentTime-10,0)
    }
  }
  return (
    <AudioContext.Provider value={{ isPlaying, currentlyPlaying, audioPlay,skipBackward,skipForward }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
