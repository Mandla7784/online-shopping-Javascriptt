import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

let page = 1;
let matches = books;

// Function to create a book preview element
function createBookElement({ author, id, image, title }) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    return element;
}

// Function to display initial set of books
function displayInitialBooks() {
    const starting = document.createDocumentFragment();

    for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
        const bookElement = createBookElement({ author, id, image, title });
        starting.appendChild(bookElement);
    }

    document.querySelector('[data-list-items]').appendChild(starting);
}

// Function to display select options (genres or authors)
function displaySelectOptions(options, targetSelector, defaultOptionText) {
    const selectHtml = document.createDocumentFragment();
    const firstElement = document.createElement('option');
    firstElement.value = 'any';
    firstElement.innerText = defaultOptionText;
    selectHtml.appendChild(firstElement);

    for (const [id, name] of Object.entries(options)) {
        const element = document.createElement('option');
        element.value = id;
        element.innerText = name;
        selectHtml.appendChild(element);
    }

    document.querySelector(targetSelector).appendChild(selectHtml);
}

// Function to check and set theme colors
function checkAndSetTheme() {
    const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
    const darkColor = theme === 'night' ? '255, 255, 255' : '10, 10, 20';
    const lightColor = theme === 'night' ? '10, 10, 20' : '255, 255, 255';

    document.querySelector('[data-settings-theme]').value = theme;
    document.documentElement.style.setProperty('--color-dark', darkColor);
    document.documentElement.style.setProperty('--color-light', lightColor);
}

// Function to update the list of books based on filters
function updateBookList(filters) {
    const result = books.filter(book => {
        let genreMatch = filters.genre === 'any';

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) {
                genreMatch = true;
            }
        }

        return (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        );
    });

    page = 1;
    matches = result;

    document.querySelector('[data-list-message]').classList.toggle('list__message_show', result.length < 1);

    const listItems = document.querySelector('[data-list-items]');
    listItems.innerHTML = '';

    const newItems = document.createDocumentFragment();
    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const bookElement = createBookElement({ author, id, image, title });
        newItems.appendChild(bookElement);
    }
    listItems.appendChild(newItems);

    const remainingBooks = Math.max(matches.length - (page * BOOKS_PER_PAGE), 0);
    const listButton = document.querySelector('[data-list-button]');
    listButton.disabled = remainingBooks <= 0;
    listButton.innerHTML = `<span>Show more</span><span class="list__remaining"> (${remainingBooks})</span>`;
}

// Event listeners
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false;
});

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
});

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true;
});

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    const darkColor = theme === 'night' ? '255, 255, 255' : '10, 10, 20';
    const lightColor = theme === 'night' ? '10, 10, 20' : '255, 255, 255';
    document.documentElement.style.setProperty('--color-dark', darkColor);
    document.documentElement.style.setProperty('--color-light', lightColor);

    document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    updateBookList(filters);
});

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const listItems = document.querySelector('[data-list-items]');
    const remainingBooks = Math.max(matches.length - ((page + 1) * BOOKS_PER_PAGE), 0);

    const newItems = document.createDocumentFragment();
    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const bookElement = createBookElement({ author, id, image, title });
        newItems.appendChild(bookElement);
    }
    listItems.appendChild(newItems);

    page += 1;

    // const listButton = document.querySelector('[data-list-button]');
    // listButton.append(stringify)
const activeBook = books.find(book => book.id === targetBookId);
if (!activeBook) return;

const {
    image,
    title,
    author,
    published,
    description
} = activeBook;

document.querySelector('[data-list-active]').open = true;
document.querySelector('[data-list-blur]').src = image;
document.querySelector('[data-list-image]').src = image;
document.querySelector('[data-list-title]').innerText = title;
document.querySelector('[data-list-subtitle]').innerText = `${authors[author]} (${new Date(published).getFullYear()})`;
document.querySelector('[data-list-description]').innerText = description;
