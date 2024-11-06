const express = require('express');
const booksController = require('../controllers/booksController');
const upload = require('../middleware/s3Config');
const {booksValidation} = require('../middleware/validation');
const authorization = require('../middleware/auth');

const router = express.Router();

router.get('/',  booksController.getBooks);
router.post('/', upload.single('cover'), authorization, booksValidation, booksController.addBook);
router.put('/:id', upload.single('cover'), authorization, booksValidation, booksController.updateBook);
router.delete('/:id', authorization, booksController.deleteBook);

module.exports = router;
