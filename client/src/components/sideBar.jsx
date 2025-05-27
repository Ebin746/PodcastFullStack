import styled from "styled-components";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MicNoneRoundedIcon from "@mui/icons-material/MicNoneRounded";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SideBar = ({
  menuOpen,
  setMenuOpen,
  darkMod,
  setDarkMod,
  handleLogout,
}) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      link: "/",
      name: "Dashboard",
      icon: <HomeRoundedIcon />,
    },
    {
      link: "/search",
      name: "Search",
      icon: <SearchIcon />,
    },
    {
      link: "/upload",
      name: "Upload",
      icon: <UploadRoundedIcon />,
    },
    {
      link: "/favorite",
      name: "Favorites",
      icon: <FavoriteIcon />,
    },
  ];

  const buttons = [
    {
      fun: () => setDarkMod((darkMod) => !darkMod),
      name: darkMod ? "Dark Mode" : "Light Mode",
      icon: darkMod ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />,
    },
    {
      fun: () => handleLogout(),
      name: "Log Out",
      icon: <LogoutRoundedIcon />,
    },
  ];

  // Close menu on route change (mobile)
  useEffect(() => {
    if (window.innerWidth <= 1100) {
      setMenuOpen(false);
    }
  }, [location.pathname, setMenuOpen]);

  return (
    <>
      <Overlay menuOpen={menuOpen} onClick={() => setMenuOpen(false)} />
      <MenuContainer menuOpen={menuOpen}>
        <Header>
          <LogoSection>
            <MicIcon>
              <MicNoneRoundedIcon />
            </MicIcon>
            <Logo>
              <LogoText>PodCast</LogoText>
              <LogoAccent>Stream</LogoAccent>
            </Logo>
          </LogoSection>
          <CloseButton onClick={() => setMenuOpen(false)}>
            <CloseRoundedIcon />
          </CloseButton>
        </Header>

        <Navigation>
          <NavSection>
            {menuItems.map((item, index) => (
              <NavLink 
                key={index} 
                to={item.link} 
                style={{ textDecoration: "none" }}
              >
                <NavItem
                  active={location.pathname === item.link}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  hovered={hoveredItem === index}
                >
                  <IconWrapper active={location.pathname === item.link}>
                    {item.icon}
                  </IconWrapper>
                  <NavText active={location.pathname === item.link}>
                    {item.name}
                  </NavText>
                  <ActiveIndicator active={location.pathname === item.link} />
                </NavItem>
              </NavLink>
            ))}
          </NavSection>

          <Divider />

          <ControlSection>
            {buttons.map((button, i) => (
              <ControlItem
                key={i}
                onClick={button.fun}
                onMouseEnter={() => setHoveredItem(`btn-${i}`)}
                onMouseLeave={() => setHoveredItem(null)}
                hovered={hoveredItem === `btn-${i}`}
                isLogout={i === 1}
              >
                <IconWrapper>{button.icon}</IconWrapper>
                <NavText>{button.name}</NavText>
              </ControlItem>
            ))}
          </ControlSection>
        </Navigation>

        <Footer>
          <FooterText>© 2025 PodCastStream</FooterText>
        </Footer>
      </MenuContainer>
    </>
  );
};

export default SideBar;

// Styled Components
const Overlay = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: ${(props) => (props.menuOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 999;
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 280px;
  background: ${({ theme }) => theme.bg};
  border-right: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.primary + '05'} 0%, 
      transparent 50%, 
      ${({ theme }) => theme.primary + '03'} 100%);
    pointer-events: none;
  }

  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    transform: ${({ menuOpen }) => (menuOpen ? "translateX(0)" : "translateX(-100%)")};
    opacity: ${({ menuOpen }) => (menuOpen ? 1 : 0)};
    transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1), 
                opacity 0.4s ease;
    box-shadow: ${({ menuOpen }) => menuOpen ? "20px 0 40px rgba(0,0,0,0.1)" : "none"};
  }
`;


const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + '15'};
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.primary + '08'} 0%, 
    transparent 100%);
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MicIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.primary}, 
    ${({ theme }) => theme.primary + 'CC'});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 24px ${({ theme }) => theme.primary + '25'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px ${({ theme }) => theme.primary + '35'};
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const LogoText = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.5px;
`;

const LogoAccent = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  display: none;
  @media (max-width: 1100px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: ${({ theme }) => theme.text_secondary + '10'};
    color: ${({ theme }) => theme.text_secondary};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.text_secondary + '20'};
      transform: rotate(90deg);
    }
  }
`;

const Navigation = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  position: relative;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-radius: 16px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 2px 0;
  
  background: ${({ active, theme }) => 
    active 
      ? `linear-gradient(135deg, ${theme.primary}15, ${theme.primary}08)`
      : 'transparent'};
  
  border: 1px solid ${({ active, theme }) => 
    active ? theme.primary + '25' : 'transparent'};

  &:hover {
    background: ${({ active, theme }) => 
      active 
        ? `linear-gradient(135deg, ${theme.primary}20, ${theme.primary}10)`
        : theme.text_secondary + '08'};
    transform: translateX(4px);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${({ active, theme }) => 
    active ? theme.primary : theme.text_secondary};
  transition: all 0.3s ease;
`;

const NavText = styled.span`
  margin-left: 12px;
  font-size: 15px;
  font-weight: ${({ active }) => active ? '600' : '500'};
  color: ${({ active, theme }) => 
    active ? theme.primary : theme.text_secondary};
  transition: all 0.3s ease;
  letter-spacing: -0.2px;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  right: 16px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  opacity: ${({ active }) => active ? 1 : 0};
  transition: all 0.3s ease;
  box-shadow: 0 0 12px ${({ theme }) => theme.primary + '50'};
`;

const Divider = styled.div`
  height: 1px;
  margin: 20px 24px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    ${({ theme }) => theme.text_secondary + '20'} 50%, 
    transparent 100%);
`;

const ControlSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
`;

const ControlItem = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 2px 0;

  &:hover {
    background: ${({ isLogout, theme }) => 
      isLogout ? '#ff4d4f15' : theme.text_secondary + '08'};
    transform: translateX(4px);
  }

  ${IconWrapper} {
    color: ${({ isLogout }) => isLogout ? '#ff4d4f' : 'inherit'};
  }

  ${NavText} {
    color: ${({ isLogout, theme }) => 
      isLogout ? '#ff4d4f' : theme.text_secondary};
  }
`;

const Footer = styled.div`
  padding: 20px 24px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + '15'};
  background: ${({ theme }) => theme.text_secondary + '05'};
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  opacity: 0.7;
`;