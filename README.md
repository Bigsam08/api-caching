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

``` bash

node-redis-api-caching/
├── db/
│   └── users.json              # Mock user database (JSON file)
├── src/
│   ├── config/
│   │   └── redis.js            # Redis connection setup
│   ├── controllers/
│   │   └── userController.js   # Route logic (with Redis caching)
│   └── routes/
│       └── user.route.js       # API route definitions
├── server.js                   # Entry point of the server
├── package.json
└── README.md                   # Project documentation
```

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
npm run dev

```

### In a new terminal start the redis server

```bash
redis-server
```

---

## 📦 API Routes & Usage Examples

✅ Get All Users

- Route: GET /api/users

- **Description**:

- Checks Redis for cached users.

- If found, returns from cache.

- If not, reads from users.json and caches the result for 60 seconds.

📌 **Example using cURL**

```bash
curl http://localhost:5001/api/users
```

📥 **Sample Response**

```bash
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
```

### ✅ Get Single User

- Route: GET /api/users/:id

**Description**: Fetches a single user by id.

📌 Example using Postman
Method: GET

```bash
http://localhost:5001/api/users/2
```

📥 **Sample Response**

```bash
{
  "id": 2,
  "name": "Ada Lovelace",
  "email": "ada@example.com",
}
```

---

## 📝  License

This project is licensed under the MIT License.
MIT License

Copyright (c) 2025 bigsam
