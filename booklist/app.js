class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Ui {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => Ui.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector(".book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete-btn">❌</a></td>
    `;

    list.appendChild(row);
  }

  static clearFields() {
    document.querySelector("#book").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static deleteBook(ele) {
    ele.parentElement.parentElement.remove();
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Load books
document.addEventListener("DOMContentLoaded", Ui.displayBooks);

// Add book to list
document.querySelector(".book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const book = document.querySelector("#book").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  const newBook = new Book(book, author, isbn);
  Ui.addBookToList(newBook);
  Store.addBook(newBook);
  Ui.clearFields();
});

// Remove book for list
document.querySelector(".list-table").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.preventDefault();
    Ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  }
});
