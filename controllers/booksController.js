const Book = require('../models/bookModel');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.getAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve books', error: error.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      userId: req.user.userId,
      coverImage: req.file.location
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add book', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.getBookById(req.body.book_id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found or is deleted.' });
    }
    if (book.user_id !== req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    const updatedBook = await Book.update(req.body.book_id, {
      ...req.body,
      userId: req.user.userId,
      coverImage: req.file.location
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found or is deleted.' });
    }
    if (book.user_id !== req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    await Book.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error: error.message });
  }
};
