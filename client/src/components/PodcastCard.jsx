import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import styled from "styled-components";
import images from "/images/podcast-neon-signs-style-text-free-vector.jpg";
import axiosIntance from "../utils/axiosInstance";
import PlayFrame from "./PlayFrame";

const PodcastCard = ({
  id,
  title,
  about,
  views,
  creator,
  state,
  audioSrc,
  isPlaying,
  onPlay,
  currentlyPlaying,
}) => {
  const [isFavorite, setIsFavorite] = useState(state);

  let Details = localStorage.getItem("user");
  const userDetails = JSON.parse(Details);

  const makeFavorite = async () => {
    const podcastId = id;
    const userId = userDetails?._id;

    if (!userId) {
      alert("Please login to make favorite");
      return;
    }
    try {
      let url = `/user/fav/${podcastId}`;

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

  const handlePlayClick = () => {
    onPlay(id, audioSrc);
    console.log(id, "::", currentlyPlaying);
  };

  return (
    <Card>
      <Top>
        {isPlaying && currentlyPlaying === id ? (
          <PlayFrame onPlay={onPlay} isPlaying={isPlaying} id={id} audioSrc />
        ) : (
          <>
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
            </PlayButtonStyled>{" "}
          </>
        )}
      </Top>
      {isPlaying && currentlyPlaying === id ? (
        <></>
      ) : (
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
      )}
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
    transition: color 0.4s ease-in-out, transform 0.4s ease-in-out;
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
    
  `}
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
