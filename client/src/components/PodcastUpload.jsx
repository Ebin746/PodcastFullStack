import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled components
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  width: 50%;
  margin: 20px auto;
  max-height: 600px;
  overflow-y: auto;
`;

const Title = styled.h2`
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin: 10px 0;
  font-size: 1.1em;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
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
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const PodcastUpload = () => {
  const [category,setCategory]=useState("")
  const [podcast, setPodcast] = useState({
    title: "",
    about: "",
    creatorName: "",
    creatorAvatar: "",
    views: 0,
    imageUrl: "",
  });
  const [audioFile, setAudioFile] = useState(null);
  const [error, setError] = useState(null);

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

    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("name",category)
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
        imageUrl: podcast.imageUrl,
      })
    );

    try {
      const response = await axios.post("/api/podcast/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload success:", response.data);
      alert("Podcast uploaded successfully!");
      // Reset form
      setPodcast({
        title: "",
        about: "",
        creatorName: "",
        creatorAvatar: "",
        views: 0,
        imageUrl: "",
      });
      setAudioFile(null);
    } catch (err) {
      setError("Failed to upload podcast.");
      console.error("Error uploading:", err);
    }
  };

  return (
    <UploadContainer>
      <Title>Upload Podcast</Title>
      <Form onSubmit={handleSubmit}>
      <Label>category</Label>
        <Input
          type="text"
          name="title"
          value={category}
          onChange={(e)=>{setCategory(e.target.value)}}
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

        <Label>Creator Avatar URL</Label>
        <Input
          type="text"
          name="creatorAvatar"
          value={podcast.creatorAvatar}
          onChange={handleInputChange}
          required
        />

        <Label>Views</Label>
        <Input
          type="number"
          name="views"
          value={podcast.views}
          onChange={handleInputChange}
        />

        <Label>Image URL</Label>
        <Input
          type="text"
          name="imageUrl"
          value={podcast.imageUrl}
          onChange={handleInputChange}
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
  );
};

export default PodcastUpload;