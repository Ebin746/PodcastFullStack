import styled from "styled-components";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MicNoneRoundedIcon from "@mui/icons-material/MicNoneRounded";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { Link } from "react-router-dom";

const SideBar = ({
  menuOpen,
  setMenuOpen,
  darkMod,
  setDarkMod,
  handleLogout,
}) => {
  const Menuitems = [
    {
      link: "/",
      name: "Dashbord",
      icon: <HomeRoundedIcon />,
    },
    {
      link: "/search",
      name: "Search",
      icon: <SearchIcon />,
    },
    {
      link: "/upload",
      name: "UPLOad",
      icon: <SearchIcon />,
    },
    {
      link: "/favorite",
      name: "Favourites",
      icon: <FavoriteIcon />,
    },
  ];
  const buttons = [
    {
      fun: () => setDarkMod((darkMod) => !darkMod),
      name: darkMod ? "Dark mod " : "Light Mod",
      icon: darkMod ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />,
    },
    {
      fun: () => handleLogout(),
      name: "Log Out",
      icon: <LogoutRoundedIcon />,
    },
  ];

  return (
    <MenuContainer menuOpen={menuOpen}>
      {" "}
      <Flex>
        <Mic>
          <MicNoneRoundedIcon />
        </Mic>
        <Logo>PodCastStream</Logo>
        <Close>
          <CloseRoundedIcon
            onClick={() => {
              setMenuOpen((menuOpen) => !menuOpen);
            }}
            style={{ cursor: "pointer" }}
          />
        </Close>
      </Flex>
      {Menuitems.map((item, index) => (
        <Link key={index} to={item.link} style={{ textDecoration: "none" }}>
          <Elements>
            {item.icon}
            <NavText>{item.name}</NavText>
          </Elements>
        </Link>
      ))}
      <HR />
      {buttons.map((items, i) => (
        <Elements key={i} onClick={items.fun}>
          {items.icon}
          <NavText>{items.name}</NavText>
        </Elements>
      ))}
    </MenuContainer>
  );
};

export default SideBar;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex: 0.5;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${(props) => (props.menuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px;
`;

const Logo = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 20px;
  font-weight: bold;
  margin: 16px 0px;
`;

const Close = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
  margin: 0px 0px 0px 7px;
`;

const Elements = styled.div`
  padding: 10px 20px;
  gap: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  text-decoration: none !important;
  color: ${({ theme }) => theme.text_secondary};
  :hover {
    background-color: ${({ theme }) => theme.text_secondary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Mic = styled.div`
  height: 40px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: block;
`;

const NavText = styled.span`
  padding: 0px 12px;
  text-decoration: none !important;
`;

const HR = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.text_secondary};
  margin: 10px 0px;
`;
