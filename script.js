const myLibrary = [];

function Book(id, title, author, nPages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.nPages = nPages;
  this.isRead = isRead;
}

Book.prototype.read = function () {
  return this.isRead ? "Read" : "Not Read";
};

function addBookToLibrary(title, author, nPages, isRead) {
  // take params, create a book then store it in the array
  const id = crypto.randomUUID();
  myLibrary.push(new Book(id, title, author, nPages, isRead));
}

function removeBookFromLibrary(id) {
  myLibrary.splice(id, 1);
}

const main = document.querySelector("main");

function loadBooks() {
  main.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p><span>Author:</span> ${book.author}</p>
    <p><span>Pages:</span> ${book.nPages} pages</p>
    <p><span>Read:</span> ${book.read()}</p>
    <button type="button" id="remove">Remove</button>
  `;
    main.appendChild(bookCard);
  });
}

loadBooks();

// events

main.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.parentElement.dataset.id;
    removeBookFromLibrary(id);
    loadBooks();
  }
});

const addButton = document.querySelector("#addBook");
const form = document.querySelector("form");

addButton.addEventListener("click", () => {
  form.style.visibility = "visible";
});

const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", () => {
  form.style.visibility = "hidden";
});

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", () => {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const nPages = document.querySelector("#nPages").value;
  const isRead = document.querySelector("#isRead").checked;
  addBookToLibrary(title, author, nPages, isRead);
  form.style.visibility = "hidden";
  loadBooks();
});
