import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import styled from "styled-components";
import images from "/images/podcast-neon-signs-style-text-free-vector.jpg";
import axiosIntance from "../utils/axiosInstance";
import PlayFrame from "./PlayFrame";
import { useAuth } from "../context/authContext";

const PodcastCard = ({
  id,
  title,
  about,
  views,
  creator,
  state,
  skipForward,
  skipBackward,
  audioSrc,
  isPlaying,
  onPlay,
  currentlyPlaying,
}) => {
  const [isFavorite, setIsFavorite] = useState(state);
  const { user: userId } = useAuth();
  const isCurrentlyPlaying = isPlaying && currentlyPlaying === id;

  const makeFavorite = async () => {
    const podcastId = id;

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
  };

  return (
    <Card isPlaying={isCurrentlyPlaying}>
      {isCurrentlyPlaying ? (
        <PlayFrameContainer>
          <PlayFrame
            onPlay={onPlay}
            isPlaying={isPlaying}
            id={id}
            audioSrc={audioSrc}
            skipForward={skipForward}
            skipBackward={skipBackward}
          />
      
        </PlayFrameContainer>
      ) : (
        <>
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
                  <Profile className="Profile">
                    {creator.toString().charAt(0)}
                  </Profile>
                  <Name>{creator}</Name>
                </Creators>
              </CreatorsInfo>
            </MainInfo>
          </CardDetails>
        </>
      )}
    </Card>
  );
};

export default PodcastCard;

// Styled components
const Card = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: ${({ isPlaying }) => (isPlaying ? "24px" : "8px")};
  display: flex;
  flex-direction: column;
  background: ${({ theme, isPlaying }) => 
    isPlaying 
      ? "linear-gradient(145deg, #1a1d29, #0f1117)" 
      : theme.bg
  };
  width: 220px;
  height: ${({ isPlaying }) => (isPlaying ? "340px" : "300px")};
  justify-content: ${({ isPlaying }) => (isPlaying ? "center" : "space-around")};
  padding: ${({ isPlaying }) => (isPlaying ? "15px" : "7px")};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ isPlaying }) => 
    isPlaying 
      ? `0 8px 32px rgba(0, 0, 0, 0.6),
         0 2px 8px rgba(0, 0, 0, 0.3),
         inset 0 1px 0 rgba(255, 255, 255, 0.1)`
      : "none"
  };

  &:hover {
    transform: ${({ isPlaying }) => (isPlaying ? "scale(1.02)" : "scale(1.05)")};
  }

  @media (max-width: 450px) {
    margin-top: 0px;
    margin-bottom: 10px;
  }
`;

const PlayFrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  gap: 15px;
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

const Name = styled.div`
  padding-top: 5px;
`;

const Profile = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 30px;
  height: 28px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
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
    z-index: 2;
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
  color: ${({ isFavorite }) => (isFavorite ? "#ff4757" : "#ccc")};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

  &:hover {
    color: ${({ isFavorite }) => (isFavorite ? "#ff3742" : "#fff")};
    transform: scale(1.2);
    filter: drop-shadow(0 4px 8px rgba(255, 71, 87, 0.4));
  }

  &:active {
    transform: scale(1.1);
  }
`;

const PlayButtonStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 15px;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  ${Card}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translate(-50%, -50%) scale(1.1);
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.95);
  }

  ${({ isPlaying }) =>
    isPlaying &&
    `opacity: 1;
     background: rgba(240, 147, 251, 0.2);
     border-color: rgba(240, 147, 251, 0.3);
  `}
`;

const PlayArrowIconStyled = styled(PlayArrowIcon)`
  color: #ffffff;
  font-size: 40px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;