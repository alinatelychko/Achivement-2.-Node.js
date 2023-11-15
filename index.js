const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');



let topMovies = [
  {
    title: 'Inception',
    director: 'J.K. Rowling'
  },
  {
    title: 'Under The Shadow ',
    director: 'Babak Anvari'
  },
  {
    title: 'Twilight',
    director: 'Stephanie Meyer'
  },
  {
    title: 'The Ritual',
    director: 'David Brucker'
  },
  {
    title: 'The Platform',
    director: 'Babak Anvari'
  },
  {
    title: 'Oat Studios ',
    director: 'Neil Bomkamp'
  }
];



// Middleware for parsing requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());


app.use(express.static('public'));

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to my best 10 movies list!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret URL with super top-secret content.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
