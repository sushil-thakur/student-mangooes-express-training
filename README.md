# 🎓 Student-Mangoes-Express-Training

This repository contains the **backend API** for a Student-Mangoes application, built with **Node.js**, **Express.js**, and **MongoDB** (using **Mongoose** as the ODM). It offers user authentication and full CRUD functionality for product management.

---

## 📌 Project Overview

This API handles:

- 🧑‍💻 **User Authentication**
  - Registration & login with secure token-based auth
- 📦 **Product Management (CRUD)**
  - Create, read, update, and delete product records

It’s structured to support frontend integration or further expansion into a student management platform.

---

## ⚙️ Technologies Used

- **Node.js** – Backend runtime environment
- **Express.js** – Web framework for building REST APIs
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB in Node.js
- **Middleware** – Custom middleware for authentication & validation
- **JWT (optional)** – Token-based authentication (if implemented)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/sushil-thakur/student-mangoes-express-training.git
cd student-mangoes-express-training
🛠️ API Endpoints
🧑‍🔐 User Authentication

Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Log in a user and return token📦 Product CRUD

Method	Endpoint	Description
POST	/api/products	Create a new product
GET	/api/products	Get all products
GET	/api/products/:id	Get a product by ID
PUT	/api/products/:id	Update a product
DELETE	/api/products/:id	Delete a product🧩 Middleware Features
Located in the middleware/ directory:

Auth Middleware – Verifies JWT tokens

Validation Middleware – Checks request data structure

Error Handling – Centralized error catcher (optional)

