//Book Classes: Represents a Book

class Book{
    constructor(title, author, pages, status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

//UI Class: Handle UI tasks

class UI {
    static displayBooks() {
        const myLibrary = [
            {
                title: "Book example",
                author: "example",
                pages: "130",
                status: "read"
            }
        ];

        const books = myLibrary;

        books.forEach((book) => {UI.addBooksToShelf(book)});
    };

    static addBooksToShelf(book) {
        const display = document.querySelector("#content");

        const bookCard = document.createElement("div");
        bookCard.innerHTML = `
        <div> ${book.title} </div>
        <div> ${book.author} </div>
        <div> ${book.pages} pages</div>
        <button>${book.status}</button>
        <button>Delete</button>
        `

        display.appendChild(bookCard);
    }
};

//Store Class: Handles Storage

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add a book

document.querySelector("#book-form").addEventListener("submit", (e)=>{
    //Prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const status = checkBookStatus();

    //Create a new Object
    const newBook = new Book(title, author, pages, status);

    console.log(newBook);

    //Add book to UI
    UI.addBooksToShelf(newBook);

    //Checks if book was already read
    function checkBookStatus() {
        if(document.querySelector("input[id='status']:checked") == null){
            return "not read"
        }else{return "read"}
    }

    //Erase form inputs
    const inputs = document.querySelectorAll('input');

    inputs.forEach((item) => item.value = '');
});

//Event: Remove a Book

