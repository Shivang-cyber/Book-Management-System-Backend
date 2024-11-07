# Bookstore Backend API

This repository contains the backend for a Bookstore application, providing secure user authentication and book management functionality. The API is built using Node.js and Express, with a PostgreSQL database for data consistency, and stores book images on AWS S3 for easy access and deployment.

## Project Overview

This backend API supports a bookstore application that allows users to:
- Sign up and log in for a secure, personalized experience.
- Add, view, edit, and delete books from the store’s inventory.

The master branch is deployed on AWS EC2, while the secondary branch is deployed on Vercel, ensuring flexibility in deployment and testing.

## Tech Stack

- **Node.js** with **Express** for building and handling the server and routing.
- **PostgreSQL** for database management, ensuring data consistency.
- **AWS S3** for image storage, with AWS SDK integration for efficient file handling and access.
- **Vercel** and **EC2** for hosting and deployment.

## Features

- **User Authentication**: Secure signup and login functionality with simple username and password authentication.
- **Book Management**: CRUD (Create, Read, Update, Delete) operations for managing books in the store.
- **Image Storage**: AWS S3 bucket integration to store and serve book images.

## Environment Variables

The following environment variables are required to run this project:

- `DATABASE_URL`: URL for connecting to the PostgreSQL database.
- `JWT_SECRET`: Secret key for signing JSON Web Tokens for user authentication.
- `AWS_ACCESS_KEY_ID`: Access key for AWS S3.
- `AWS_SECRET_ACCESS_KEY`: Secret access key for AWS S3.
- `AWS_REGION`: Region where the S3 bucket is hosted.
- `S3_BUCKET`: Name of the S3 bucket where book images are stored.
- `PORT`: Port on which the server will run (default is 3000).

## Installation and Setup

To set up and run the backend locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/Shivang-cyber/Book-Management-System-Backend.git
   ```
2. Install the dependencies:
  ```
  npm install
  ```
3. Create a .env file in the root directory and add the environment variables listed above.
4. Start the server:
```
   npm start
```
The server should now be running on http://localhost:<PORT>
depending on the port you put in .env

API Endpoints
- The backend API endpoints are organized as follows:

Auth Routes `(/auth)`
- POST `/auth/signup` - Register a new user with username and password.
- POST `/auth/signin` - Log in an existing user and retrieve a JSON Web Token.
  
Book Routes `(/books)`
- POST `/books` - Add a new book to the store (authentication required).
- GET `/books` - Retrieve a list of all books in the store.
- GET `/books/:id` - View details of a specific book.
- PUT `/books/:id` - Edit a book's information (authentication required).
- DELETE `/books/:id` - Delete a book from the store (authentication required).

Deployment
The backend is deployed on: `https://book-management-system-backend-ten.vercel.app`

- Primary (EC2): Master branch hosted on AWS EC2.
- Secondary (Vercel): Secondary branch hosted on Vercel for quick access and testing at https://book-management-system-backend-ten.vercel.app.
*Secondary is for a serverless function, as vercel only deploys that so test on master*



