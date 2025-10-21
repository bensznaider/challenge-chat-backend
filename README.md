# Challenge Chat backend

This backend handles authentication, chat storage, and OpenAI Chat Completions API integration for a multi-user chat application.

## Features
- Multi-user authentication (JWT + bcrypt)
- Multiple chats per user
- Integration with OpenAI’s Chat Completions API
- PostgreSQL database via Sequelize ORM
- Request logging with Morgan and CORS enabled

## Tech Stack
- Node.js  
- Express  
- PostgreSQL + Sequelize  
- OpenAI API  
- JWT Authentication  

## Prerequisites
- Node.js 
- PostgreSQL running locally or remotely
- OpenAI API key

## Setup
```bash
git clone https://github.com/bensznaider/challenge-chat-backend.git
npm install
npm start
```
After starting, the API will be available at http://localhost:8080

## Environment Variables
Create a `.env` file in the project root with the following keys:

```env
# Secret key for JWT authentication
SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
# PostgreSQL connection credentials
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_NAME=chatdb
# Frontend URL allowed for CORS
ORIGIN=your_frontend_url
```
