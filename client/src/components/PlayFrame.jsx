import React from 'react';
import styled from 'styled-components';

const PlayFrame = ({onPlay,isPlaying,id,audioSrc,skipBackward,skipForward}) => {
  const handlePlayClick = () => {
    onPlay(id,audioSrc);
     };

  return (
    <Container>
      <InnerBox>
        <ImageBox />
      </InnerBox>

      <ButtonBox>
        <SkipButton onClick={skipBackward}>&lt;&lt;</SkipButton>
        <PlayButton onClick={handlePlayClick}>▶</PlayButton>
        <SkipButton onClick={skipForward}>&gt;&gt;</SkipButton>
      </ButtonBox>
    </Container>
  );
};

export default PlayFrame;

const Container = styled.div`
  max-width: 200px;
  height: 250px;
  background-color: #15171E; /* bg */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  padding: 10px;
`;

const ButtonBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #1C1E27; /* bgLight */
  border-top: 2px solid #121212; /* card */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.3);
`;

const PlayButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #be1adb; /* primary */
  color: #F2F3F4; /* text_primary */
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: #9b12af; /* Slightly darker primary */
  }
`;

const SkipButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #5c5b5b; /* button */
  color: #F2F3F4; /* text_primary */
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: #4c4b4b; /* Slightly darker button */
  }
`;

const ImageBox = styled.div`
  width: 170px;
  height: 170px;
  background-color: #121212; /* card */
  border-radius: 10px;
  border: 2px solid #be1adb; /* primary */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const InnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  animation: rotate 10s linear infinite;
  background: linear-gradient(45deg, #1C1E27, #15171E); /* bgLight to bg */
  border-radius: 50%;
  padding: 15px;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
