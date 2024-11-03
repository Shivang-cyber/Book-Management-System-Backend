const db = require('../config/db');

const Book = {
  create: async (data) => {
    const { title, author, genre, coverImage, userId } = data;
    try {
      const result = await db.query(
        `INSERT INTO books (title, author, genre, cover_image_url, publication_date, user_id, is_deleted) VALUES ($1, $2, $3, $4, $5, $6, DEFAULT) RETURNING *`,
        [title, author, genre, coverImage, new Date(), userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error creating book:", error);
      throw new Error("Could not create book.");
    }
  },
  getAll: async (data) => { 
    const result = await db.query(`SELECT * FROM books WHERE is_deleted = FALSE`);
    return result.rows;
  },
  update: async (id, data) => {
    const { title, author, genre, coverImage } = data;
    try {
      const result = await db.query(
        `UPDATE books SET title = $1, author = $2, genre = $3, cover_image_url = $4 WHERE book_id = $5 RETURNING *`,
        [title, author, genre, coverImage, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error updating book:", error);
      throw new Error("Could not update book.");
    }
  },
  delete: async (id) => {
    try {
      const result = await db.query(`UPDATE books SET is_deleted = TRUE WHERE book_id = $1 RETURNING *`, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting book:", error);
      throw new Error("Could not delete book.");
    }
  },
  getBookById : async (id) => {
    try {
      const result = await db.query(`SELECT * FROM books WHERE book_id = $1 AND is_deleted = FALSE`, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error getting book:", error);
      throw new Error("Could not get book.");
    }
  }
};

module.exports = Book;
