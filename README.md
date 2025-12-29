# 🎙️ PodcastFullStack

![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

A full-stack web application designed for podcast management and consumption, featuring user authentication, podcast upload capabilities, and a dynamic frontend interface for browsing and playback. The project provides a comprehensive platform for creators to share content and for listeners to discover and manage their favorite podcasts.

## ✨ Features

### 🔧 Core Functionality
- 🔐 User authentication (signup, login, JWT-based sessions)
- 🎤 Podcast upload and management (create, retrieve, update, delete)
- 🎧 Audio playback with dedicated player frame
- ☁️ Cloud-based media storage via Cloudinary

### 🔍 Content Discovery & Management
- 🔎 Podcast search and suggestions by title and description
- ❤️ Favorite podcast management for users
- 📚 Category-based podcast organization
- ⬆️ User-specific uploaded podcasts and profile management

### 🎨 User Interface
- ⚙️ Responsive design with Material-UI components
- 🌓 Theming support for enhanced user experience
- 🚀 Client-side routing with `react-router-dom`

## 🛠️ Tech Stack

| Category        | Technologies                                                                            |
|-----------------|-----------------------------------------------------------------------------------------|
| Frontend        | [React], [Vite], [Material-UI], [Styled Components], [Axios], [react-router-dom]        |
| Backend         | [Node.js], [Express], [Mongoose], [MongoDB], [jsonwebtoken], [bcrypt], [multer]         |
| Database        | [MongoDB]                                                                               |
| Media Storage   | [Cloudinary]                                                                            |
| Environment     | [Dotenv]                                                                                |
| Deployment      | [Netlify] (Frontend)                                                                    |
| Development     | [ESLint], [Nodemon]                                                                     |

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- Node.js >= 18.0.0
- npm >= 9.0.0 (or yarn/pnpm)
- MongoDB instance (local or cloud-hosted)

### Installation

Clone the repository and install dependencies for both the backend and client.

```bash
# Clone the repository
git clone https://github.com/example/PodcastFullStack.git
cd PodcastFullStack

# Install backend dependencies
cd backend
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory and populate it with the following:

| Variable                     | Description                                            | Required |
|------------------------------|--------------------------------------------------------|----------|
| `DATABASE_URL`               | Connection string for your [MongoDB] instance.         | Yes      |
| `JWT_SECRET`                 | Secret key for signing and verifying JWTs.             | Yes      |
| `CLOUDINARY_NAME`            | Your [Cloudinary] cloud name.                          | Yes      |
| `CLOUDINARY_API_ID`          | Your [Cloudinary] API Key.                             | Yes      |
| `CLOUDINARY_API_SECRET_KEY`  | Your [Cloudinary] API Secret.                          | Yes      |
| `PORT`                       | Port for the backend server to listen on (default: 3000). | No       |

Create a `.env` file in the `client` directory:

| Variable                     | Description                                          | Required |
|------------------------------|------------------------------------------------------|----------|
| `VITE_SERVER_URL`            | Base URL of the backend API (e.g., `http://localhost:3000/api`). | Yes      |

### Running the Application

To start both the backend and frontend development servers:

```bash
# Start backend server
cd backend
npm run dev

# In a new terminal, start frontend development server
cd ../client
npm run dev
```

The frontend application will typically be accessible at `http://localhost:5173` and the backend API at `http://localhost:3000/api`.

## 💻 Development

### Available Scripts

#### Backend (`backend/package.json`)

| Script          | Description                                         |
|-----------------|-----------------------------------------------------|
| `npm run dev`   | Starts the backend server in development mode.      |
| `npm start`     | Starts the backend server using [Nodemon].          |
| `npm run build` | Installs dependencies (used for deployment setup).  |

#### Client (`client/package.json`)

| Script          | Description                                         |
|-----------------|-----------------------------------------------------|
| `npm run dev`   | Starts the [Vite] development server.               |
| `npm run build` | Creates an optimized production build of the client. |
| `npm run lint`  | Runs [ESLint] to check code quality.                 |
| `npm run preview` | Serves the production build locally for testing.    |

### Project Structure

```
.
├── backend/                  # Backend service directory
│   ├── DataBase/             # MongoDB connection setup
│   ├── Schema/               # Mongoose schemas for data models
│   ├── controllers/          # Business logic for API endpoints
│   ├── middlewares/          # Express middleware for auth and file handling
│   ├── utils/                # Utility functions (Cloudinary, JWT)
│   ├── index.js              # Main Express application entry point
│   └── package.json          # Backend dependencies and scripts
└── client/                   # Frontend application directory
    ├── public/               # Static assets
    ├── src/                  # Source code for the React application
    │   ├── App.jsx           # Root React component
    │   ├── Loading/          # Components for loading states
    │   ├── components/       # Reusable UI components
    │   ├── context/          # React Contexts for global state
    │   ├── pages/            # Page-level components for routing
    │   ├── utils/            # Utility functions (axios instance, theming)
    │   ├── index.css         # Global styles
    │   └── main.jsx          # React application entry point
    ├── index.html            # Main HTML file
    ├── netlify.toml          # Netlify deployment configuration
    └── package.json          # Frontend dependencies and scripts
```

## 📡 API Reference

The backend API is structured around authentication, podcast, and user management. All endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint              | Description                      | Auth Required |
|--------|-----------------------|----------------------------------|---------------|
| POST   | `/api/signup`         | Registers a new user account.    | No            |
| POST   | `/api/login`          | Authenticates a user and returns a JWT. | No            |
| POST   | `/api/logout`         | Logs out the current user (client-side token removal). | Yes           |
| GET    | `/api/user/get`       | Retrieves the authenticated user's details. | Yes           |

### Podcasts

| Method | Endpoint                      | Description                                   | Auth Required |
|--------|-------------------------------|-----------------------------------------------|---------------|
| POST   | `/api/podcast/add`            | Uploads a new podcast.                        | Yes           |
| GET    | `/api/podcast/all`            | Retrieves all podcasts categorized.          | No            |
| GET    | `/api/podcast/:id`            | Retrieves a single podcast by ID.             | No            |
| PUT    | `/api/podcast/update/:id`     | Updates an existing podcast by ID.            | Yes           |
| DELETE | `/api/podcast/delete/:id`     | Deletes a podcast by ID.                      | Yes           |
| GET    | `/api/podcast/search`         | Searches podcasts by title or description.    | No            |
| GET    | `/api/podcast/suggestions`    | Retrieves search suggestions by title.        | No            |



## 🚢 Deployment

### Frontend Deployment to Netlify

The frontend application can be easily deployed to [Netlify]:

1.  Push your `client` directory to a GitHub repository.
2.  Log in to your [Netlify] dashboard and select "Add new site" -> "Import an existing project".
3.  Choose your GitHub repository.
4.  [Netlify] will automatically detect the `netlify.toml` file and configure the build command (`npm run build`) and publish directory (`build`).
5.  Configure `VITE_SERVER_URL` as an environment variable in [Netlify] site settings under "Build & deploy" -> "Environment".
6.  Deploy your site.

### Backend Deployment

The backend service, built with [Node.js] and [Express], requires a hosting provider that supports Node.js applications and [MongoDB]. Options include:

-   **Cloud Platforms:** AWS EC2, Google Cloud Run, Azure App Service
-   **PaaS Providers:** Heroku, Render, DigitalOcean App Platform

Ensure your environment variables (`DATABASE_URL`, `JWT_SECRET`, `CLOUDINARY_NAME`, etc.) are configured correctly on your chosen platform.

[react]: https://react.dev
[vite]: https://vitejs.dev
[nodejs]: https://nodejs.org
[express]: https://expressjs.com
[mongoose]: https://mongoosejs.com
[mongodb]: https://www.mongodb.com
[material-ui]: https://mui.com
[styled components]: https://styled-components.com
[axios]: https://axios-http.com
[jsonwebtoken]: https://github.com/auth0/node-jsonwebtoken
[bcrypt]: https://www.npmjs.com/package/bcrypt
[multer]: https://github.com/expressjs/multer
[cloudinary]: https://cloudinary.com
[dotenv]: https://github.com/motdotla/dotenv
[netlify]: https://www.netlify.com
[eslint]: https://eslint.org
[nodemon]: https://nodemon.io
