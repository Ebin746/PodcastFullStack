import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../context/authContext';
import { X } from 'lucide-react'; // Import the close icon from lucide-react

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const AuthForm = ({ handleLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, login } = useAuth();

  const validateForm = () => {
    if (!userName || !password || (!isLogin && !email) || (!isLogin && !confirmPassword)) {
      setErrorMessage('Please fill out all fields.');
      return false;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await login({ userName, password });
      } else {
        await signup({ userName, email, password });
      }

      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);

      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      handleLogin();
    } catch (error) {
      console.error('Authentication Error:', error);
      setErrorMessage(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
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
        <CloseButton onClick={handleLogin}>
          <X size={20} />
        </CloseButton>
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
  padding: 12px;
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
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  width: 350px;
  height: 500px;
  position: relative;
  animation: ${slideIn} 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 85%;
    padding: 25px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  margin-bottom: 8px;
  color: #555;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #8e47f1;
  }
`;

const ToggleButton = styled.button`
  padding: 12px;
  border: none;
  background-color: transparent;
  color: #8e47f1;
  cursor: pointer;
  margin-top: 0px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #7a3ed0;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin: 12px 0;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #555;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }
`;
