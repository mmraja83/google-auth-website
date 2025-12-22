# Google SSO Auth Boilerplate

A professional, production-ready boilerplate for a web application featuring **Google SSO** and **Email/Password Authentication**. Built with **React (Vite)** and **Python (FastAPI)**, designed with a "Soft Minimalism" aesthetic.

## Features

- **Authentication**: JWT-based secure Access Tokens.
- **Google SSO**: Native integration with Google Identity Services.
- **User Dashboard**: Protected routes with a sidebar layout.
- **Profile Management**: Update name, phone, and address.
- **Modern UI**: Glassmorphism, soft animations, and responsive design.

## Prerequisites

- Python 3.9+
- Node.js 16+
- SQLite (Built-in)

## Project Structure

```
google-auth-website/
├── backend/            # FastAPI Python Backend
└── frontend/           # React Vite Frontend
```

## Setup Instructions

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:
```bash
pip install "bcrypt<4.0.0" fastapi uvicorn sqlalchemy pydantic python-multipart python-jose requests google-auth google-auth-oauthlib email-validator python-dotenv
```

**Configuration (.env)**:
Create a `.env` file in the `backend/` directory:
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
SECRET_KEY=your_secure_random_string_here
```

Run the server:
```bash
uvicorn main:app --reload
```
Backend will run at: `http://localhost:8000`.

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

**Configuration (.env)**:
Create a `.env` file in the `frontend/` directory:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

Run the development server:
```bash
npm run dev
```
Frontend will run at: `http://localhost:5173`.

## Google Cloud Setup

1.  Go to [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new Project.
3.  Navigate to **APIs & Services > OAuth consent screen**. Configure as "External".
4.  Navigate to **Credentials > Create Credentials > OAuth Client ID**.
    -   Application Type: **Web application**.
    -   Authorized JavaScript origins: `http://localhost:5173`.
5.  Copy the **Client ID** and paste it into both `.env` files.

## Troubleshooting

-   **500 Error on Register**: Ensure `bcrypt` version is compatible (`<4.0.0`).
-   **Google Login Error**: Verify `Authorized JavaScript origins` matches your frontend URL exactly.
-   **Import Error**: Check relative paths in your React components.

## License

MIT
