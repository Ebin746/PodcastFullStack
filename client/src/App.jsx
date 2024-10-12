import React, { useState } from "react";
import { styled, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Themes";
import SideBar from "./components/sideBar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar.jsx";
import DashBord from "./pages/DashBord.jsx";
import Search from "./pages/Search.jsx";
import Favorite from "./pages/Favorite.jsx";
import AuthForm from "./pages/AuthForm.jsx";
import LogoutCard from "./pages/Logoutpage.jsx";
import PodcastUpload from "./components/PodcastUpload.jsx";

const App = () => {
  const [darkMod, setDarkMod] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const [islogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin((islogin) => !islogin);
    console.log("clicked login");
  }

  const [islogout, setIsLogout] = useState(false);

  function handleLogout() {
    setIsLogout((islogout) => !islogout);
    console.log("clicked logout");
  }

  function MenuOpenClose() {
    setMenuOpen((menuOpen) => !menuOpen);
    console.log("changed");
  }

  return (
    <ThemeProvider theme={darkMod ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <SideBar
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            darkMod={darkMod}
            setDarkMod={setDarkMod}
            handleLogout={handleLogout}
          />
          <Frame>
            <NavBar toggle={MenuOpenClose} handleLogin={handleLogin} />
            <LoginDiv className={islogin ? "active" : ""}>
              <AuthForm handleLogin={handleLogin} />
            </LoginDiv>
            <LogOutDiv className={islogout ? "active" : ""}>
              <LogoutCard handleLogout={handleLogout} />
            </LogOutDiv>
            <Routes>
              <Route
                path="/"
                element={
                  <DashBord islogin={islogin} handleLogin={handleLogin} />
                }
              />
              <Route path="/upload" element={<PodcastUpload/>}/>
              <Route path="/search" element={<Search />} />
              <Route path="/favorite" element={<Favorite />} />
            </Routes>
          </Frame>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLight};
  height: 100vh;
  width: 100%;
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const LoginDiv = styled.div`
  z-index: 4;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;

  &.active {
    z-index: 5;
    opacity: 1;
    pointer-events: auto;
  }
`;

const LogOutDiv = styled.div`
  z-index: 4;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;

  &.active {
    z-index: 5;
    opacity: 1;
    pointer-events: auto;
  }
`;
