import { useState } from "react";
import styled from "styled-components";
import Loading from "../Loading/Loading";
import axiosInstance from "../utils/axiosInstance";
import ProgressBar from "../Loading/LoadingBar";

const PodcastUpload = () => {
  const [category, setCategory] = useState("");
  const [podcast, setPodcast] = useState({
    title: "",
    about: "",
    creatorName: "",
    creatorAvatar: "",
    views: 0,
  });
  const [audioFile, setAudioFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Podcast categories with icons/emojis for better visual recognition
  const categories = [
    { name: "Technology", icon: "💻" },
    { name: "Business", icon: "💼" },
    { name: "Education", icon: "📚" },
    { name: "Health & Fitness", icon: "🏃‍♂️" },
    { name: "Arts", icon: "🎨" },
    { name: "Comedy", icon: "😂" },
    { name: "Music", icon: "🎵" },
    { name: "News & Politics", icon: "📰" },
    { name: "Science", icon: "🔬" },
    { name: "Society & Culture", icon: "🌍" },
    { name: "Sports", icon: "⚽" },
    { name: "True Crime", icon: "🕵️" },
    { name: "Fiction", icon: "📖" },
    { name: "Religion & Spirituality", icon: "🙏" },
    { name: "History", icon: "🏛️" }
  ];

  const handleInputChange = (e) => {
    setPodcast({
      ...podcast,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory.name);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("name", category);
    formData.append(
      "podcast",
      JSON.stringify({
        title: podcast.title,
        about: podcast.about,
        creator: {
          name: podcast.creatorName,
          avatar: podcast.creatorAvatar,
        },
        views: podcast.views,
      })
    );

    try {
      const response = await axiosInstance.post("/podcast/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentage);
        },
      });
      console.log("Upload success:", response.data);
      alert("Podcast uploaded successfully!");
      setPodcast({
        title: "",
        about: "",
        creatorName: "",
        creatorAvatar: "",
        views: 0,
      });
      setCategory("");
      setAudioFile(null);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Please signup.");
      } else {
        setError("Failed to upload podcast.");
      }
      console.error("Error uploading:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCategoryData = categories.find(cat => cat.name === category);

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <Loading />
          <ProgressBar progress={progress} />
          <LoadingText>Uploading your podcast... {progress}%</LoadingText>
        </LoadingContainer>
      ) : (<Wrap>
        <UploadContainer>
          <Header>
            <Title>Create New Podcast</Title>
            <Subtitle>Share your voice with the world</Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>📂 Content Details</SectionTitle>
              
              <FormGroup>
                <Label htmlFor="category">Category *</Label>
                <DropdownContainer>
                  <DropdownButton 
                    type="button" 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    isEmpty={!category}
                    isOpen={isDropdownOpen}
                  >
                    <CategoryDisplay>
                      {selectedCategoryData ? (
                        <>
                          <CategoryIcon>{selectedCategoryData.icon}</CategoryIcon>
                          <CategoryText>{selectedCategoryData.name}</CategoryText>
                        </>
                      ) : (
                        <PlaceholderText>Choose your podcast category</PlaceholderText>
                      )}
                    </CategoryDisplay>
                    <DropdownIcon isOpen={isDropdownOpen}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </DropdownIcon>
                  </DropdownButton>
                  {isDropdownOpen && (
                    <DropdownMenu>
                      <DropdownHeader>Select Category</DropdownHeader>
                      {categories.map((cat) => (
                        <DropdownItem 
                          key={cat.name} 
                          onClick={() => handleCategorySelect(cat)}
                          isSelected={category === cat.name}
                        >
                          <CategoryIcon>{cat.icon}</CategoryIcon>
                          <CategoryText>{cat.name}</CategoryText>
                          {category === cat.name && <CheckMark>✓</CheckMark>}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </DropdownContainer>
              </FormGroup>

              <FormRow>
                <FormGroup flex="2">
                  <Label htmlFor="title">Podcast Title *</Label>
                  <InputWrapper isFocused={focusedField === 'title'}>
                    <Input
                      id="title"
                      type="text"
                      name="title"
                      value={podcast.title}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('title')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter an engaging title"
                      required
                    />
                    <InputIcon>📝</InputIcon>
                  </InputWrapper>
                </FormGroup>

                <FormGroup flex="1">
                  <Label htmlFor="creatorName">Creator Name *</Label>
                  <InputWrapper isFocused={focusedField === 'creatorName'}>
                    <Input
                      id="creatorName"
                      type="text"
                      name="creatorName"
                      value={podcast.creatorName}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('creatorName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your name"
                      required
                    />
                    <InputIcon>👤</InputIcon>
                  </InputWrapper>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="about">Description *</Label>
                <TextAreaWrapper isFocused={focusedField === 'about'}>
                  <TextArea
                    id="about"
                    name="about"
                    value={podcast.about}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('about')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Describe your podcast content, what listeners can expect, and what makes it unique..."
                    required
                    rows="4"
                  />
                  <TextAreaIcon>✍️</TextAreaIcon>
                </TextAreaWrapper>
                <CharacterCount>{podcast.about.length}/500</CharacterCount>
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>🎵 Audio File</SectionTitle>
              
              <FormGroup>
                <Label>Upload Audio File *</Label>
                <FileUploadArea>
                  <FileInputLabel htmlFor="audio-file" hasFile={!!audioFile}>
                    <FileIcon hasFile={!!audioFile}>
                      {audioFile ? "🎧" : "📁"}
                    </FileIcon>
                    <FileText>
                      {audioFile ? (
                        <>
                          <FileName>{audioFile.name}</FileName>
                          <FileSize>{formatFileSize(audioFile.size)}</FileSize>
                        </>
                      ) : (
                        <>
                          <FileMainText>Drop your audio file here</FileMainText>
                          <FileSubText>or click to browse • MP3, WAV, M4A</FileSubText>
                        </>
                      )}
                    </FileText>
                    {audioFile && <FileChangeButton>Change File</FileChangeButton>}
                  </FileInputLabel>
                  <FileInput
                    id="audio-file"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    required
                  />
                </FileUploadArea>
              </FormGroup>
            </FormSection>

            <SubmitSection>
              <Button type="submit" disabled={!category || !audioFile}>
                <ButtonIcon>🚀</ButtonIcon>
                <ButtonText>Publish Podcast</ButtonText>
              </Button>
              
              {error && (
                <ErrorMessage>
                  <ErrorIcon>⚠️</ErrorIcon>
                  <ErrorText>{error}</ErrorText>
                </ErrorMessage>
              )}
            </SubmitSection>
          </Form>
        </UploadContainer>
        </Wrap>
      )}
    </>
  );
};

// Helper function
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
// ...existing code...

export default PodcastUpload;

const Wrap = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
  background: ${({ theme }) => theme.bg};
`;

const UploadContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.bgLight} 0%, ${theme.card} 100%)`};
  border-radius: 24px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  overflow-y: auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.primary}33,
      transparent
    );
  }

  @media (max-width: 768px) {
    margin: 1rem;
    border-radius: 16px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
`;

const LoadingText = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  font-size: 1.1rem;
`;

const Header = styled.div`
  background: ${({ theme }) => theme.bgLight};
  backdrop-filter: blur(20px);
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.card};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.button} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 1.1rem;
  margin: 0;
  font-weight: 400;
`;

const Form = styled.form`
  padding: 2rem;
  background: ${({ theme }) => theme.bgLight};
  backdrop-filter: blur(20px);
`;

const FormSection = styled.div`
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  flex: ${props => props.flex || '1'};
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.bgLight};
  border: 2px solid
    ${({ theme, isFocused }) => (isFocused ? theme.primary : theme.card)};
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${({ theme }) => theme.button};
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1rem 1rem 3rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.text_primary};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  font-size: 1.2rem;
  opacity: 0.7;
`;

const TextAreaWrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.bgLight};
  border: 2px solid
    ${({ theme, isFocused }) => (isFocused ? theme.primary : theme.card)};
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${({ theme }) => theme.button};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.text_primary};
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const TextAreaIcon = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1.2rem;
  opacity: 0.7;
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 0.25rem;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.bgLight};
  border: 2px solid
    ${({ theme, isOpen }) => (isOpen ? theme.primary : theme.card)};
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${({ theme }) => theme.button};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const CategoryDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CategoryIcon = styled.span`
  font-size: 1.2rem;
`;

