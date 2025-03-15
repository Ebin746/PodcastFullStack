# Podcast Platform

## Overview
Podcast Platform is a full-stack application that allows users to listen to, upload, and share podcasts by creating an account. The platform features an intuitive user interface, secure authentication, and podcast management capabilities.

## Live Demo
🔗 [Podcast Platform](https://podcasto.netlify.app)

## Tech Stack
- **Frontend:** React (Vite), Material UI, Styled Components, React Router, React Toastify
- **Backend:** Node.js (Express), MongoDB, Cloudinary
- **Authentication:** Cookies-based authentication (JWT & Cookie Parser)
- **Storage:** Cloudinary (for podcast storage)
- **Other Libraries:** Axios, Lodash, Multer, bcrypt

## Features
✔️ User Authentication (Sign up, Login, Logout)  
✔️ Upload, Listen, and Share Podcasts  
✔️ Secure JWT-based Authentication  
✔️ Search Functionality  
✔️ Favorite Podcasts  
✔️ Responsive UI  
✔️ Fast and Lightweight with Vite  

## Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- Cloudinary Account (for storage)

### Clone the Repository
```sh
git clone https://github.com/your-repo.git
cd podcast-platform
```

### Backend Setup
```sh
cd backend
npm install
npm start
```

### Frontend Setup
```sh
cd client
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in the backend directory and add:
```sh
MONGO_URI=your_mongo_db_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

## Scripts
### Frontend Scripts (Client)
- `npm run dev` - Start the development server
- `npm run build` - Build the app
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts (Server)
- `npm start` - Start the server with Nodemon
- `npm run dev` - Start the server without Nodemon



## License
This project is open-source and available under the MIT License.

