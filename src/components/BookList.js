export const createBookCard = (book) => `
  <div class="book-card">
    <img src="${book.formats['image/jpeg']}" alt="${book.title}" />
    <h2>${book.title}</h2>
    <p>Author: ${book.authors.map(a => a.name).join(', ')}</p>
    <p>Genre: ${book.subjects ? book.subjects.join(', ') : 'Unknown'}</p>
    <button class="wishlist-btn" data-id="${book.id}">
      <span>❤️</span> Wishlist
    </button>
  </div>
`;

export const displayBooks = (books) => {
    const container = document.getElementById('book-list');
    container.innerHTML = books.map(createBookCard).join('');
};
