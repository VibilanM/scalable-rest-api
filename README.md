# Scalable REST API

A full-stack Notes application with JWT authentication, role-based access control, and CRUD operations.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Frontend:** React, Vite, React Router, Axios

## Project Structure

```
├── backend/         # Express API server
│   ├── models/      # Mongoose models (User, Note)
│   ├── routes/      # API routes (auth, notes)
│   ├── middleware/   # Auth & role middleware
│   ├── server.js    # Entry point
│   └── swagger.js   # API documentation config
│
├── frontend/        # React client app
│   ├── src/
│   │   ├── pages/       # Register, Login, Dashboard
│   │   ├── components/  # NoteForm, NoteList, NoteItem
│   │   ├── services/    # Axios API instance
│   │   └── routes/      # ProtectedRoute
│   └── vite.config.js
│
└── README.md
```

## Setup

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
node server.js
```

The API runs at **http://localhost:5000**

Swagger docs available at **http://localhost:5000/api-docs**

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start the dev server:

```bash
npm run dev
```

The app runs at **http://localhost:5173**

## API Endpoints

### Auth

| Method | Endpoint               | Description        | Auth |
|--------|------------------------|--------------------|------|
| POST   | /api/v1/auth/register  | Register user      | No   |
| POST   | /api/v1/auth/login     | Login, get JWT     | No   |
| GET    | /api/v1/auth/profile   | Get profile        | Yes  |
| GET    | /api/v1/auth/admin     | Admin only         | Yes  |

### Notes

| Method | Endpoint              | Description        | Auth |
|--------|-----------------------|--------------------|------|
| POST   | /api/v1/notes         | Create note        | Yes  |
| GET    | /api/v1/notes         | Get all user notes | Yes  |
| GET    | /api/v1/notes/:id     | Get single note    | Yes  |
| PUT    | /api/v1/notes/:id     | Update note        | Yes  |
| DELETE | /api/v1/notes/:id     | Delete note        | Yes  |

## Running Both Servers

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Then open **http://localhost:5173** in your browser.
