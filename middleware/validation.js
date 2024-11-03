const jwt = require('jsonwebtoken');
exports.booksValidation = (req, res, next) => {
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
      return res.status(400).json({ message: 'Title, author, and genre are required.' });
    }
    next();
  };
  
exports.authValidation = (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    next();
  };
