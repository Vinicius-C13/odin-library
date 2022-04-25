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
        const books = Store.getBooks();

        books.forEach((book) => {UI.addBooksToShelf(book)});
    };

    static addBooksToShelf(book) {
        const display = document.querySelector("#content");

        const bookCard = document.createElement("div");
        bookCard.innerHTML = `
        <div>${book.title}</div>
        <div>${book.author}</div>
        <div>${book.pages} pages</div>
        <button class="status">${book.status}</button>
        <button class="delete">Delete</button>
        `      
        display.appendChild(bookCard);
    };

    static clearInputs() {
        const inputs = document.querySelectorAll('.erase');
        inputs.forEach((item) => item.value = '');
    }

    static openForm() {
        document.querySelector('form').style.zIndex = '10';
        document.querySelector('#blur-bg').style.zIndex = '9';
    };

    static closeForm() {
        document.querySelector('form').style.zIndex = '-10';
        document.querySelector('#blur-bg').style.zIndex = '-11';
    };

    static deleteCardBook(el) {   
        document.querySelector('#content').removeChild(el.parentElement);
    }

    static changeBookStatus(el) {
        if(el.textContent == 'read') {
            el.textContent = 'not read';
            UI.statusButtonColor();
        }else{
            el.textContent = 'read';
            UI.statusButtonColor();
        }
    };

    static statusButtonColor() {

        document.querySelectorAll('.status').forEach((item)=> {
            if(item.textContent == 'read') {
                item.style.backgroundColor = 'rgb(102, 255, 102)';
            }else{
                item.style.backgroundColor = 'rgb(255, 51, 51)';
            }
        });
    }
};

//Store Class: Handles Storage

class Store {

    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.title === title) {
                books.splice(index, 1);
            } else {}
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener("DOMContentLoaded", ()=> {
    UI.displayBooks(); 
    UI.statusButtonColor();
} );

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

    //Add book to UI
    UI.addBooksToShelf(newBook);

    //Add book to store
    Store.addBook(newBook);

    //Clear form inputs when form is submited
    UI.clearInputs();

    //Close form when submited
    UI.closeForm();

    //Define the status button color when submited
    UI.statusButtonColor();
});

//Event: Remove a Book or Change book status

document.querySelector('#content').addEventListener('click', (e)=> {
    if(e.target.classList.contains('delete')) {
        //Remove a book from UI
        UI.deleteCardBook(e.target);

        //Remove a book from Local Storage
        Store.removeBook(e.target.parentElement.children[0].innerText);
    }
    else if(e.target.classList.contains('status')) {
        UI.changeBookStatus(e.target);
    }
})

//Event: Change Book status

//Open form popup

document.querySelector('form').style.zIndex = '-10';

document.querySelector('#add-button').addEventListener('click', ()=>{
    UI.openForm();
});

//Close form with a click out of it
document.querySelector('#blur-bg').addEventListener('click', (e)=>{
    if(e.target.id == 'blur-bg') {
    UI.closeForm();
    }
});

//Checks if book was already read
function checkBookStatus() {
    if(document.querySelector("input[id='status']:checked") == null){
        return "not read"
    }else{return "read"}
};
