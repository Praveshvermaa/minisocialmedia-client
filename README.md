# Mini Social Media — Frontend

A social media frontend built with **React.js**, **Vite**, and **Material UI (MUI)**, inspired by the TaskPlanet Social Page.

## Features

- User signup and login with form validation
- Create posts with text, images, or both
- Public feed with filter tabs (All Posts, Most Liked, Most Commented)
- Like and comment on posts with instant UI updates
- Responsive design with smooth animations
- JWT-based authentication with token persistence

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| Vite | Build tool & dev server |
| Material UI (MUI) | Component library & styling |
| Axios | HTTP client |
| React Router v6 | Client-side routing |

## Setup

### Prerequisites
- Node.js v18+
- Backend server running on port 5000

### Installation

```bash
npm install
```

### Run

```bash
# Development
npm run dev

# Production build
npm run build
npm run preview
```

The dev server runs on `http://localhost:3000` and proxies API requests to `http://localhost:5000`.

## Project Structure

```
client/
├── index.html
├── vite.config.js        # Vite config with API proxy
├── src/
│   ├── main.jsx          # Entry point with MUI theme
│   ├── App.jsx           # Router & protected routes
│   ├── api.js            # Axios instance with JWT interceptor
│   ├── index.css         # Global styles & animations
│   ├── context/
│   │   └── AuthContext.jsx   # Auth state management
│   ├── pages/
│   │   ├── Login.jsx     # Login page
│   │   ├── Signup.jsx    # Signup page
│   │   └── Feed.jsx      # Main feed with create post
│   └── components/
│       ├── Navbar.jsx        # Top navigation bar
│       ├── PostCard.jsx      # Individual post display
│       └── CommentSection.jsx # Comments list & input
```

## Pages

| Route | Page | Auth Required |
|-------|------|---------------|
| `/login` | Login | No |
| `/signup` | Signup | No |
| `/` | Feed (Home) | Yes |
