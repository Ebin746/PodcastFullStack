import  { useEffect, useState } from 'react'
import PodcastCard from '../components/PodcastCard'
import styled from 'styled-components'
import axiosInstance from '../utils/axiosInstance'
import { useAudio } from '../context/audioContext'
const Favorite = () => {
  const {isPlaying,audioPlay}=useAudio();
  const userDetails=JSON.parse(localStorage.getItem('user'))
  const userId=userDetails?._id
  const [favPodcast,setFavPodcast]=useState([]);
  const [hasFetched, setHasFetched] = useState(false);
const fetchFavorites=async()=>{
if(!userId){
  alert("please login again");
  return;
}
try {
  const res=await axiosInstance.get(`/user/fav`);
console.warn(res.data )
setFavPodcast(res.data);
} catch (error) {
  console.log(error);
}
}

useEffect(() => {
  if (!hasFetched) {
    fetchFavorites();
    setHasFetched(true); // Mark as fetched to prevent re-runs
  }
}, [hasFetched]); 
  return (
 <>
<Filter>
<PodCast>
{favPodcast?.length>0? (
            favPodcast?.map((podcast, j) => (
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
                audioSrc={podcast.src}
              />
            ))
          ) : (
            <p>No favorites found.</p> // Message when no favorites exist
          )}
</PodCast>
</Filter>
 </>
  )
}

export default Favorite


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