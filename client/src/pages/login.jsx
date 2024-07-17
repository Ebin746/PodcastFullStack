import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  background-color:transparent;

  @media (max-width: 768px) {
    padding: 5px;
    width: 200px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 200px;
  position: relative;

  @media (max-width: 768px) {
    width: 190px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  &::focus {
    outline: none;
    border-color: #999;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  background-color: #8e47f1;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &::hover {
    background-color: #be1adb;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
`;

const CloseButton = styled.button`
color: black;
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  @media (max-width:420) {
    right: 25px;
  }
  &::before,
  &::after {
    content: '';
    display: block;
    width: 15px;
    height: 2px;
    background-color: #ccc;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setErrorMessage('Please enter username and password');
      return;
    }

    setUsername('');
    setPassword('');
    setErrorMessage('');

    alert('Login successful!');
  };

  return (
    <Container>
      <Card>
        <CloseButton onClick={() => { handleLogin() }} />
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
