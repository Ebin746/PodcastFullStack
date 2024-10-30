import React, { useRef, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import styled from "styled-components";
import images from "/images/podcast-neon-signs-style-text-free-vector.jpg";
import axiosIntance from "../utils/axiosInstance";

const PodcastCard = ({ id, title, about, views, creator, state, audioSrc }) => {
  const [isFavorite, setIsFavorite] = useState(state || false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  let Details = localStorage.getItem("user");
  const userDetails = JSON.parse(Details);

  const makeFavorite = async () => {
    const podcastId = id;
    const userId = userDetails._id;
    try {
      let url = `/user/fav/${userId}/${podcastId}`;
      if (isFavorite) {
        await axiosIntance.delete(url);
      } else {
        await axiosIntance.post(url);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
    setIsFavorite((e) => !e);
  };
  
  const handlePlayRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        throw new Error("error", error);
      });
    }
  };

  const handlePlaySkip = (direction) => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const newTime = direction === "L" ? currentTime - 5 : currentTime + 5;
      if (newTime > 0 && newTime <= audioRef.current.duration) {
        audioRef.current.currentTime = newTime;
        audioRef.current.play().catch((err) => {
          console.log(err);
        });
      }
    }
  };
  const handlePlayClick = () => {
    try {
      console.log("Audio source:", audioSrc);
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play().catch((error) => {
            console.error("Playback error:", error);
          });
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Error in handlePlayClick:", error);
    }
  };

  return (
    <Card>
      <Top>
        <FavoriteIconStyled
          className="icons"
          onClick={makeFavorite}
          isFavorite={isFavorite}
        />
        <CardImage src={images} />
        <PlayButtonStyled onClick={handlePlayClick} isPlaying={isPlaying}>
          <PlayArrowIconStyled isPlaying={isPlaying}>
            <PlayArrowIcon />
          </PlayArrowIconStyled>
        </PlayButtonStyled>
      </Top>
      <CardDetails>
        <MainInfo>
          <Title>{title}</Title>
          <About>{about}</About>
          <CreatorsInfo>
            <Creators>
              <Profile className="Profile">p</Profile>
              <Name>{creator}</Name>
            </Creators>
            <Views>{views}</Views>
          </CreatorsInfo>
        </MainInfo>
      </CardDetails>
      <audio ref={audioRef} src={audioSrc} controls />
    </Card>
  );
};

export default PodcastCard;

// Styled components

const Card = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  width: 220px;
  height: 300px;
  justify-content: space-around;
  padding: 7px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardDetails = styled.div``;

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreatorsInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 6px;
  font-size: 12px;
  width: 100%;
`;

const Views = styled.div``;

const Creators = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Name = styled.div``;

const Profile = styled.div`
  background-color: rgb(4, 108, 108);
  width: 30px;
  height: 28px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const About = styled.div`
  font-size: 14px;
  width: 200px;
  height: 80px;
  white-space: wrap;
  overflow: clip;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Top = styled.div`
  display: flex;
  position: relative;
  object-fit: cover;

  .icons {
    position: absolute;
    right: 8px;
    top: 8px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 10px;
  height: 160px;
  display: block;
  transition: filter 0.3s ease-in-out;
`;

const FavoriteIconStyled = styled(FavoriteIcon)`
  position: absolute;
  right: 8px;
  top: 8px;
  color: ${({ isFavorite }) => (isFavorite ? "red" : "#ccc")};
  cursor: pointer;
  transition: color 1s ease-in-out, transform 0.7s ease-in-out,
    box-shadow 1s ease-in-out;

  &:hover {
    transition: color 0.4s ease-in-out, transform 0.7s ease-in-out;
    color: ${({ isFavorite }) => (isFavorite ? "red" : "#ccccccde")};
    transform: scale(1.7); /* Scale up on hover */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Add box-shadow on hover */
  }

  &:active {
    transform: scale(1.3); /* Scale down when clicked */
  }
`;

const PlayButtonStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 10px; /* Increased padding for better hit area */
  opacity: 0; /* Initially hidden */
  transition: opacity 0.3s ease;

  /* Show on hover */
  ${Card}:hover & {
    opacity: 1;
  }

  /* Scale up when playing */
  ${({ isPlaying }) =>
    isPlaying &&
    `opacity:1;
    animation: pulse 0.5s infinite;
  `}

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const PlayArrowIconStyled = styled(PlayArrowIcon)`
  color: #f8f8f8; /* Change play icon color */
  font-size: 60px; /* Increase icon size */
  display: flex; /* Use flexbox to center the icon */
  align-items: center; /* Align items vertically */
  justify-content: center; /* Align items horizontally */
  height: 100%; /* Ensure it takes full height of parent */
  width: 100%; /* Ensure it takes full width of parent */
`;
