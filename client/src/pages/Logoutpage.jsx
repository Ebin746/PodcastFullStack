
import styled from 'styled-components';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../context/authContext';
const LogoutCard = ({ handleLogout}) => {
   const {logout,user}=useAuth()
    async function ConformLogout(){
        console.log(user)
        try {
          await logout();

toast.success("Logged out successfully!"); // ✅ Success toast
        } catch (error) {
          console.error(error)
        } 
        handleLogout()
    }

  return (
    <LogoutCardContainer className={'visible'}>
      <LogoutContent>
        <LogoutText>Are you sure you want to log out?</LogoutText>
        <div>
          <LogoutButton onClick={() => ConformLogout()}>Confirm</LogoutButton>
          <NotNowButton onClick={handleLogout}>Not Now</NotNowButton>
        </div>
      </LogoutContent>
    </LogoutCardContainer>
  );
};

export default LogoutCard;

const LogoutCardContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const LogoutContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const LogoutText = styled.p`
  font-size: 16px;
  margin: 0;
  color: #333;
  text-align: center;
`;

const LogoutButton = styled.button`
  margin: 10px 0px 10px 2px;
  background-color: #be1adb;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.3) ease-in;
  }
`;

const NotNowButton = styled(LogoutButton)`
  background-color: #e0e0e0;
  color: #333;
`;