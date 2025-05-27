import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      {/* Main Loading Animation */}
      <LoadingContent>
        <PodcastIcon>
          <MicrophoneIcon>🎙️</MicrophoneIcon>
          <SoundWaves>
            <Wave delay="0s" />
            <Wave delay="0.2s" />
            <Wave delay="0.4s" />
          </SoundWaves>
        </PodcastIcon>
        
        <LoadingText>Loading Podcasts...</LoadingText>
        <LoadingSubtext>Discovering amazing content for you</LoadingSubtext>
        
        {/* Progress Bar */}
        <ProgressContainer>
          <ProgressBar />
        </ProgressContainer>
      </LoadingContent>

      {/* Skeleton Cards */}
    
    </LoadingContainer>
  );
};

export default Loading;

// Animations
const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

const wave = keyframes`
  0%, 100% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1.5);
  }
`;

const progress = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;


// Styled Components
const LoadingContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  padding-top: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(4, 108, 108, 0.1) 50%,
      transparent 70%
    );
    animation: ${shimmer} 3s infinite;
    pointer-events: none;
  }
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  z-index: 2;
`;

const PodcastIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MicrophoneIcon = styled.div`
  font-size: 4rem;
  animation: ${pulse} 2s infinite;
  filter: drop-shadow(0 0 20px rgba(4, 108, 108, 0.5));
`;

const SoundWaves = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Wave = styled.div`
  width: 4px;
  height: 30px;
  background: linear-gradient(to top, rgba(4, 108, 108, 0.3), rgb(4, 108, 108));
  border-radius: 2px;
  animation: ${wave} 1.5s infinite;
  animation-delay: ${({ delay }) => delay};
`;

const LoadingText = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  text-align: center;
  animation: ${pulse} 2s infinite;
`;

const LoadingSubtext = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text_secondary || '#888'};
  margin: 0;
  text-align: center;
  animation: ${pulse} 2s infinite 0.5s;
`;

const ProgressContainer = styled.div`
  width: 300px;
  height: 4px;
  background: ${({ theme }) => theme.bgLight || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 2px;
  overflow: hidden;
  margin-top: 1rem;

  @media (max-width: 450px) {
    width: 250px;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(90deg, rgb(4, 108, 108), rgba(4, 108, 108, 0.7));
  border-radius: 2px;
  animation: ${progress} 3s infinite;
`;
