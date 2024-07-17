import React from 'react'
import PodcastCard from '../components/PodcastCard'
import styled from 'styled-components'
const Favorite = () => {
  return (
 <>
<Filter>
<PodCast>
<PodcastCard
          key={`podcast-${1}`} 
          title="Sample Podcast Title" 
          about="A short description about the podcast." 
          creator="Sample Creator" 
          views={1500}
        />
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