import React from "react";
import { styled, keyframes } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import MicNoneRoundedIcon from "@mui/icons-material/MicNoneRounded";
import { Category } from "../utils/Data";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
const Search = () => {
  return (
    <SearchContainer>
      <p className="Heading"> Find your podcast</p>
      <BottomSearch>
        <SearchBar>
          <SearchInput placeholder="Search Podcast" />
          <SearchIcon className="search" />
        </SearchBar>
        {Category.map((e, i) => (
          <HashLink
            key={i}
            to={`/#${e.name.toLocaleLowerCase()}`}
            style={{ textDecoration: "none" }}
          >
            <Sections props={e.color}>
              <PodcastPic>
                <img src={e.img} alt="pic" />
              </PodcastPic>
              <PodcastTitle>
                <p>{e.name}</p>
              </PodcastTitle>
            </Sections>
          </HashLink>
        ))}
      </BottomSearch>
    </SearchContainer>
  );
};

export default Search;

const gradientAnimation = keyframes`
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

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3px;
  background-color: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
  overflow-y: scroll;
  overflow-x: hidden;

  .Heading {
    text-align: center;
    margin: 0px 0px 3px 0px;
    width: 100%;
    height: 40px;
    background-image: repeating-linear-gradient(
      to right,
      #553c9a,
      #ee4b2b 10%,
      #553c9a 20%
    );
    background-size: 200% auto;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 2em;
    animation: ${gradientAnimation} 5s linear infinite;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    @media (max-width: 470px) {
      margin: 0px 4px 2px 10px;
      text-align: start;
      font-size: 1.4em;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
`;
const SearchInput = styled.input`
  width: 50px;
  height: 50px;
  outline: none;
  border: 1px solid white;

  background: ${({ theme }) => theme.bgLight};
  color: white;
  text-shadow: 0 0 10px ${({ theme }) => theme.primary};
  padding: 0 30px 0 20px;
  border-radius: 30px;
  box-shadow: 0 0 25px 0 ${({ theme }) => theme.primary},
    0 20px 25px 0 rgba(0, 0, 0, 0.2);

  transition: all 1s;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    width: 300px;
    opacity: 1;
    cursor: text;
    ~ .search {
      transform: 1s all;
      font-size: 45px;
      transform: rotate(360deg);
      color: ${({ theme }) => theme.primary};
    }
  }
  ~ .search {
    font-size: 30px;
    transition: all 0.5s ease;
  }
  @media (max-width: 720px) {
    &:focus {
      width: 250px;
    }
  }
  @media (max-width: 420px) {
    width: 30px;
    &:focus {
      width: 150px;
    }
  }
`;
const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
//Sections
const Sections = styled.div`
  border-radius: 1%;
  height: 120px;
  width: 100%;
  background-color: ${({ props }) => props};
  display: flex;
  flex-direction: row;
  margin: 10px 0px 10px 10px;
  padding-right: 10px;
`;
const BottomSearch = styled.div`
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
`;
const PodcastPic = styled.div`
  height: 100%;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 210px;
    height: 110px;
    object-fit: fill;
    border: none;
    border-radius: 10%;
    cursor: pointer;
    @media (max-width: 420px) {
      width: 100px;
    }
  }

  @media (max-width: 420px) {
    width: 200px;
  }
`;
const PodcastTitle = styled.div`
  color: ${({ theme }) => theme.text_primary};
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  p {
    font-size: 90px;
    display: inline-block;
    font-weight: 600;

    @media (max-width: 350px) {
      font-size: 20px;
      font-weight: 700;
    }

    @media (min-width: 351px) and (max-width: 420px) {
      font-size: 20px;
    }

    @media (min-width: 421px) and (max-width: 720px) {
      font-size: 30px;
    }
    @media (min-width: 720px) and (max-width: 1000px) {
      font-size: 60px;
    }
  }
`;
