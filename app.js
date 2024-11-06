const express = require('express');
const dotenv = require('dotenv');
const booksRouter = require('./routes/books');
const userRouter = require('./routes/user');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore');
});
app.use('/books', booksRouter);
app.use('/auth', userRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
