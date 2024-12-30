import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #eaf2f9;
  border-radius: 10px;
  width: 50%;
  margin: 20px auto;
  max-height: 600px;
  overflow-y: auto;

  /* Adding shadow */
  box-shadow: 1px 4px 20px rgba(183, 7, 247, 0.97);
  

  /* Adding 3D effect */
  transform: perspective(1000px) rotateX(1deg) rotateY(1deg);

  /* Optional: smooth transition effect when hovering */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: perspective(1000px) rotateX(-1deg) rotateY(-1deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 30px rgba(0, 0, 0, 0.15);
  }
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

   

        <Label>Views</Label>
        <Input
          type="number"
          name="views"
          value={podcast.views}
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