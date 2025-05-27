import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const LandingPage = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
     const token = localStorage.getItem("token"); 
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const scrollToContent = () => {
    const contentSection = document.getElementById('podcast-content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <LandingContainer>
      <HeroSection className={isVisible ? "visible" : ""}>
        <HeroContent>
          <MainTitle>
            Discover Your Next
            <GradientText> Favorite Podcast</GradientText>
          </MainTitle>
          <Subtitle>
            Immerse yourself in endless audio content. From true crime to tech insights, 
            comedy to education - your perfect podcast awaits.
          </Subtitle>
          <CTAButtons>
            {token &&<PrimaryButton onClick={() =>handleNavigation('/upload')}>
              <ButtonIcon>🎙️</ButtonIcon>
              Create Podcast
            </PrimaryButton>}
            <SecondaryButton onClick={scrollToContent}>
              <ButtonIcon>⬇</ButtonIcon>
              Explore Podcasts
            </SecondaryButton>
          </CTAButtons>
        </HeroContent>
        <HeroVisual>
          <PodcastIcon>
            <WaveAnimation />
            <MicrophoneIcon>🎙️</MicrophoneIcon>
          </PodcastIcon>
        </HeroVisual>
      </HeroSection>
    </LandingContainer>
  );
};

export default LandingPage;

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
// Animations
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const wave = keyframes`
  0%, 100% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1);
  }
`;



const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;


const PodcastIcon = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const MicrophoneIcon = styled.div`
  font-size: 6rem;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const WaveAnimation = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${wave} 2s ease-in-out infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 3px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    opacity: 0.6;
  }

  &::before {
    animation: ${wave} 2s ease-in-out infinite 0.5s;
  }

  &::after {
    animation: ${wave} 2s ease-in-out infinite 1s;
    opacity: 0.3;
  }
`;



// Styled Components
const LandingContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  background: linear-gradient(135deg, ${({ theme }) => theme.bg} 0%, ${({ theme }) => theme.bgLight} 100%);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
    height: 100vh;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  animation: ${fadeInUp} 1s ease-out 0.2s both;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(45deg, ${({ theme }) => theme.primary}, #ff6b9d, #c471ed);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradient} 3s ease infinite;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(45deg, ${({ theme }) => theme.primary}, #ff6b9d);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(190, 26, 219, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(190, 26, 219, 0.4);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  border: 2px solid ${({ theme }) => theme.primary};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const ButtonIcon = styled.span`
  font-size: 1.2rem;
`;

const HeroVisual = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeInUp} 1s ease-out 0.4s both;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;
