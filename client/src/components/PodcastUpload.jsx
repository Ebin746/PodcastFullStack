import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "./Loading";
import axiosInstance from "../utils/axiosInstance";
import ProgressBar from "../components/LoadingBar"

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
  const [progress, setProgress] = useState(0); // Track upload progress

  const handleInputChange = (e) => {
    setPodcast({
      ...podcast,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(0); // Reset progress bar before starting the upload
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
          // Update progress as upload happens
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
          <ProgressBar progress={progress} /> {/* Display the progress bar */}
        </>
      ) : (
        <UploadContainer>
          <Title>Upload Podcast</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Category</Label>
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={podcast.title}
              onChange={handleInputChange}
              required
            />

            <Label>About</Label>
            <Input
              type="text"
              name="about"
              value={podcast.about}
              onChange={handleInputChange}
              required
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
            <FileInput
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              required
            />

            <Button type="submit">Upload Podcast</Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Form>
        </UploadContainer>
      )}
    </>
  );
};

export default PodcastUpload;

const UploadContainer = styled.div`
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
    margin-top:10px;
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

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin: auto;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 90%;
`;

const FileInput = styled.input`
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

