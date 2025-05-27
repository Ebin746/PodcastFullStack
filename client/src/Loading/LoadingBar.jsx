
import styled from "styled-components";

const ProgressBar = ({ progress }) => {
  return (
    <ProgressContainer>
      <ProgressBarFill style={{ width: `${progress}%` }} />
      <ProgressText>{progress}%</ProgressText>
    </ProgressContainer>
  );
};

export default ProgressBar;

const ProgressContainer = styled.div`
  z-index: 11;
  width: 100%;
  max-width: 600px; /* Limit max width for larger screens */
  background-color: #e0e0e0;
  border-radius: 10px;
  height: 25px;
  position: relative;
  margin: 0 auto; /* Center horizontally */
  padding: 0 10px; /* Add padding for smaller screens */
`;

const ProgressBarFill = styled.div`
  background-color: #007bff;
  height: 100%;
  border-radius: 10px 0 0 10px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: white;
  font-weight: bold;

  /* Responsive adjustments */
  @media (max-width: 768px) {
    font-size: 12px; /* Smaller font size for tablets and below */
  }

  @media (max-width: 480px) {
    font-size: 10px; /* Further decrease font size for mobile */
  }
`;
