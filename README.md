# Shortly - Smart URL Shortener

A full-stack URL shortening and analytics platform built with React, Node.js, Express.js, and MongoDB.

## 🚀 Features

- Create short URLs from long URLs
- Automatic unique short ID generation
- Redirect users from short URLs to original URLs
- Track URL click history
- View URL analytics
- REST API based backend
- Responsive React frontend
- MongoDB database integration
- Modular backend architecture
- Separate frontend and backend structure

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- REST APIs
- Mongoose

### Database
- MongoDB

### Development Tools
- Git
- GitHub
- Postman
- VS Code

## 📁 Project Structure

```text
Short_URL/
│
├── backend/
│   ├── controllers/
│   │   └── url.js
│   ├── models/
│   │   └── url.js
│   ├── routes/
│   │   └── url.js
│   ├── connect.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md