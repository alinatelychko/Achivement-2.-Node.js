const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Represents a movie in the database.
 * @typedef {Object} Movie
 * @property {string} Title - The title of the movie.
 * @property {string} Description - The description of the movie.
 * @property {Object} Genre - The genre of the movie.
 * @property {string} Genre.Name - The name of the genre.
 * @property {string} Genre.Description - The description of the genre.
 * @property {Object} Director - The director of the movie.
 * @property {string} Director.Name - The name of the director.
 * @property {string} Director.Bio - The biography of the director.
 * @property {string[]} Actors - An array of actor names.
 * @property {string} ImagePath - The path to the movie's image.
 * @property {boolean} Featured - Indicates if the movie is featured.
 */

/**
 * Represents a user in the database.
 * @typedef {Object} User
 * @property {string} Username - The username of the user.
 * @property {string} Password - The hashed password of the user.
 * @property {string} Email - The email address of the user.
 * @property {Date} Birthday - The birthday of the user.
 * @property {string[]} FavoriteMovies - An array of movie IDs that the user has marked as favorites.
 */

/**
 * Mongoose schema for movies.
 * @type {mongoose.Schema}
 */

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
      Name: String,
      Description: String
    },
    Director: {
      Name: String,
      Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
  });

  /**
 * Mongoose schema for users.
 * @type {mongoose.Schema}
 */
  
  let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
  });
  
/**
 * Hashes the given password using bcrypt.
 * @param {string} password - The password to hash.
 * @returns {string} The hashed password.
 */


  userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  };
  

/**
 * Validates the given password against the stored hashed password.
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */

  userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
  };


/**
 * Mongoose model for movies.
 * @type {mongoose.Model<Movie>}
 */

  let Movie = mongoose.model('Movie', movieSchema);
  
/**
 * Mongoose model for users.
 * @type {mongoose.Model<User>}
 */

  let User = mongoose.model('User', userSchema);
  
  module.exports.Movie = Movie;
  module.exports.User = User;