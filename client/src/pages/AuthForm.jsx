import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../context/authContext';
import { X, Eye, EyeOff, User, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { darkTheme,lightTheme } from '../utils/Themes';
// Theme configuration


// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(190, 26, 219, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(190, 26, 219, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(190, 26, 219, 0);
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AuthForm = ({ handleLogin, isDarkMode = true }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const { signup, login } = useAuth();

  const theme = isDarkMode ? darkTheme : lightTheme;

  const validateForm = () => {
    if (!userName.trim()) {
      setErrorMessage('Username is required.');
      return false;
    }
    
    if (userName.length < 3) {
      setErrorMessage('Username must be at least 3 characters long.');
      return false;
    }

    if (!password) {
      setErrorMessage('Password is required.');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }

    if (!isLogin) {
      if (!email.trim()) {
        setErrorMessage('Email is required.');
        return false;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage('Please enter a valid email address.');
        return false;
      }

      if (!confirmPassword) {
        setErrorMessage('Please confirm your password.');
        return false;
      }

      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return false;
      }
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
       const result= await signup({ userName, email, password });
       console.log(result);
      }

      const toastId = "auth-success";
      if (!toast.isActive(toastId)) {
        toast.success(`${isLogin ? 'Login' : 'Signup'} successful!`, { 
          toastId, 
          position: "top-right",
          style: {
            background: theme.card,
            color: theme.text_primary,
          }
        });
      }
      
      setTimeout(() => { window.location.reload(); }, 500);

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
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Container theme={theme}>
      <Backdrop />
      <Card theme={theme}>
        <CloseButton onClick={handleLogin} theme={theme}>
          <X size={20} />
        </CloseButton>
        
        <Header>
          <Title theme={theme}>{isLogin ? 'Welcome Back' : 'Create Account'}</Title>
          <Subtitle theme={theme}>
            {isLogin ? 'Sign in to your account' : 'Join us today'}
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputWrapper 
              theme={theme} 
              isFocused={focusedField === 'userName'}
              hasError={errorMessage && !userName.trim()}
            >
              <InputIcon theme={theme}>
                <User size={18} />
              </InputIcon>
              <StyledInput
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onFocus={() => setFocusedField('userName')}
                onBlur={() => setFocusedField('')}
                theme={theme}
              />
            </InputWrapper>

            {!isLogin && (
              <InputWrapper 
                theme={theme} 
                isFocused={focusedField === 'email'}
                hasError={errorMessage && (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))}
              >
                <InputIcon theme={theme}>
                  <Mail size={18} />
                </InputIcon>
                <StyledInput
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  theme={theme}
                />
              </InputWrapper>
            )}

            <InputWrapper 
              theme={theme} 
              isFocused={focusedField === 'password'}
              hasError={errorMessage && password.length < 6}
            >
              <InputIcon theme={theme}>
                <Lock size={18} />
              </InputIcon>
              <StyledInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
                theme={theme}
              />
              <PasswordToggle 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                theme={theme}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </PasswordToggle>
            </InputWrapper>

            {!isLogin && (
              <InputWrapper 
                theme={theme} 
                isFocused={focusedField === 'confirmPassword'}
                hasError={errorMessage && password !== confirmPassword}
              >
                <InputIcon theme={theme}>
                  <Lock size={18} />
                </InputIcon>
                <StyledInput
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField('')}
                  theme={theme}
                />
                <PasswordToggle 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  theme={theme}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </PasswordToggle>
              </InputWrapper>
            )}
          </InputGroup>

          {errorMessage && (
            <ErrorMessage theme={theme}>
              {errorMessage}
            </ErrorMessage>
          )}

          <SubmitButton 
            type="submit" 
            disabled={loading}
            theme={theme}
            isLoading={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner>
                  <Loader2 size={16} />
                </LoadingSpinner>
                Processing...
              </>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </SubmitButton>
        </Form>

        <Divider theme={theme}>
          <DividerLine theme={theme} />
          <DividerText theme={theme}>or</DividerText>
          <DividerLine theme={theme} />
        </Divider>

        <ToggleSection>
          <ToggleText theme={theme}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </ToggleText>
          <ToggleButton onClick={toggleForm} theme={theme}>
            {isLogin ? "Sign up" : 'Sign in'}
          </ToggleButton>
        </ToggleSection>
      </Card>
    </Container>
  );
};

export default AuthForm;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 20px;
  padding: 40px;
  background: ${props => props.theme.card};
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme.bgLight};
  animation: ${slideUp} 0.4s ease-out;
  backdrop-filter: blur(20px);

  @media (max-width: 768px) {
    padding: 30px 25px;
    margin: 15px;
    border-radius: 16px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border: none;
  background: ${props => props.theme.bgLight};
  color: ${props => props.theme.text_secondary};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.primary}20;
    color: ${props => props.theme.primary};
    transform: scale(1.1);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.text_primary};
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${props => props.theme.text_secondary};
  margin: 0;
  font-weight: 400;
`;

const Form = styled.form`
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${props => props.theme.bgLight};
  border: 2px solid ${props => 
    props.hasError ? '#ff4757' : 
    props.isFocused ? props.theme.primary : 
    'transparent'
  };
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    border-color: ${props => props.hasError ? '#ff4757' : props.theme.primary}40;
  }
`;

const InputIcon = styled.div`
  padding: 0 16px;
  color: ${props => props.theme.text_secondary};
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 16px 0;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${props => props.theme.text_primary};
  font-weight: 500;

  &::placeholder {
    color: ${props => props.theme.text_secondary};
    font-weight: 400;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${props => props.theme.bgLight} inset;
    -webkit-text-fill-color: ${props => props.theme.text_primary};
  }
`;

const PasswordToggle = styled.button`
  padding: 16px;
  background: transparent;
  border: none;
  color: ${props => props.theme.text_secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const ErrorMessage = styled.div`
  background: #ff475720;
  border: 1px solid #ff4757;
  color: #ff4757;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${props => props.isLoading ? props.theme.button : props.theme.primary};
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background: ${props => props.theme.primary}dd;
    transform: translateY(-1px);
    animation: ${pulse} 1.5s infinite;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const LoadingSpinner = styled.div`
  animation: ${spin} 1s linear infinite;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0 24px 0;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${props => props.theme.text_secondary}30;
`;

const DividerText = styled.span`
  padding: 0 16px;
  color: ${props => props.theme.text_secondary};
  font-size: 14px;
  font-weight: 500;
`;

const ToggleSection = styled.div`
  text-align: center;
`;

const ToggleText = styled.span`
  color: ${props => props.theme.text_secondary};
  font-size: 14px;
  margin-right: 8px;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.primary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
    transform: scale(1.05);
  }
`;