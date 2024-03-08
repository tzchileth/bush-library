// get reference to 'NEW BOOK' button
const newBook = document.querySelector("#newBook");
// get reference to the dialog object
const dialog = document.querySelector("#dialog");
// get reference to confirm button in the dialog
const jsCloseBtn = dialog.querySelector("#js-close");
// get reference to toggle label
const readLabel = document.querySelector(".toggle-label");
// toggle button
const toggleSwitch = dialog.querySelector(".toggleSwitch");
// get reference to removeBook button
const deleteBook = document.querySelector(".removeBook");
// get reference to card-container
const cardContainer = document.querySelector(".card-container");

// library array
const myLibrary = [];
// variable to hold size of library
let sizeOfLibrary = myLibrary.length;

function Book(author, title, pages, isRead = true) {
    this.author = author;
    this.pages = pages;
    this.title = title;
    this.isRead = isRead;
    this.bookID = ++sizeOfLibrary;
}

// get the parameters from the form the user submits
function addBookToLibrary(author, title, pages, isRead) {
    const book = new Book(author, title, pages, isRead);
    myLibrary.push(book);
}

// use this function to display the books in a card on the web page 
function displayBooks(oldLength, newLength) {
    for (let i = oldLength; i < newLength; i++) {
        makeCard(myLibrary[i]);
    }
}

// function to remove book from the library
function removeBook(bookID) {
    myLibrary.splice(bookID - 1, 1);
}

// this works with the toggle button
function changeBookReadStatus(bookId, readStatus) {
    myLibrary[bookId - 1].isRead = readStatus.toLowerCase() === "read" ? true : false;
}

// function to create a card
function makeCard(book) {
    const cardContainer = document.querySelector(".card-container");
    const card = document.createElement("div");
    const author = document.createElement("p");
    const title = document.createElement("p");
    const pages = document.createElement("p");
    const bottom = document.createElement("div");
    const firstBottomDiv = document.createElement("div");
    const button = document.createElement("button");
    const cardSwitch = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const secondSpan = document.createElement("span");

    card.classList.toggle("card");
    card.setAttribute("id", book.bookID);
    author.classList.toggle("author");
    title.classList.toggle("title");
    pages.classList.toggle("pages");
    author.textContent = book.author;
    title.textContent = book.title;
    pages.textContent = `${book.pages} pages`;
    bottom.classList.toggle("bottom");
    button.classList.toggle("styled");
    button.classList.toggle("removeBook");
    button.setAttribute("type", "button");
    button.textContent = "REMOVE BOOK";
    firstBottomDiv.appendChild(button);
    cardSwitch.classList.toggle("card-switch");
    label.classList.toggle("cardLabelSwitch");
    input.classList.toggle("cardToggleSwitch");
    input.classList.toggle("cardToggle");
    input.setAttribute("type", "checkbox");
    input.checked = book.isRead;
    span.classList.toggle("cardSlider");
    span.classList.toggle("cardRound");
    label.append(input, span);
    secondSpan.classList.toggle("cardToggleLabel");
    secondSpan.textContent = (isRead) ? "READ" : "UNREAD";
    cardSwitch.append(label, secondSpan);
    bottom.append(firstBottomDiv, cardSwitch);
    card.append(author, title, pages, bottom);
    cardContainer.appendChild(card);
}

document.addEventListener("click", (e) => {
    const target = e.target.closest(".removeBook");
    if (target) {
        let bookId = target.parentNode.parentNode.parentNode.id;
        // remove card from the page
        let child = document.getElementById(bookId); // get the specific card
        cardContainer.removeChild(child);
        removeBook(bookId);
    }
});

document.addEventListener("click", (e) => {
    const target = e.target.closest(".cardToggle");

    if (target) {
        const cardToggleLabel = target.offsetParent.nextElementSibling;

        let bookId = target.parentNode.parentNode.parentNode.parentNode.id;

        if (target.checked) {
            cardToggleLabel.textContent = "READ";
            changeBookReadStatus(bookId, cardToggleLabel.textContent);
        } else {
            cardToggleLabel.textContent = "UNREAD";
            changeBookReadStatus(bookId, cardToggleLabel.textContent);
        }
    }
});

// add new book to the library by launching the dialog
newBook.addEventListener("click", () => {
    dialog.showModal();
});

toggleSwitch.addEventListener("click", () => {
    if (toggleSwitch.checked) {
        readLabel.textContent = "READ";
    } else {
        readLabel.textContent = "UNREAD";
    }
});

// handle confirm action on the dialog
jsCloseBtn.addEventListener("click", (e) => {
    const author = dialog.querySelector("#author");
    const title = dialog.querySelector("#title");
    const pages = dialog.querySelector("#pages");
    const sizeOfLibrary_1 = myLibrary.length;

    if (!(author.value === "") &&
        !(title.value === "") &&
        !(pages.value === "") &&
        !(readLabel.textContent === "")) {
        isRead = (readLabel.textContent.toLowerCase() === "read")
            ?
            true
            :
            false;
        addBookToLibrary(author.value, title.value, pages.value, isRead);
    }

    // add book to page only if there's an addition to the library
    if (sizeOfLibrary_1 < myLibrary.length) {
        displayBooks(sizeOfLibrary_1, myLibrary.length);
    }

    e.preventDefault();
    dialog.close();
});