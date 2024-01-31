require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
uuid = require("uuid");
const mongoose = require("mongoose");
const Models = require("./models");
const Movies = Models.Movie;
const Users = Models.User;
const { check, validationResult } = require('express-validator');

/**
 * Connect to MongoDB database.
 * @type {string} 
 */

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/cf_movies");
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://adelin9999:xm1IxTjdodweREYv@cluster0.ixcgxaq.mongodb.net/cf_movies?retryWrites=true&w=majority");

// Middleware for parsing requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Enable Cross-Origin Resource Sharing (CORS).
 * @type {string[]} allowedOrigins - List of allowed origins.
 */

const cors = require('cors');
app.use(cors());

let allowedOrigins = ['http://localhost:8080','http://localhost:1234', 'https://movieapicf-30767e813dee.herokuapp.com', 'https://myflix-alinatelychko.netlify.app', 'http://localhost:4200', 'https://myflix-angular-app.netlify.app/', 'https://main--myflix-angular-app.netlify.app/'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            let message = 'The CORS policy for this application doesn\'t allow access from origin' * origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

/**
 * Authentication setup.
 * @type {Function} auth - Authentication middleware.
 */

//authentication
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

/**
 * Update a user's info, by username.
 * @function
 * @name PUT /users/:Username
 * @param {string} Username - User's username.
 * @param {Object} req.body - Updated user information.
 * @returns {Object} JSON object containing updated user information.
 */

app.put("/users/:Username", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if(req.user.Username !== req.params.Username){
    return res.status(400).send('Permission denied');
}
  
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }
  ) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//CREATE
/**
 * Create a new user.
 * @function
 * @name POST /users
 * @param {string} Username - User's username.
 * @param {string} Password - User's password.
 * @param {string} Email - User's email.
 * @param {Date} Birthday - User's birthday.
 * @returns {Object} JSON object containing created user information.
 */
//Add a user

app.post("/users",  [
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {

// check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});


/**
 * Add a movie to a user's list of favorites.
 * @function
 * @name POST /users/:Username/movies/:MovieID
 * @param {string} Username - User's username.
 * @param {string} MovieID - ID of the movie to be added to favorites.
 * @returns {Object} JSON object containing updated user information.
 */
// Add a movie to a user's list of favorites
app.post("/users/:Username/movies/:MovieID", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  ) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//delete

/**
 * Delete a movie from a user's list of favorites.
 * @function
 * @name DELETE /users/:id/:movieTitle
 * @param {string} id - User's ID.
 * @param {string} movieTitle - Title of the movie to be removed from favorites.
 * @returns {string} Success message indicating the removal of the movie.
 */

app.delete("/users/:id/:movieTitle", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { id, movieTitle } = req.params;

  const user = await Users.findById(id);

  if (user) {
    user.favMovies = user.favMovies.filter((title) => title !== movieTitle);
    res
      .status(200)
      .send('${movieTitle} has been removed from user ${id}s array');
  } else {
    res.status(400).send("User not found");
  }
});

//delete
/**
 * Delete a user by username.
 * @function
 * @name DELETE /users/:Username
 * @param {string} Username - User's username.
 * @returns {string} Success message indicating the deletion of the user.
 */

app.delete("/users/:Username", passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.userName })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
 * Delete a movie from a user's list of favorites.
 * @function
 * @name DELETE /users/:Username/movies/:MoviesID
 * @param {string} Username - User's username.
 * @param {string} MoviesID - ID of the movie to be removed from favorites.
 * @returns {Object} JSON object containing updated user information after movie removal.
 */

app.delete("/users/:Username/movies/:MoviesID", passport.authenticate("jwt", { session: false }), (req, res) => {
  Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
          $pull: { FavoriteMovies: req.params.MoviesID }
      },
      { new: true }, //This line makes sure the updated doc is returned
      (err, updatedUser) => {
          if (err) {
              console.error(err);
              res.status(500).send("Error: " + err);
          } else {
              res.json(updatedUser);
          }
  });
  });


//READ
/**
 * Display a welcome message.
 * @function
 * @name GET /
 * @returns {string} Welcome message.
 */

app.get("/", (req, res) => {
  res.send("Welcome to my best 10 movies list!");
});


/**
 * Get all users.
 * @function
 * @name GET /users
 * @returns {Object[]} Array of user objects.
 */

app.get("/users", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


/**
 * Get a user by username.
 * @function
 * @name GET /users/:Username
 * @param {string} Username - User's username.
 * @returns {Object} User object.
 */
app.get("/users/:Username", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
/**
 * Get all movies.
 * @function
 * @name GET /movies
 * @returns {Object[]} Array of movie objects.
 */

app.get("/movies", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
 * Get a movie by title.
 * @function
 * @name GET /movies/:Title
 * @param {string} Title - Movie title.
 * @returns {Object} Movie object.
 */

app.get("/movies/:Title", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

/**
 * Get movies by genre.
 * @function
 * @name GET /movies/genres/:genreName
 * @param {string} genreName - Genre name.
 * @returns {Object} Movie object.
 */

app.get("/movies/genres/:genreName", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.genreName })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


/**
 * Get movies by director.
 * @function
 * @name GET /movies/directors/:directorName
 * @param {string} directorName - Director name.
 * @returns {Object} Movie object.
 */

app.get("/movies/directors/:directorName", passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.directorName })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});


/**
 * Serve the documentation page.
 * @function
 * @name GET /documentation
 * @returns {File} Documentation HTML file.
 */

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

/**
 * Serve a secret URL.
 * @function
 * @name GET /secreturl
 * @returns {string} Secret content message.
 */

app.get("/secreturl", (req, res) => {
  res.send("This is a secret URL with super top-secret content.");
});

/**
 * Listen for requests on a specific port.
 * @constant {number} PORT - Port number for the server.
 * @function
 * @name app.listen
 * @param {number} port - Port number to listen on.
 * @param {string} '0.0.0.0' - IP address to bind to.
 * @param {Function} callback - Callback function to execute on successful server start.
 */

// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
