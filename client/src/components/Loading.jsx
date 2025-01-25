import styled, { keyframes } from 'styled-components';

const wave = keyframes`
  50%, 75% {
    transform: scale(2.5);
  }
  80%, 100% {
    opacity: 0;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const colors = ['#7ef9ff', '#89cff0', '#4682b4', '#0f52ba', '#000080'];

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #222;
  flex-direction: column;
  position: relative;
`;

const DotWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 2s linear infinite;
`;

const Dot = styled.div`
  width: 2em;
  height: 2em;
  margin: 0.8em;
  border-radius: 50%;
  background: ${(props) => props.bgColor};
  animation: ${wave} 2s ease-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 1.5em;
  margin-top: 1em;
`;

const Loading = () => (
  <LoadingWrapper>
    <DotWrapper>
      {colors.map((color, i) => (
        <Dot key={i} bgColor={color} delay={i * 0.2} />
      ))}
    </DotWrapper>
    <LoadingText>Loading...</LoadingText>
  </LoadingWrapper>
);

export default Loading;
