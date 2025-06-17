# 🧑‍💻 Node.js + Express API with Redis Caching

This is a simple Node.js API that:

- Uses **Express** to build HTTP routes.
- Uses a local **JSON file** as a fictional database.
- Uses **Redis** to cache data for performance.

---

## 🚀 Features

- `GET /api/users` — Fetch all users from `users.json`, cache result in Redis.
- `GET /api/users/:id` — Fetch a single user by ID from `users.json`.

---

## 📁 Project Structure

├── db/
│ └── users.json # Mock database
├── src/
│ ├── config/
│ │ └── redis.js # Redis client connection
│ ├── controllers/
│ │ └── userController.js # Route logic
│ └── routes/
│ └── user.route.js # API route definitions
├── server.js # Main server file
└── README.md

yaml
Copy
Edit

---

## 📦 Requirements

- Node.js
- Redis server running locally (`localhost:6379`)

---

## 📥 Setup

### Clone the repo and run the server

```bash
git clone https://github.com/bigsam08/node-redis-api-caching.git
cd node-redis-api-caching
npm install

# Start Redis server in a new terminal
redis-server

# Start the Node.js server
npm run dev
✅ Now your API is running at: http://localhost:5001

📦 API Routes & Usage Examples
✅ Get All Users
Route: GET /api/users

Description:

Checks Redis for cached users.

If found, returns from cache.

If not, reads from users.json and caches the result for 60 seconds.

📌 Example using cURL
bash
Copy
Edit
curl http://localhost:5001/api/users
📥 Sample Response
json
Copy
Edit
[
  {
    "id": 1,
    "name": "Grace Hopper",
    "email": "grace@example.com",
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "email": "ada@example.com",
  },
  {
    "id": 3,
    "name": "Alan Turing",
    "email": "alan@example.com",
  }
]
✅ Get Single User
Route: GET /api/users/:id

Description: Fetches a single user by id.

📌 Example using Postman
Method: GET

URL: http://localhost:5001/api/users/2

📥 Sample Response
json
Copy
Edit
{
  "id": 2,
  "name": "Ada Lovelace",
  "email": "ada@example.com",
}
📝 License
This project is licensed under the MIT License.

sql
Copy
Edit
MIT License

Copyright (c) 2025 bigsam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.
css
Copy
Edit
