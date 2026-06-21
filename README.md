# Name Form (Frontend + Backend)

## Project structure
- `client/` - Static HTML + CSS + JS
- `server/` - Express backend API

## Run backend
From the `server` folder:

```bat
cd server
npm install
npm start
```

Server runs on `http://localhost:3000`.

## Use the frontend
Open `client/index.html` in your browser.

## API
- `POST /api/name` with JSON body: `{ "name": "Alice" }`
  - Response: `{ "message": "Hello, Alice!" }`

