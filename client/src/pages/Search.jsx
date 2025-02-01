import  { useEffect, useState } from "react";
import { styled, keyframes } from "styled-components"; // Corrected import
import SearchIcon from "@mui/icons-material/Search";
import { HashLink } from "react-router-hash-link";
import axiosInstance from "../utils/axiosInstance";
import debounce from "lodash/debounce";
import Loading from "../components/Loading";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // State for search results
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      // Optional: Handle empty query
      alert("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance(
        `/podcast/search?query=${encodeURIComponent(
          query.trim()
        )}&page=1,limit=10`
      );
      console.log(response);

      setResults(response.data);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
      setQuery("");
      setSuggestions([]);
    }
  };
  //sugestion maker
  const fetchSuggestions = async () => {
    try {
      const result = await axiosInstance.get(
        `/podcast/suggestions?query=${encodeURIComponent(query)}&limit=10`
      );
      // Assuming result.data is an array of objects
      const objects = result.data.results;
      console.log(objects);
      setSuggestions(
        objects.map((item) => ({ id: item._id, name: item.title }))
      );
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 1000);

    debouncedFetchSuggestions();

    // Cleanup function to cancel the debounce in case of component unmount or query change
    return () => {
      debouncedFetchSuggestions.cancel(); // Cleanup to avoid multiple requests
    };
  }, [query]); // Only re-run when 'query' changes

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSuggestionClick = (suggestion, e) => {
    e.preventDefault(); // Corrected the typo here
    setQuery(suggestion.name);
    handleSearch();

    console.log(suggestion);
  };
  return (
    <SearchContainer>
      <p className="Heading">Find your podcast</p>
      <BottomSearch>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search Podcast"
            value={query}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <SearchIcon className="search" onClick={handleSearch} />
        </SearchBar>

        <SuggestionsContainer>
          {suggestions.length !== 0 &&
            suggestions?.map((suggestion) => (
              <SuggestionItem
                key={suggestion.id}
                onClick={(e) => handleSuggestionClick(suggestion, e)}
              >
                <SuggestionText>{suggestion.name} </SuggestionText>
              </SuggestionItem>
            ))}
        </SuggestionsContainer>

        <SectionWrapper>
          {loading && <Loading />}
          {error && (
            <p style={{ backgroundColor: "red" }}>Error occured on Searching</p>
          )}
          {results.map((e, i) => (
            <HashLink
              key={i}
              to={`/#${e.title.toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <Sections color={"green"}>
                <PodcastPic>
                  <img
                    src="/images/podcast-neon-signs-style-text-free-vector.jpg"
                    alt={e.title}
                  />
                </PodcastPic>
                <PodcastTitle>
                  <p>{e.title}</p>
                </PodcastTitle>
              </Sections>
            </HashLink>
          ))}
          {!loading && !error && results.length === 0 && (
            <p>just search something</p>
          )}
        </SectionWrapper>
      </BottomSearch>
    </SearchContainer>
  );
};

export default Search;

const SuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 10px;

  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.div`
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const SuggestionText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

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
      animation: ${gradientAnimation} 10s linear infinite;
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

  transition: all 2s;

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
//sections
const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly; // Align items to the start
  flex-wrap: wrap; // Allow items to wrap
  gap: 10px; // Add gap for spacing
`;

const Sections = styled.div`
  border-radius: 10px; // Slightly rounded corners
  height: 120px;
  width: calc(100% - 10px); // Adjust width to allow for margin
  background-color: violet;
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  padding: 10px; // Add padding for inner spacing

  @media (max-width: 720px) {
    width: calc(100% - 10px); // Full width on smaller screens
  }
`;

const BottomSearch = styled.div`
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
`;
const PodcastPic = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
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
  p {
    font-size: 60px;
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
