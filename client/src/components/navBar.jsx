import React, { useState } from "react";
import styled from "styled-components";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const navBar = ({ toggle, handleLogin }) => {
  const Details=localStorage.getItem('user');
  let userDetails=Details?JSON.parse(Details):null;
  console.log(userDetails);
  return (
    <>
      <NavBarDiv>
        <MenuRoundedIcon className="menu" onClick={() => toggle()} />
        <ButtonId onClick={() => !userDetails?handleLogin():null} disabled={userDetails}>
          <Person2RoundedIcon />
          <p>{userDetails?userDetails.userName:"Login"}</p>
        </ButtonId>
      </NavBarDiv>
    </>
  );
};

export default navBar;

const NavBarDiv = styled.div`
  display: flex;
  padding: 10px 0px 0px;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7);
  color: ${({ theme }) => theme.primary};
  .menu {
    margin-left: 20px;
    cursor: pointer;
    font-size: 30px;
  }
`;

const ButtonId = styled.div`
  display: flex;
  max-width: 80px;
  justify-content: space-around;
  align-items: center;
  margin-right: 10px;
  height: 40px;
  gap: 8px;
  padding: 0px 5px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 15px;
  font-size: 14px;
  p {
    font-weight: bold;
    display: block;
  }
  @media (max-width: 360px) {
    margin-right: 20px;
  }
`;
