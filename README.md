# Web-Sim Project

A full-stack web application with a React frontend and an Express backend. This project is structured into two main parts: the frontend and the backend. The backend is powered by Express and connects to a PostgreSQL database. The frontend is built using React with Vite, TypeScript, and TailwindCSS.

## Project Structure

The project is divided into two main directories:

- **frontend**: Contains the React app built with Vite.
- **backend**: Contains the Express backend API, which connects to a PostgreSQL database.

```
web-sim/
├── backend/
│   ├── src/
│   ├── build/
│   ├── node_modules/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
└── frontend/
    ├── src/
    ├── node_modules/
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.ts
    └── .env
```

## Run the whole project with docker compose
```bash
git clone https://github.com/jucaza1/web-sim.git
```

```bash
cd web-sim
```

```bash
docker-compose up
```
This will start both the frontend and backend together in a Docker container alongside a container for . The
app will be served at `http://localhost:3000`

## Getting Started (Development)

### Prerequisites

- Node.js (version 16 or higher)
- Docker (optional)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/jucaza1/web-sim.git
```

```bash
cd web-sim
```
##### Check Makefile for more commands
Example:
```bash
make install-backend
make install-frontend
make dev-frontend
make dev-backend
```

#### 2. Set up the backend

1. Navigate to the `backend` directory:

```bash
cd backend
```

2. Install the backend dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

This will start the backend API on the default port (`http://localhost:3000`).

#### 3. Set up the frontend

1. Navigate to the `frontend` directory:

```bash
cd frontend
```

2. Install the frontend dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

This will start the frontend on the default (`http://localhost:5173`).

### Running Both Servers

To run both the frontend and backend simultaneously, you can open two terminals:

1. One for the backend:
   - `cd backend`
   - `npm run dev`

2. One for the frontend:
   - `cd frontend`
   - `npm run dev`

### API Endpoints

#### Health Check

To check the health of the server, you can visit:

```http
GET http://localhost:3000/health
```

This will return a simple message confirming that the backend is running.



## Technologies Used
- **General**:
  - Node.js
  - Docker

- **Frontend**:
  - React
  - Vite
  - TypeScript
  - TailwindCSS

- **Backend**:
  - Express.js
  - PostgreSQL
  - TypeScript
  - Jest
  - Zod


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
