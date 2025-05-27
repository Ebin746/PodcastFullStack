import { useEffect, useState } from "react";
import { styled, keyframes } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { HashLink } from "react-router-hash-link";
import axiosInstance from "../utils/axiosInstance";
import debounce from "lodash/debounce";
import Loading from "../Loading/Card";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      const toastId = "empty-search";
      if (!toast.isActive(toastId)) { 
        toast.warn("Please enter a search term.", { toastId, position: "top-right" });
      }
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    
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
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const result = await axiosInstance.get(
        `/podcast/suggestions?query=${encodeURIComponent(query)}&limit=10`
      );
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

    const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);
    debouncedFetchSuggestions();

    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion, e) => {
    e.preventDefault();
    setQuery(suggestion.name);
    setIsSearchFocused(false);
    handleSearch();
    console.log(suggestion);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSuggestions([]);
    setHasSearched(false);
    setError(null);
  };

  return (
    <SearchContainer>
      <HeroSection>
        <HeroTitle>
          <span className="gradient-text">Discover</span> Amazing Podcasts
        </HeroTitle>
        <HeroSubtitle>
          Search through thousands of podcasts and find your next favorite show
        </HeroSubtitle>
      </HeroSection>

      <SearchSection>
        <SearchWrapper $isFocused={isSearchFocused || query.length > 0}>
          <SearchInputContainer>
            <SearchIconStyled />
            <SearchInput
              type="text"
              placeholder="Search for podcasts, topics, or creators..."
              value={query}
              onChange={handleInputChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            {query && (
              <ClearButton onClick={clearSearch}>
                <CloseIcon />
              </ClearButton>
            )}
          </SearchInputContainer>
          
          <SearchButton onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </SearchButton>
        </SearchWrapper>

        {(isSearchFocused && suggestions.length > 0) && (
          <SuggestionsContainer>
            <SuggestionHeader>
              <TrendingUpIcon fontSize="small" />
              <span>Suggestions</span>
            </SuggestionHeader>
            {suggestions.map((suggestion) => (
              <SuggestionItem
                key={suggestion.id}
                onClick={(e) => handleSuggestionClick(suggestion, e)}
              >
                <SearchIcon fontSize="small" className="suggestion-icon" />
                <SuggestionText>{suggestion.name}</SuggestionText>
              </SuggestionItem>
            ))}
          </SuggestionsContainer>
        )}
      </SearchSection>

      <ResultsSection>
        {loading && (
          <LoadingContainer>
            <Loading />
            <LoadingText>Searching for amazing podcasts...</LoadingText>
          </LoadingContainer>
        )}
        
        {error && (
          <ErrorContainer>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorText>Oops! Something went wrong while searching.</ErrorText>
            <RetryButton onClick={handleSearch}>Try Again</RetryButton>
          </ErrorContainer>
        )}

        {!loading && !error && results.length > 0 && (
          <>
            <ResultsHeader>
              Found {results.length} podcast{results.length !== 1 ? 's' : ''} for "{query}"
            </ResultsHeader>
            <ResultsGrid>
              {results.map((podcast, index) => (
                <HashLink
                  key={index}
                  to={`/#${podcast.title.toLowerCase()}`}
                  style={{ textDecoration: "none" }}
                >
                  <PodcastCard $index={index}>
                    <PodcastImageContainer>
                      <PodcastImage
                        src="/images/podcast-neon-signs-style-text-free-vector.jpg"
                        alt={podcast.title}
                      />
                      <PlayOverlay>
                        <PlayButton>▶</PlayButton>
                      </PlayOverlay>
                    </PodcastImageContainer>
                    <PodcastInfo>
                      <PodcastTitle>{podcast.title}</PodcastTitle>
                      <PodcastMeta>Podcast • Recently updated</PodcastMeta>
                    </PodcastInfo>
                  </PodcastCard>
                </HashLink>
              ))}
            </ResultsGrid>
          </>
        )}

        {!loading && !error && hasSearched && results.length === 0 && (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyTitle>No podcasts found</EmptyTitle>
            <EmptyText>
              Try adjusting your search terms or explore different keywords
            </EmptyText>
          </EmptyState>
        )}

        {!hasSearched && !loading && (
          <WelcomeState>
            <WelcomeIcon>🎧</WelcomeIcon>
            <WelcomeTitle>Ready to discover?</WelcomeTitle>
            <WelcomeText>
              Start typing to search through our extensive podcast library
            </WelcomeText>
          </WelcomeState>
        )}
      </ResultsSection>
    </SearchContainer>
  );
};

export default Search;

// Animations
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const SearchContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-y:auto ;
  transition: all 0.3s ease;
`;

const HeroSection = styled.div`
  text-align: center;
  padding: 60px 20px 40px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.bg} 0%, 
    ${({ theme }) => theme.bgLight} 100%);
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.2;
  
  .gradient-text {
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, #ff6b6b);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${gradientShift} 3s ease infinite;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchSection = styled.div`
  padding: 0 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SearchWrapper = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
  transform: ${({ $isFocused }) => $isFocused ? 'scale(1.02)' : 'scale(1)'};
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 60px;
  padding: 0 60px 0 60px;
  border: 2px solid ${({ theme }) => theme.bgLight};
  border-radius: 30px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.1rem;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20,
                0 8px 32px rgba(0, 0, 0, 0.15);
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary}80;
  }
`;

const SearchIconStyled = styled(SearchIcon)`
  position: absolute;
  left: 20px;
  color: ${({ theme }) => theme.text_secondary};
  z-index: 1;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 20px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.bgLight};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const SearchButton = styled.button`
  height: 60px;
  padding: 0 40px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary}, #ff6b6b);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px ${({ theme }) => theme.primary}40;
  white-space: nowrap;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.primary}50;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: ${scaleIn} 0.2s ease;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.bgLight};
`;

const SuggestionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid ${({ theme }) => theme.bgLight};
`;

const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid ${({ theme }) => theme.bgLight}50;

  .suggestion-icon {
    color: ${({ theme }) => theme.text_secondary};
    font-size: 18px;
  }

  &:hover {
    background: ${({ theme }) => theme.bgLight};
    
    .suggestion-icon {
      color: ${({ theme }) => theme.primary};
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SuggestionText = styled.span`
  color: ${({ theme }) => theme.text_primary};
  flex: 1;
`;

const ResultsSection = styled.div`
  padding: 0 20px 60px;
  max-width: 1400px;
  margin: 0 auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  gap: 20px;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 1.1rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  gap: 16px;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 8px;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 1.1rem;
  text-align: center;
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}dd;
    transform: translateY(-1px);
  }
`;

const ResultsHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const PodcastCard = styled.div`
  background: ${({ theme }) => theme.card};

  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.bgLight};
  animation: ${fadeInUp} 0.6s ease ${({ $index }) => $index * 0.1}s both;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    .play-overlay {
      opacity: 1;
    }
  }
`;

const PodcastImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
`;

const PodcastImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${PodcastCard}:hover & {
    transform: scale(1.05);
  }
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  class: play-overlay;
`;

const PlayButton = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  animation: ${pulse} 2s infinite;
`;

const PodcastInfo = styled.div`
  padding: 20px;
`;

const PodcastTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PodcastMeta = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.9rem;
  margin: 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text_primary};
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 1.1rem;
  max-width: 400px;
  line-height: 1.6;
`;

const WelcomeState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  text-align: center;
`;

const WelcomeIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const WelcomeTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text_primary};
`;

const WelcomeText = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 1.1rem;
  max-width: 400px;
  line-height: 1.6;
`;