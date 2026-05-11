# GraphQL-Server-Test
This is a sample GraphQL server project created to demonstrate a basic implementation of a GQL server.

---

## 🚀 Quick Start Guide

Follow these steps to initialize the environment and get the server running on **Port 4000**.

### 1. Initialize Node.js
If you are starting in a fresh directory, run:
```bash
npm init -y
```
### 2. Setup Python Virtual Environment (Optional)
If your project uses Python utilities, create and activate a virtual environment:
- Create: `python -m venv .venv`
- Activate (Windows): `.venv\Scripts\activate`
- Activate (Mac/Linux): `source .venv/bin/activate`

### 3. Install Dependencies
Install the required production and development packages:
- **Production dependencies:**
```bash
npm install express express-graphql graphql
```
- **Development dependencies:**
```bash
npm install --save-dev nodemon
```

### 4. Configure Git
Create a `.gitignore` file to ensure you do not commit large dependency folders:
```
node_modules/
.venv/
.env
```

## 🏃 Running the Application
This project uses nodemon for hot-reloading during development.
To start the server:
```bash
npm run devStart
```
Once the terminal indicates the server is active, you can access the GraphQL interface at:
[http://localhost:4000/graphql](http://localhost:4000/graphql)

## 🛠 Project Details
- Main Entry Point: `server.js`
- Module Type: CommonJS
- Author: Rajarajan K
- License: ISC
