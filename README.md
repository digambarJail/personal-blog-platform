Personal Blog Platform

Tech Stack

Frontend

Next.js 14 with TypeScript

Tailwind CSS

Backend

Node.js

Express.js

MongoDB

How to Start the Project

Clone the Repository

git clone <repository-url>

Backend Setup

cd blog-backend
npm install
npm start

Environment Variables for Backend (.env):

MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

Frontend Setup

cd frontend-blog
npm install
npm run dev

Environment Variables for Frontend (.env.local):

NEXT_PUBLIC_API_URL=your-backend-api-url (for CSR)
API_URL=your-backend-api-url (for SSR)

Features

Implemented JWT-based authentication.

Secured password storage with hashed passwords.

Created all necessary backend routes and frontend pages.

Used Server-Side Rendering (SSR) for the homepage.

Protected dashboard route.

Used browser-safe cookies instead of localStorage for authentication and session management.

Implemented Redux for session management.

What Makes This Project Stand Out?

Deployed the frontend on Vercel and the backend on Render.

Live URL: Personal Blog Platform

