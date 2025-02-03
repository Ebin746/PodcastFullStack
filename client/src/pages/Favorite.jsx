import { useEffect, useState } from 'react'
import PodcastCard from '../components/PodcastCard'
import styled from 'styled-components'
import axiosInstance from '../utils/axiosInstance'
import { useAudio } from '../context/audioContext'
import { useAuth } from '../context/authContext'
import Loading from "../components/Loading"
const Favorite = () => {
  const { user: userId } = useAuth();
  const { isPlaying, audioPlay, currentlyPlaying } = useAudio();
  const [favPodcast, setFavPodcast] = useState([]);
  const [loading, setLoading] = useState(true);  // Added loading state
  const [error, setError] = useState(null);  // Added error state

  // Fetch favorite podcasts
  const fetchFavorites = async () => {
    if (!userId) {
      alert("Please log in to see your favorite podcasts.");
      return;
    }

    try {
      setLoading(true);  // Start loading
      const res = await axiosInstance.get(`/user/fav`);
      setFavPodcast(res.data);
    } catch (error) {
      setError('Failed to fetch your favorite podcasts. Please try again later.');
      console.log(error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId]); // Dependency on userId to refetch when user logs in/out

  return (
    <>
      <Filter>
        {loading ? (
          <Loading>Loading your favorites...</Loading>  // Show loading message
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>  // Show error message
        ) : (
          <PodCast>
            {favPodcast?.length > 0 ? (
              favPodcast.map((podcast, j) => (
                <PodcastCard
                  key={j}
                  id={podcast._id}
                  title={podcast.title}
                  about={podcast.about}
                  creator={podcast.creator.name}
                  views={podcast.views}
                  state={true}
                  onPlay={audioPlay}
                  isPlaying={isPlaying}
                  currentlyPlaying={currentlyPlaying}
                  audioSrc={podcast.src}
                />
              ))
            ) : (
              <NoFavoritesMessage>No favorites found.</NoFavoritesMessage>  // Message when no favorites exist
            )}
          </PodCast>
        )}
      </Filter>
    </>
  )
}

export default Favorite

// Styled Components

const PodCast = styled.div`
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  align-items: center;
  padding-left: 30px;
  background-color: ${({ theme }) => theme.bgLight};
  transition: padding 0.3s ease;

  @media (max-width: 720px) {
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    gap: 30px;
  }
`;

const Filter = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.bg};
  border: none;
  border-radius: 5px;
  overflow-y: auto;
  padding: 6px;
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;



const ErrorMessage = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.error};
  text-align: center;
`;

const NoFavoritesMessage = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  font-weight: bold;
`;
