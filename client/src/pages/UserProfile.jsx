import { useEffect, useState } from "react";
import styled from "styled-components";
import { Trash2, Headphones, PenLine, Upload } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../Loading/Card";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const { data } = await axiosInstance.get("/user/profile");
      console.log(data)
      setUserData(data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePodcast = async (podcastId) => {
    try {
      setIsDeleting(true);
      setDeleteId(podcastId);
      await axiosInstance.delete(`/podcast/${podcastId}`);
      fetchProfile(); // Refresh profile after deletion
    } catch (err) {
      console.error("Failed to delete podcast", err);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleUploadClick = () => {
    navigate("/upload");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading || !userData) return <Loading />;

  return (
    <Container>
      <Header>
        <Title>My Profile</Title>
      </Header>
      
<ProfileCard>
  <ProfileSection>
    <InitialCircle>
      {userData.userName?.charAt(0).toUpperCase()}
    </InitialCircle>
    <UserInfo>
      <UserName>{userData.userName}</UserName>
      <Email>{userData.email}</Email>
    </UserInfo>
  </ProfileSection>
  <EditButton>
    <PenLine size={16} /> Edit Profile
  </EditButton>
</ProfileCard>

      <StatsSection>
        <StatCard>
          <StatValue>{userData.uploads?.length || 0}</StatValue>
          <StatLabel>Podcasts</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{userData.followers?.length || 0}</StatValue>
          <StatLabel>Followers</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{userData.following?.length || 0}</StatValue>
          <StatLabel>Following</StatLabel>
        </StatCard>
      </StatsSection>

      <SectionTitle>
        <Headphones size={20} /> Your Uploaded Podcasts
      </SectionTitle>
      
      {userData.uploads && userData.uploads.length > 0 ? (
        <Grid>
          {userData.uploads.map((podcast) => (
            <Card key={podcast._id}>
              <ImageContainer>
                <Image 
                  src={podcast.imageUrl || "/images/podcast-neon-signs-style-text-free-vector.jpg"} 
                  alt={podcast.title} 
                />
              </ImageContainer>
              <Content>
                <CardTitle>{podcast.title}</CardTitle>
                <CardDescription>{podcast.about}</CardDescription>

              </Content>
              <DeleteButton 
                onClick={() => deletePodcast(podcast._id)}
                disabled={isDeleting && deleteId === podcast._id}
              >
                {isDeleting && deleteId === podcast._id ? 
                  "Deleting..." : 
                  <>
                    <Trash2 size={16} /> Delete
                  </>
                }
              </DeleteButton>
            </Card>
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <EmptyText>You haven't uploaded any podcasts yet.</EmptyText>
          <EmptyButton onClick={handleUploadClick}>
            <Upload size={16} />
            Upload Your First Podcast
          </EmptyButton>
        </EmptyState>
      )}
    </Container>
  );
};

export default UserProfile;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  height: calc(100vh - 60px);
  overflow-y: auto;
  background-color: ${({ theme }) => theme.bgLight};
  color: ${({ theme }) => theme.text_primary};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ProfileCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bgDark};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;



const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const InitialCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #6c63ff;
  color: white;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: ${({ theme }) => theme.text};
`;

const Email = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSoft};
  margin: 0 0 0.25rem 0;
`;



const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.bgDark};
  border-radius: 10px;
  padding: 1.25rem;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const StatValue = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.primary};
`;

const StatLabel = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSoft};
  margin: 0;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const Grid = styled.div`

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.bgDark};

  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.text};
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSoft};
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSoft};
`;

const Category = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
`;

const Date = styled.span``;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: rgba(220, 53, 69, 0.8);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;

  ${Card}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: rgb(220, 53, 69);
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: ${({ theme }) => theme.bgDark};
  border-radius: 12px;
  text-align: center;
`;

const EmptyText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 1.5rem;
`;

const EmptyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;