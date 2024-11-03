const Book = require('../models/bookModel');

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.getAll();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

exports.addBook = async (req, res, next) => {
  try {
    const newBook = await Book.create({ ...req.body, userId: req.user.userId, coverImage: req.file.location });
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found or is deleted.' });
    }
    if (book.userId !== req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    const updatedBook = await Book.update(req.params.id, { ...req.body, userId: req.user.userId, coverImage: req.file.location });
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found or is deleted.' });
    }
    if (book.userId !== req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    await Book.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
