# Personal Blog Platform

## Live URL :- https://personal-blog-platform-sigma.vercel.app
- The backend is deployed on Render's free tier, which may cause the app to enter sleep mode due to inactivity. If you experience any issues, please refresh the page 3–4 times to resolve the problem.

## Tech Stack  
- **Frontend:** Next.js 14 with TypeScript, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB

## Features  
- JWT-based authentication  
- Secured password storage with hashed passwords  
- Implemented all necessary backend routes and frontend pages  
- Used SSR for the homepage  
- Protected dashboard route  
- Used browser-safe cookies instead of localStorage for authentication and session management  

## What makes this project stand out?  
- **Frontend Deployment:** Vercel  
- **Backend Deployment:** Render  
- **Live URL:** [Personal Blog Platform](https://personal-blog-platform-sigma.vercel.app/)
- **Implemented Image Upload with Cloudinary**
- **Implemented Redux for Session management**

## How to Start the Project  

### Backend Setup  
1. Clone the repository  
- git clone https://github.com/digambarJail/personal-blog-platform.git 
- OR
- git clone git@github.com:digambarJail/personal-blog-platform.git
2. Open the personal-blog-platform folder
- cd personal-blog-platform
3. Navigate to the backend folder:  
- cd blog-backend
4. Install Dependencies
- npm install
5. Create a `.env` file in the backend and add:  
- MONGO_URI=your_mongodb_connection_string 
- JWT_SECRET=your_secret_key
- CLOUDINARY_CLOUD_NAME=cloudinary_name
- CLOUDINARY_API_KEY=cloudinary_api_key
- CLOUDINARY_API_SECRET=api_secret
- #Please note :- Cloudinary envs are required only for testing image upload
6. Start the backend server:  
npm start


### Frontend Setup  
1. Navigate to the frontend folder:  
- cd frontend-blog
2. Install dependencies:
- npm install
3. Create a `.env.local` file in the frontend and add:  
- NEXT_PUBLIC_API_URL=http://localhost:5000
- API_URL=http://localhost:5000
4. Start the frontend development server:  
- npm run dev

