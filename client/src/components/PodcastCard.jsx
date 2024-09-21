import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";
import images from "/images/podcast-neon-signs-style-text-free-vector.jpg";
import axiosIntance from "../utils/axiosInstance"
const PodcastCard = ({ id,title, about, views, creator ,state}) => {
  const [isFavorite, setIsFavorite] = useState(state||false);
  let Details=localStorage.getItem('user')
  const userDetails=JSON.parse(Details);

  const makeFavorite = async () => {
    console.log(state);
    const podcastId=id;
    const userId=userDetails._id
    try {
      let url=`/user/fav/${userId}/${podcastId}`;
      if (isFavorite) {
        await axiosIntance.delete(url);
      } else {
        await axiosIntance.post(url);
      }
    } catch (error) {
console.log(error);      
    }
    setIsFavorite((e) => !e);
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
    </Card>
  );
};

export default PodcastCard;

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
