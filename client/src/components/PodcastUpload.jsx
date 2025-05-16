import { useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import axiosInstance from "../utils/axiosInstance";
import ProgressBar from "../components/LoadingBar";

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

  // Podcast categories
  const categories = [
    "Technology",
    "Business",
    "Education",
    "Health & Fitness",
    "Arts",
    "Comedy",
    "Music",
    "News & Politics",
    "Science",
    "Society & Culture",
    "Sports",
    "True Crime",
    "Fiction",
    "Religion & Spirituality",
    "History"
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
    setCategory(selectedCategory);
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

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
          <ProgressBar progress={progress} />
        </>
      ) : (
        <UploadContainer>
          <Title>Upload Podcast</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Category</Label>
            <DropdownContainer>
              <DropdownButton 
                type="button" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                isEmpty={!category}
              >
                {category || "Select a category"}
                <DropdownIcon isOpen={isDropdownOpen}>▼</DropdownIcon>
              </DropdownButton>
              {isDropdownOpen && (
                <DropdownMenu>
                  {categories.map((cat) => (
                    <DropdownItem 
                      key={cat} 
                      onClick={() => handleCategorySelect(cat)}
                      isSelected={category === cat}
                    >
                      {cat}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </DropdownContainer>

            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={podcast.title}
              onChange={handleInputChange}
              required
            />

            <Label>About</Label>
            <TextArea
              name="about"
              value={podcast.about}
              onChange={handleInputChange}
              required
              rows="4"
            />

            <Label>Creator Name</Label>
            <Input
              type="text"
              name="creatorName"
              value={podcast.creatorName}
              onChange={handleInputChange}
              required
            />

            <Label>Audio File</Label>
            <FileInputContainer>
              <FileInputLabel htmlFor="audio-file">
                {audioFile ? audioFile.name : "Choose an audio file"}
              </FileInputLabel>
              <FileInput
                id="audio-file"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                required
              />
            </FileInputContainer>

            <Button type="submit" disabled={!category}>Upload Podcast</Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Form>
        </UploadContainer>
      )}
    </>
  );
};

export default PodcastUpload;

const UploadContainer = styled.div`
overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #eaf2f9;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  margin: auto;
  box-shadow: 1px 4px 20px rgba(183, 7, 247, 0.97);
  transform: perspective(1000px) rotateX(1deg) rotateY(1deg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: perspective(1000px) rotateX(-1deg) rotateY(-1deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    padding: 15px;
    width: 80%;
  }
`;

const Title = styled.h2`
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin: 10px 0;
  font-size: 1.1em;
  font-weight: 500;
  color: #444;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const Input = styled.input`
  padding: 12px;
  margin: auto;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 90%;
  font-size: 1em;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #9056b8;
    box-shadow: 0 0 0 2px rgba(144, 86, 184, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  margin: auto;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 90%;
  font-size: 1em;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #9056b8;
    box-shadow: 0 0 0 2px rgba(144, 86, 184, 0.2);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto 15px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  color: ${props => props.isEmpty ? '#757575' : '#333'};
  
  &:hover {
    border-color: #9056b8;
  }
  
  &:focus {
    outline: none;
    border-color: #9056b8;
    box-shadow: 0 0 0 2px rgba(144, 86, 184, 0.2);
  }
`;

const DropdownIcon = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  font-size: 0.8em;
  margin-left: 8px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 5px;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Fancy scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #b388db;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #9056b8;
  }
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.isSelected ? '#f0e6fa' : 'transparent'};
  color: ${props => props.isSelected ? '#9056b8' : '#333'};
  
  &:hover {
    background-color: #f0e6fa;
    color: #9056b8;
  }
  
  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const FileInputContainer = styled.div`
  width: 90%;
  margin: 0 auto 15px;
`;

const FileInputLabel = styled.label`
  display: block;
  padding: 12px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  &:hover {
    border-color: #9056b8;
    color: #9056b8;
  }
`;

const FileInput = styled.input`
  position: absolute;
  left: -9999px;
`;

const Button = styled.button`
  padding: 12px;
  background: linear-gradient(135deg, #9056b8 0%, #6c3da8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  margin: 20px auto;
  width: 90%;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #a56cc4 0%, #7745b6 100%);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1em;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin: 10px auto;
  text-align: center;
  padding: 10px;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 5px;
  width: 90%;
  font-weight: 500;
`;