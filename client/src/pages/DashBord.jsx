import styled from "styled-components";
import { Link } from "react-router-dom";
import PodcastCard from "../components/PodcastCard";
import   axios from "axios";
import {  useEffect ,useState} from "react";
import axiosInstance from "../utils/axiosInstance";

const DashBord =() => {
  const UserDeatails=JSON.parse(localStorage.getItem('user'));
  const [podcastDetails,setPodcastDetails]=useState([]);
  const [favPodcasts,setFavPodcasts]=useState([]);
  const fetchPosdcasts=async()=>{
try {
  let response=await axios.get("/api/podcast");
  setPodcastDetails(response.data);
  console.log(response.data)
} catch (error) {
  console.log(error);
}
    }
    const isFavorite=async ()=>{
      try {
        const res=await axiosInstance.get(`/user/fav/${UserDeatails._id}`);
        let favId=res.data.map((item)=>{return item._id});
        console.log(favId)
        setFavPodcasts(favId);
      } catch (error) {
        console.log(error);
      }
    
    }
   useEffect(()=>{
fetchPosdcasts();
isFavorite();
  },[])



  return (
    <MainDashBoard>
      {podcastDetails?.map((category, i) => (
        <Filter key={i} id={category._id}>
          <Topic>
            {category.name.toLocaleUpperCase()}
            <Link className="categorys" to={"#"}>
              <span>Show all</span>
            </Link>
          </Topic>
          <PodCast>
            {category?.podcasts?.map((podcast, j) => (
              <PodcastCard
                key={j}
                id={podcast._id}
                title={podcast.title}
                about={podcast.about}
                creator={podcast.creator?.name}
                views={podcast.views}
                state={favPodcasts.includes(podcast._id)}
              />
            ))}
          </PodCast>
        </Filter>
      ))}
    </MainDashBoard>
  );
};

export default DashBord;

const MainDashBoard = styled.div`
  margin: 16px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  padding-bottom: 200px;
  height: 100%;
  flex-direction: scroll;
  gap: 10px;
  overflow-y: scroll;
  @media (max-width: 720px) {
    padding: 6px 10px;
    margin: 8px;
  }
`;
const Topic = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 2px;
  font-size: 24px;
  .categorys {
    text-decoration: none;
    font-weight: 300;
    color: ${({ theme }) => theme.primary};
    font-size: 20px;
    @media (max-width: 720px) {
      font-size: 14px;
    }
  }
  @media (max-width: 720px) {
    font-size: 18px;
  }
`;

const Filter = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.bg};
  border: none;
  border-radius: 5px;

  padding: 6px;
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const PodCast = styled.div`
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  align-items: center;
  padding-left: 30px;
  background-color: ${({ theme }) => theme.bgLight};
  @media (max-width: 720px) {
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    gap: 30px;
  }
`;
