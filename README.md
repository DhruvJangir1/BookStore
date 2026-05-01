# BookStore

BookStore is a full-stack reading and personal library app built with React, TypeScript, Vite, Tailwind CSS, and Express. It lets users browse a book collection, sign in, add books to their library, mark favorites, and open a simple reading view for each book.

The app uses a small Express API with local JSON files for persistence, which makes it easy to understand and run while learning full-stack React development.

## Features

- Landing page with BookStore branding and a call to start exploring.
- Sign-in form with client-side validation for name, email, and password.
- Dashboard view that displays all available books.
- Library view that shows only books added to the user's library.
- Favorite view that shows only books marked as favorites.
- Book cards with cover image, author, genre, rating, page count, favorite toggle, library toggle, and read button.
- Individual reading page for each book.
- Context-based navigation using React context instead of a routing library.
- Previous-location history for returning from the reading page.
- Express API for fetching books, fetching one book, updating favorite status, updating library status, and saving user data.
- Local JSON persistence through `backend/data/books.json` and `backend/data/user_data.json`.

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons
- Framer Motion dependency available for animation work

### Backend

- Node.js
- Express
- CORS
- Helmet
- JSON files for local data storage

## Project Structure

```text
BookStore/
  backend/
    app.js                 # Express API server
    http.ts                # Frontend API helper functions
    data/
      books.json           # Local book data, ignored by Git
      user_data.json       # Local user data, ignored by Git
    package.json

  public/
    favicon.svg
    icons.svg

  src/
    App.tsx                # Main app view switcher
    main.tsx               # React entry point
    index.css              # Tailwind import and global styles

    frontend/
      Books/
        BookCard.tsx       # Book card UI and favorite/library actions
        BookPages.tsx      # Reading page for a single book

      Login/
        Login.tsx          # Sign-in screen and validation
        Input.tsx          # Reusable input component

      UI-components/
        Home.tsx           # Landing page
        BookGrid.tsx       # Dashboard, Library, and Favorite grids
        Navbar.tsx         # Top navigation bar
        Sidebar.tsx        # Dashboard sidebar navigation

      context-files/
        context-api.tsx    # App context provider
        context-type.ts    # Context TypeScript types

      hooks/
        useHistory.tsx     # Stores the previous app location

      index.ts             # Shared frontend types
```

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

```bash
node -v
npm -v
```

### Install Frontend Dependencies

From the project root:

```bash
npm install
```

### Install Backend Dependencies

From the project root:

```bash
cd backend
npm install
```

## Local Data Setup

The app expects two local JSON files inside `backend/data/`:

```text
backend/data/books.json
backend/data/user_data.json
```

These files are ignored by Git so your local book state and user data do not get pushed to GitHub.

Create `backend/data/books.json` with an array of books:

```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "coverUrl": "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    "genre": "Classic",
    "rating": 4.5,
    "pages": 180,
    "inLibrary": false,
    "favorite": false,
    "content": "Book description or reading content goes here."
  }
]
```

Create `backend/data/user_data.json` with an empty user object or placeholder user:

```json
{
  "name": "",
  "email": "",
  "password": ""
}
```

## Running the App

You need two terminals: one for the backend API and one for the frontend dev server.

### 1. Start the Backend

From the `backend` folder:

```bash
node app.js
```

The API runs at:

```text
http://localhost:3000
```

Important: run this command from inside the `backend` folder because the server reads data from `./data/books.json` and `./data/user_data.json`.

### 2. Start the Frontend

From the project root:

```bash
npm run dev
```

Vite will start the frontend, usually at:

```text
http://localhost:5173
```

Open that URL in your browser.

## Available Frontend Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the app for production into the `dist/` folder.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run preview
```

Previews the production build locally.

## Backend Notes

The backend server file currently lives at:

```text
backend/app.js
```

Because of that, the safest command is:

```bash
cd backend
node app.js
```

The scripts in `backend/package.json` currently point to `src/app.js`. If you want to use `npm start` from the backend folder, update the backend scripts to point to `app.js`.

Example:

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

## API Endpoints

Base URL:

```text
http://localhost:3000
```

### Get All Books

```http
GET /books
```

Returns the full list of books from `books.json`.

### Get One Book

```http
GET /books/:id
```

Returns one book by numeric `id`.

### Toggle Favorite

```http
PATCH /books/:id/toggleFav
```

Request body:

```json
{
  "favorite": true
}
```

Updates the selected book's `favorite` value in `books.json`.

### Toggle Library Status

```http
PATCH /books/:id/toggleLib
```

Request body:

```json
{
  "inLibrary": true
}
```

Updates the selected book's `inLibrary` value in `books.json`.

### Save User Data

```http
PUT /userData
```

Request body:

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "password123"
}
```

Writes the submitted user data to `user_data.json`.

## Data Models

### Book

```ts
type Book = {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  genre: string;
  rating: number;
  pages: number;
  favorite: boolean;
  inLibrary: boolean;
  content: string;
};
```

### User Data

```ts
type userData = {
  name: String;
  email: String;
  password: String;
};
```

## Git Ignore Notes

The project ignores local runtime data:

```gitignore
/backend/data/books.json
/backend/data/user_data.json
```

That means these files can exist on your machine, but Git will not include them when you commit and push.

This is useful because:

- `books.json` changes whenever you favorite a book or add it to your library.
- `user_data.json` contains login form data and should not be pushed.
- Each developer can keep their own local data.

If either file was committed before being added to `.gitignore`, remove it from Git tracking without deleting the local file:

```bash
git rm --cached backend/data/books.json backend/data/user_data.json
```

Then commit the `.gitignore` change.

## Current Limitations

- The login screen is not real authentication yet. It validates the form and stores the latest submitted user data locally.
- Passwords are written as plain text in `user_data.json`, so this should only be used for local learning.
- Book data is stored in JSON files instead of a database.
- The frontend API base URL is hardcoded to `http://localhost:3000` in `backend/http.ts`.
- The app uses context-based view switching instead of React Router.

## Future Improvements

- Add real authentication with password hashing.
- Move local JSON data into a database.
- Add search and genre filtering.
- Add book detail pages with richer metadata.
- Add loading states for individual actions.
- Add pagination or infinite scrolling for larger book collections.
- Add React Router for URL-based navigation.
- Add tests for backend routes and frontend components.

## Development Notes

The Vite config ignores changes inside `backend/data/`:

```js
server: {
  watch: {
    ignored: ['**/backend/data/**']
  }
}
```

This prevents the frontend from fully reloading every time the backend updates `books.json` or `user_data.json`.
