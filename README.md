# Computer Point Nepal

A full-stack web application built using the MVC (Model-View-Controller) pattern.

## Project Structure

```
computer-point-nepal/
│
├── backend/                       <-- Express + MongoDB
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── app.js
│   ├── server.js
│   └── .env
│
├── frontend/                     <-- React
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── README.md
└── package.json
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm run install-all
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env` in the backend directory
   - Update the variables as needed

3. Start the development servers:
   ```bash
   npm start
   ```

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- Frontend:
  - React.js
  - React Router
  - Axios

## Features

- MVC Architecture
- RESTful API
- MongoDB Database
- React Frontend
- Authentication & Authorization
- Error Handling Middleware 