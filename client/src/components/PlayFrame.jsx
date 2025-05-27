import styled, { keyframes } from "styled-components";
import { Play, SkipBack, SkipForward } from "lucide-react";

const PlayFrame = ({ onPlay, isPlaying, id, audioSrc, skipForward, skipBackward }) => {
  const handlePlayClick = () => {
    onPlay(id, audioSrc);
  };

  return (
    <Container>
      <InnerBox>
        {isPlaying ? (
          <SoundBars>
            {Array.from({ length: 12 }).map((_, index) => (
              <Bar key={index} index={index} />
            ))}
          </SoundBars>
        ) : (
          <ImageBox>
            <PlayOverlay onClick={handlePlayClick}>
              <Play size={32} color="#ffffff" fill="#ffffff" />
            </PlayOverlay>
          </ImageBox>
        )}
      </InnerBox>

      <ButtonBox>
        <SkipButton onClick={skipBackward}>
          <SkipBack size={20} color="#ffffff" />
        </SkipButton>
        <PlayButton onClick={handlePlayClick} isPlaying={isPlaying}>
          <Play size={28} color="#ffffff" fill={isPlaying ? "#ffffff" : "none"} />
        </PlayButton>
        <SkipButton onClick={skipForward}>
          <SkipForward size={20} color="#ffffff" />
        </SkipButton>
      </ButtonBox>
    </Container>
  );
};

export default PlayFrame;

const Container = styled.div`
  max-width: 220px;
  height: 280px;
  background: linear-gradient(145deg, #1a1d29, #0f1117);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.6),
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
  margin: auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 24px;
`;

const PlayButton = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ isPlaying }) => 
    isPlaying 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  };
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 20px rgba(240, 147, 251, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: ${({ isPlaying }) => 
      isPlaying 
        ? 'linear-gradient(135deg, #667eea, #764ba2)'
        : 'linear-gradient(135deg, #f093fb, #f5576c)'
    };
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 
      0 6px 30px rgba(240, 147, 251, 0.6),
      0 4px 16px rgba(0, 0, 0, 0.3);
      
    &::before {
      opacity: 0.3;
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SkipButton = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ImageBox = styled.div`
  width: 180px;
  height: 180px;
  background: linear-gradient(145deg, #2a2d3a, #1e202b);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.1),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2),
    0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(145deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      transparent 50%, 
      rgba(0, 0, 0, 0.1) 100%
    );
    border-radius: 20px;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 
      inset 0 2px 4px rgba(255, 255, 255, 0.15),
      inset 0 -2px 4px rgba(0, 0, 0, 0.25),
      0 6px 30px rgba(0, 0, 0, 0.4);
  }
`;

const PlayOverlay = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }
`;

const SoundBars = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  width: 180px;
  border-radius: 20px;
  background: linear-gradient(145deg, #2a2d3a, #1e202b);
  border: 1px solid rgba(255, 255, 255, 0.1);
  gap: 3px;
  padding: 20px;
`;

const soundAnimation = keyframes`
  0% { 
    opacity: 0.4; 
    height: 8px;
    background: linear-gradient(180deg, #667eea, #764ba2);
  }
  50% {
    opacity: 1;
    background: linear-gradient(180deg, #f093fb, #f5576c);
  }
  100% { 
    opacity: 0.8; 
    height: 80px;
    background: linear-gradient(180deg, #667eea, #764ba2);
  }
`;

const Bar = styled.div`
  background: linear-gradient(180deg, #667eea, #764ba2);
  width: 6px;
  height: 8px;
  border-radius: 3px;
  animation: ${soundAnimation} ${({ index }) => 600 + index * 100}ms 
    ${({ index }) => -index * 150}ms linear infinite alternate;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
`;

const InnerBox = styled.div`
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;