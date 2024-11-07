const request = require('supertest');

const API_URL = 'https://book-management-system-backend-ten.vercel.app'; 
const testUser = 'testuser12';
describe('Book Management API', () => {
  
  let token; 

  describe('Authentication Endpoints', () => {
    
    it('should return a 200 status for the signup endpoint', async () => {
      const res = await request(API_URL)
        .post('/auth/signup')
        .send({
          userName: testUser,
          password: 'testpassword',
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      token = res.body.token;
    });

    it('should return a 200 status for the login endpoint', async () => {
      const res = await request(API_URL)
        .post('/auth/signin')
        .send({
          userName: testUser,
          password: 'testpassword',
        });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      token = res.body.token;
    });
  });

  describe('Books Endpoints', () => {

    it('should return a list of books from /books', async () => {
      const res = await request(API_URL).get('/books');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new book with /books endpoint', async () => {
      const res = await request(API_URL)
        .post('/books')
        .set('Authorization', `Bearer ${token}`) 
        .field('title', 'Test Book')
        .field('author', 'Test Author')
        .field('genre', 'Fiction')
        .attach('cover', './download.jpg');

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('book_id');
      expect(res.body.title).toBe('Test Book');
      expect(res.body.author).toBe('Test Author');
      expect(res.body.genre).toBe('Fiction');
    });

    it('should update an existing book', async () => {
      const createRes = await request(API_URL)
        .post('/books')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Test Book')
        .field('author', 'Test Author')
        .field('genre', 'Fiction')
        .attach('cover', './download.jpg');

      const bookId = createRes.body.book_id;

      const updateRes = await request(API_URL)
        .put(`/books/${bookId}`)
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Updated Test Book 2')
        .field('book_id', bookId)
        .field('author', 'Updated Test Author 2')
        .field('genre', 'Biography')
        .attach('cover', './download2.jpg');
      expect(updateRes.status).toBe(200);
      expect(updateRes.body.title).toBe('Updated Test Book 2');
      expect(updateRes.body.author).toBe('Updated Test Author 2');
      expect(updateRes.body.genre).toBe('Biography');
    });

    it('should delete a book', async () => {
      const createRes = await request(API_URL)
        .post('/books')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Test Book')
            .field('author', 'Test Author')
            .field('genre', 'Fiction')
            .attach('cover', './download.jpg');

      const bookId = createRes.body.book_id;

      const deleteRes = await request(API_URL)
      .delete(`/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);

      expect(deleteRes.status).toBe(204);
    });
  });
});
