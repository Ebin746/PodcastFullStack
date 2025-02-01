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
            {Array.from({ length: 10 }).map((_, index) => (
              <Bar key={index} index={index} />
            ))}
          </SoundBars>
        ) : (
          <ImageBox />
        )}
      </InnerBox>

      <ButtonBox>
        <SkipButton onClick={skipBackward}>
          <SkipBack size={18} color="#f2f3f4" />
        </SkipButton>
        <PlayButton onClick={handlePlayClick}>
          <Play size={24} color="#f2f3f4" />
        </PlayButton>
        <SkipButton onClick={skipForward}>
          <SkipForward size={18} color="#f2f3f4" />
        </SkipButton>
      </ButtonBox>
    </Container>
  );
};

export default PlayFrame;

const Container = styled.div`
  max-width: 200px;
  height: 250px;
  background-color: #15171e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  margin: auto;
`;

const ButtonBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #1c1e27;
  border-top: 2px solid #121212;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.3);
`;

const PlayButton = styled.div`
  width: 40px;
  height: 40px;
  margin: 2px;
  border-radius: 50%;
  background-color: #be1adb;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: #9b12af;
  }
`;

const SkipButton = styled.div`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  background-color: #5c5b5b;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: #4c4b4b;
  }
`;

const ImageBox = styled.div`
  width: 170px;
  height: 170px;
  background-color: #121212;
  border-radius: 10px;
  border: 2px solid #be1adb;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const SoundBars = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 170px;
  width: 170px;
  border-radius: 10px;
  background: #15171e;
`;

const soundAnimation = keyframes`
  0% { opacity: 0.35; height: 3px; }
  100% { opacity: 1; height: 70px; }
`;

const Bar = styled.div`
  background: #52467b;
  width: 10px;
  margin: 0 4px;
  border-radius: 5px;
  animation: ${soundAnimation} 0ms ${({ index }) => -index * 100}ms linear infinite alternate;
  animation-duration: ${({ index }) => 400 + index * 50}ms;
`;

const InnerBox = styled.div`
  width: 170px;
  height: 170px;
  background-color: #1c1e27;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;