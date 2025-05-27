import React from "react";
import styled from "styled-components";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useAuth } from "../context/authContext";

const NavBar = ({ toggle, handleLogin }) => {
  const { user } = useAuth();
  const userDetails = user;

  return (
    <NavBarContainer>
      {/* Menu icon only visible on small screens */}
      <MenuButton onClick={toggle} aria-label="Open navigation menu">
        <MenuRoundedIcon />
      </MenuButton>

      {/* App title or logo placeholder */}
      <Logo>MyPodcastApp</Logo>

      {/* Spacer pushes login to right */}
      <Spacer />

      <LoginButton
        onClick={() => !userDetails && handleLogin()}
        disabled={!!userDetails}
        aria-label={userDetails ? `Logged in as ${userDetails.userName}` : "Log in"}
      >
        <Person2RoundedIcon />
        <span>{userDetails ? userDetails.userName : "Login"}</span>
      </LoginButton>
    </NavBarContainer>
  );
};

export default NavBar;

// Styled Components
const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.primary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 28px;
  padding: 4px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 20px;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-left: 10px;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primaryLight};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.85rem;
  }
`;