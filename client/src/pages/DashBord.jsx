import styled from "styled-components";
import { Link } from "react-router-dom";
import PodcastCard from "../components/PodcastCard";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAudio } from "../context/audioContext";
import Loading from "../components/Loading";

const DashBord = () => {
  const [podcastDetails, setPodcastDetails] = useState([]);
  const [favPodcasts, setFavPodcasts] = useState([]);
  const { isPlaying, currentlyPlaying, audioPlay, skipForward, skipBackward } =
    useAudio();
  const [isLoading, setIsLoading] = useState(false);

  // Existing function for fetching podcasts.
  // We comment out the isLoading calls so that our global loading state is not overridden.
  const fetchPodcasts = async () => {
    // setIsLoading(true);
    try {
      let response = await axiosInstance.get("/podcast");
      setPodcastDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const isFavorite = async () => {
    // setIsLoading(true);
    try {
      const token=localStorage.getItem("token");
      if(!token) return;
      const res = await axiosInstance.get(`/user/fav`);
      let favId = res.data.map((item) => item._id);
      setFavPodcasts(favId);
    } catch (error) {
      console.log(error);
    }
  };
  // New combined data fetch to run both API calls in parallel.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([isFavorite(), fetchPodcasts()]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <MainDashBoard>
      {podcastDetails?.map((category, i) => (
        <Filter key={i} id={category._id}>
          <Topic>
            {category.name.toLocaleUpperCase()}
            <Link className="categorys" to={"#"}></Link>
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
                state={favPodcasts.includes(podcast._id.toString())}
                skipForward={skipForward}
                skipBackward={skipBackward}
                onPlay={audioPlay}
                isPlaying={isPlaying}
                currentlyPlaying={currentlyPlaying}
                audioSrc={podcast.src}
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
