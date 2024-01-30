# Movie API

Welcome to the Movie API! This API provides information about movies, directors, and genres. Users can register, log in, and manage their favorite movies.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes. See the [Deployment](#deployment) section for notes on how to deploy the project on a live system.

## Installation

1. Clone the repository:
   git clone https://github.com/alinatelychko/Achivement-2.-Node.js.git

2. Change into the project directory:

  cd movie-api

3. Install dependencies:

  npm install

5. Set up the database:

6. Create a MongoDB database.

Update the .env file with your MongoDB connection string.

7. Run the application:

  npm start

8. Open your browser and navigate to http://localhost:8080 to access the API.

## Usage

Access the API documentation at http://localhost:8080/documentation for detailed information about available endpoints.

## API Endpoints
GET /movies: Get a list of all movies.

GET /movies/:Title: Get details of a specific movie by title.

GET /movies/genres/:genreName: Get movies by genre.

GET /movies/directors/:directorName: Get movies by director.

GET /users: Get a list of all users.

GET /users/:Username: Get details of a specific user by username.

POST /users: Register a new user.

POST /users/:Username/movies/:MovieID: Add a movie to a user's list of favorites.

DELETE /users/:Username: Delete a user.

DELETE /users/:Username/movies/:MovieID: Remove a movie from a user's list of favorites.

PUT /users/:Username: Update a user's information.

## Authentication
The API uses JWT (JSON Web Token) for authentication.
To access protected endpoints, include the JWT token in the request headers.
Database
The application uses MongoDB as the database.
Contributing
Contributions are welcome! Feel free to open issues and pull requests.
License
This project is licensed under the MIT License.