const CategoryText = styled.span`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const PlaceholderText = styled.span`
  color: ${({ theme }) => theme.text_secondary};
`;

const DropdownIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_secondary};
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.card};
  border-radius: 16px;
  max-height: 320px;
  overflow-y: auto;
  z-index: 50;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.button};
    border-radius: 4px;
  }
`;

const DropdownHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.bgLight};
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DropdownItem = styled.div`
  padding: 0.875rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ theme, isSelected }) =>
    isSelected
      ? `linear-gradient(135deg, ${theme.primary} 0%, ${theme.button} 100%)`
      : 'transparent'};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.text_primary : theme.text_primary};

  &:hover {
    background: ${({ theme, isSelected }) =>
      isSelected
        ? `linear-gradient(135deg, ${theme.primary} 0%, ${theme.button} 100%)`
        : theme.bgLight};
  }
`;

const CheckMark = styled.span`
  margin-left: auto;
  font-weight: bold;
`;

const FileUploadArea = styled.div`
  border: 2px dashed ${({ theme }) => theme.button};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.bgLight};

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.bg};
  }
`;

const FileInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: ${props => (props.hasFile ? '1rem' : '2rem')};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const FileIcon = styled.div`
  font-size: ${props => (props.hasFile ? '2rem' : '3rem')};
  transition: font-size 0.3s ease;
`;

const FileText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const FileMainText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const FileSubText = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const FileName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const FileSize = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const FileChangeButton = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.button} 100%
  );
  color: ${({ theme }) => theme.text_primary};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const FileInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const SubmitSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.button} 100%
  );
  color: ${({ theme }) => theme.text_primary};
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px ${({ theme }) => theme.primary}33;
  min-width: 200px;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px ${({ theme }) => theme.primary}44;
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ButtonIcon = styled.span`
  font-size: 1.2rem;
`;

const ButtonText = styled.span`
  font-weight: 600;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 500;
`;

const ErrorIcon = styled.span`
  font-size: 1.1rem;
`;

const ErrorText = styled.span`
  flex: 1;
`;
// ...existing code...