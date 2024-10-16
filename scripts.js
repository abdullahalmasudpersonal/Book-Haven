
//   ----------------------------------------------------------

const createBook = (book) => {
  const id = book?.id;
  const title = book?.title;
  const image = book?.formats["image/jpeg"]
    ? book.formats["image/jpeg"]
    : "default-cover.jpg";
  const atuhor = book.authors.length > 0 ? book.authors[0].name : "Unknown";
  const genre = book?.subjects?.length > 0 ? book.subjects[0] : "Unknown";

  const bookItem = document.createElement("div");
  bookItem.classList.add("book");

    bookItem.innerHTML = `
              <img src="${coverImg}" alt="Book Cover">
              <h3>${book.title}</h3>
              <p>Author: ${
                book.authors.length > 0 ? book.authors[0].name : "Unknown"
              }</p>
              <p>Genre: ${
                book.subjects.length > 0 ? book.subjects[0] : "Unknown"
              }</p>
              <p class="book-id">ID: ${book.id}</p>
          `;
};

const showBooks = (books) => {
    const bookList = document.getElementById('books');
    bookList.innerHTML = '';

    books?.results?.forEach(book => {
        // প্রতিটি বইয়ের জন্য একটি div তৈরি করা
        const bookItem = document.createElement('div');
        bookItem.classList.add('book'); // CSS class অ্যাসাইন করা

        // কভার ইমেজ তৈরি করা
        const coverImg = document.createElement('img');
        coverImg.src = book.formats['image/jpeg'] ? book.formats['image/jpeg'] : 'default-cover.jpg';
        coverImg.alt = 'Book Cover';

        // শিরোনাম তৈরি করা
        const title = document.createElement('h3');
        title.textContent = book.title;

        // লেখকের নাম তৈরি করা
        const author = document.createElement('p');
        author.textContent = `Author: ${book.authors.length > 0 ? book.authors[0].name : 'Unknown'}`;

        // Genre তৈরি করা
        const genre = document.createElement('p');
        genre.textContent = `Genre: ${book.subjects.length > 0 ? book.subjects[0] : 'Unknown'}`;

        // ID তৈরি করা
        const bookId = document.createElement('p');
        bookId.classList.add('book-id');
        bookId.textContent = `ID: ${book.id}`;

        // সব DOM এলিমেন্টগুলোকে bookItem ডিভে অ্যাপেন্ড করা
        bookItem.appendChild(coverImg);
        bookItem.appendChild(title);
        bookItem.appendChild(author);
        bookItem.appendChild(genre);
        bookItem.appendChild(bookId);

        // bookItem div-কে মূল bookList সেকশনে অ্যাপেন্ড করা
        bookList.appendChild(bookItem);
    });
    
//   books?.results?.forEach((book) => {
//     const div = createBook(book);
//     bookList.appendChild(div);
//   });

};

const loadBooks = async () => {
  let data = await fetch("https://gutendex.com/books");
  books = await data?.json();
  showBooks(books);
};

loadBooks();
