const PORT = process.env.PORT || 5555;
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/bookmodel');
const bookRoutes = require('./routes/booksroute');
const cors = require('cors');

const app = express();
// midleware for parsing request body
app.use(express.json());

// middleware for dandling cors policy
// 1. allow alkl origins with default cors
app.use(cors());
// allow custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (req, res) => {
  return res.status(234).send('Welcome to MERN stack tutorial');
});
app.use('/books', bookRoutes);

mongoose
  .connect('mongodb://eduwork:book@127.0.0.1:27017/books-Collection?authSource=admin')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });
