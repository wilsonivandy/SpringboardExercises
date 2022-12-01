process.env.NODE_ENV = "test"

const request = require("supertest");


const app = require("../app");
const db = require("../db");


// isbn of sample book
let book_isbn;


beforeEach(async () => {
    let result = await db.query(`
      INSERT INTO
        books (isbn, amazon_url,author,language,pages,publisher,title,year)
        VALUES(
          '654215',
          'https://amazon.com/taco',
          'Cars',
          'English',
          100,
          'La la land',
          'watcha doin', 
          2007)
        RETURNING isbn`);
  
    book_isbn = result.rows[0].isbn
});
  
  
describe("POST /books", function () {
    test("Create new book", async function () {
      const response = await request(app)
          .post(`/books`)
          .send({
            isbn: '32794782',
            amazon_url: "https://amazon.com",
            author: "imlovinit",
            language: "english",
            pages: 1000,
            publisher: "right",
            title: "sound of music",
            year: 2000
          });
      expect(response.statusCode).toBe(201);
      expect(response.body.book).toHaveProperty("isbn");
    });
  
    test("Require Title", async function () {
      const response = await request(app)
          .post(`/books`)
          .send({year: 2000});
      expect(response.statusCode).toBe(400);
    });
});
  
  
describe("GET /books", function () {
    test("Gets a list of books", async function () {
      const response = await request(app).get(`/books`);
      const books = response.body.books;
      expect(books).toHaveLength(1);
      expect(books[0]).toHaveProperty("isbn");
      expect(books[0]).toHaveProperty("amazon_url");
    });
});
  
  
describe("GET /books/:isbn", function () {
    test("Gets a book", async function () {
      const response = await request(app)
          .get(`/books/${book_isbn}`)
      expect(response.body.book).toHaveProperty("isbn");
      expect(response.body.book.isbn).toBe(book_isbn);
    });
  
    test("Cannot find book", async function () {
      const response = await request(app)
          .get(`/books/999`)
      expect(response.statusCode).toBe(404);
    });
});
  
  
describe("PUT /books/:id", function () {
    test("Incorrect book update", async function () {
      const response = await request(app)
          .put(`/books/${book_isbn}`)
          .send({
            isbn: "123123",
            blabla: "lol",
            year: 2000
          });
      expect(response.statusCode).toBe(400);
    });
  });
  
  
describe("DELETE /books/:id", function () {
    test("Delete a book", async function () {
      const response = await request(app)
          .delete(`/books/${book_isbn}`)
      expect(response.body).toEqual({message: "Book deleted"});
    });
});
  
  
afterEach(async function () {
    await db.query("DELETE FROM books");
});
  
  
afterAll(async function () {
    await db.end()
});