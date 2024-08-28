import React, { useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../utils/axiosInstance';


const AuthForm = ({ handleLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Validation
    if (!userName || !password || (!isLogin && !email) || (!isLogin && !confirmPassword)) {
      setErrorMessage('Please fill out all fields.');
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      let response;
      if (isLogin) {
        response = await axiosInstance.post("/login", {
          userName,
          password
        });
        console.log(response.data);
      } else {
        console.log(userName);
        response = await axiosInstance.post("/signup", {
          userName,
          email,
          password
        });
        console.log(response.data);
      }

      // Log the response for debugging
      console.log(response.data);
       
  
      // if (enCrypttoken) {
      //   // Decode the token
       
      //   console.log(decodedToken);
      //   // Store decoded token in localStorage
      //   localStorage.setItem('user', JSON.stringify(decodedToken));
      // } else {
      //   console.error('Token not found in cookies.');
      //   setErrorMessage("token missing");}


      // For example, store user in localStorage:
   

      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);

      // Clear form fields
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Close the form/modal if needed
      handleLogin(); // Call handleLogin to close the modal
    } catch (error) {
      console.error('Authentication Error:', error);

      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };

  return (
    <Container>
      <Card>
        <CloseButton onClick={handleLogin}>&times;</CloseButton> {/* Close button */}
        <Title>{isLogin ? 'Login' : 'Signup'}</Title>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <InputLabel htmlFor="userName">Username</InputLabel>
            <Input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputContainer>
          {!isLogin && (
            <InputContainer>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
          )}
          <InputContainer>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          {!isLogin && (
            <InputContainer>
              <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputContainer>
          )}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Signup'}
          </Button>
        </form>
        <ToggleButton onClick={toggleForm}>
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </ToggleButton>
      </Card>
    </Container>
  );
};

export default AuthForm;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #8e47f1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a3ed0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

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
  &:focus {
    outline: none;
    border-color: #999;
  }
`;

// const Button = styled.button`
//   padding: 10px 20px;
//   border: none;
//   border-radius: 3px;
//   background-color: #8e47f1;
//   color: white;
//   cursor: pointer;
//   transition: background-color 0.2s ease-in-out;

//   &:hover {
//     background-color: #be1adb;
//   }
// `;

const ToggleButton = styled.button`
  padding: 10px;
  border: none;
  background-color: transparent;
  color: #8e47f1;
  cursor: pointer;
  margin-top: 10px;
  text-align: center;
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

  @media (max-width:420px) {
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
