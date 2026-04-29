#  BookShelf — Book Manager

A full-stack Node.js application using **Express**, **Mongoose**, and **MongoDB** to manage a book collection. Includes a clean REST API and a polished browser-based UI.

---

## 🗂️ Project Structure

```
book-manager/
├── models/
│   └── Book.js          # Mongoose Book Schema
├── routes/
│   └── books.js         # Express API Routes (CRUD)
├── public/
│   └── index.html       # Frontend UI (HTML/CSS/JS)
├── server.js            # Main entry point
├── .env                 # Environment variables
├── .env.example         # Example env file
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Setup & Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` and set your MongoDB URI:
```
MONGO_URI=mongodb://localhost:27017/bookstore
PORT=3000
```

### 3. Start MongoDB
Make sure MongoDB is running locally:
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

Or use a cloud URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### 4. Start the Server
```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

### 5. Open the App
Visit **http://localhost:3000** in your browser.

---

##  Book Schema

```js
{
  title:  { type: String, required: true, maxlength: 200 },
  author: { type: String, required: true, maxlength: 100 },
  price:  { type: Number, required: true, min: 0 },
  createdAt: Date,   // auto-added by timestamps
  updatedAt: Date    // auto-added by timestamps
}
```

---

## 🔌 REST API Endpoints

| Method | Endpoint         | Description          | Body (JSON)                       |
|--------|-----------------|----------------------|-----------------------------------|
| POST   | /api/books      | Add a new book       | `{ title, author, price }`        |
| GET    | /api/books      | Get all books        | —                                 |
| GET    | /api/books/:id  | Get a single book    | —                                 |
| DELETE | /api/books/:id  | Delete book by ID    | —                                 |

### Example Requests (curl)

**Add a book:**
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"The Alchemist","author":"Paulo Coelho","price":350}'
```

**Get all books:**
```bash
curl http://localhost:3000/api/books
```

**Delete a book:**
```bash
curl -X DELETE http://localhost:3000/api/books/<BOOK_ID>
```

---

## 🛠️ Tech Stack

| Layer      | Technology            |
|------------|-----------------------|
| Runtime    | Node.js               |
| Framework  | Express.js            |
| ODM        | Mongoose              |
| Database   | MongoDB               |
| Frontend   | HTML5 / CSS3 / Vanilla JS |

---

## 📦 Dependencies

```json
{
  "express":   "^4.18.2",
  "mongoose":  "^8.0.3",
  "dotenv":    "^16.3.1",
  "cors":      "^2.8.5"
}
```
