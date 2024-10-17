//   ----------------------------------------------------------


const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let booksData = [];  
let currentPage = 1;
let previousPageURL = null;
let nextPageURL = null;

///// display books data
const displayBooks = (books) => {
  const bookList = document.getElementById("books");
  bookList.innerHTML = "";
  books?.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.innerHTML = `
          <img src="${book.formats["image/jpeg"]}" alt="Book Cover">
          <h3>${book.title}</h3>
          <p>Author: ${book.authors[0]?.name || "Unknown"}</p>
          <p>Genre: ${book.subjects[0] || "N/A"}</p>
          <button class="wishlist-btn" data-id="${book.id}">
        ${wishlist.includes(book.id) ? "❤️ Wishlisted" : "❤️ Add to Wishlist"}
          </button> 
          <button>
           <a style='text-decoration:none' href="/bookDetails.html?id=${
             book.id
           }" class="details-btn">🔍 View Details</a>
          </button>`;
    bookList.appendChild(bookItem);
  });
//////////////////////////
};


//////////// load books main function
async function loadBooks() {
  try {
    document.getElementById("loader").style.display = "block";
    document.getElementById("pagination-container").style.display = "none";
    const response = await fetch(
      `https://gutendex.com/books/?page=${currentPage}`
    );
    const data = await response.json();
    booksData = data.results;  
    displayBooks(booksData);

    previousPageURL = data.previous;
    nextPageURL = data.next;

    document.getElementById("prev-page").disabled = !previousPageURL;
    document.getElementById("next-page").disabled = !nextPageURL;

    document.getElementById("current-page").textContent = `Page ${currentPage}`;

    document.getElementById("loader").style.display = "none";
    document.getElementById("pagination-container").style.display = "block";
  } catch (error) {
    console.log(error);
    document.getElementById("loading").style.display = "none";
  }
}

//////////// Searching implementation /////////////////////////
// Filter books by title
function filterBooksByTitle(searchQuery) {
  const filteredBooks = booksData.filter((book) =>
      book.title.toLowerCase().includes(searchQuery)
  );
   displayBooks(filteredBooks);
}
// Search functionality
document.getElementById("search-input").addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();
   filterBooksByTitle(searchQuery);
});

//////////////////// filtering implementarion
document.getElementById("genre-filter").addEventListener("change", (e) => {
  // document.getElementById("loader").style.display = "block";
  const selectedGenre = e.target.value;

  // const filter = booksData?filter(book => book?.subjects.includes())
  const filteredBooks = selectedGenre 
  ? booksData?.filter(book => book.subjects.some(subject => subject.toLowerCase().includes(selectedGenre)))   // সাবজেক্টসের মধ্যে নির্বাচিত genre আছে কিনা তা চেক করা
  : booksData;

const mas = booksData?.filter(book => book.subjects.some(subject => subject.toLowerCase().includes(selectedGenre)))

    console.log(booksData?.filter(book => book.subjects.some(subject => subject.toLowerCase().includes("Fiction"))), 'filterbooks', filteredBooks,selectedGenre,mas )
    displayBooks(filteredBooks);
   // console.log(filteredBooks)
    // document.getElementById("loading").style.display = "none";
});


///////////// previous or next pagination
document.getElementById("prev-page").addEventListener("click", () => {
  if (previousPageURL) {
    currentPage--;
    loadBooks(previousPageURL);
  }
});
document.getElementById("next-page").addEventListener("click", () => {
  if (nextPageURL) {
    currentPage++;
    loadBooks(nextPageURL);
  }
});

///////////// Add or remove Wishlist
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("wishlist-btn")) {
    const bookId = parseInt(e.target.dataset.id);

    if (!wishlist.includes(bookId)) {
      // বই Wishlist-এ যোগ করা
      wishlist.push(bookId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      e.target.textContent = "❤️ Wishlisted"; // বাটনের টেক্সট আপডেট করা
    } else {
      // বই Wishlist থেকে মুছে ফেলা
      const index = wishlist.indexOf(bookId);
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      e.target.textContent = "❤️ Add to Wishlist"; // বাটনের টেক্সট আপডেট করা
    }
  }
});

///// call loadbooks
loadBooks();






















// const createBook = (book) => {
//   const id = book?.id;
//   const title = book?.title;
//   const image = book?.formats["image/jpeg"]
//     ? book.formats["image/jpeg"]
//     : "default-cover.jpg";
//   const atuhor = book.authors.length > 0 ? book.authors[0].name : "Unknown";
//   const genre = book?.subjects?.length > 0 ? book.subjects[0] : "Unknown";

//   const bookItem = document.createElement("div");
//   bookItem.classList.add("book");

//   bookItem.innerHTML = `
//               <img src="${coverImg}" alt="Book Cover">
//               <h3>${book.title}</h3>
//               <p>Author: ${
//                 book.authors.length > 0 ? book.authors[0].name : "Unknown"
//               }</p>
//               <p>Genre: ${
//                 book.subjects.length > 0 ? book.subjects[0] : "Unknown"
//               }</p>
//               <p class="book-id">ID: ${book.id}</p>
//           `;
// };





  // books?.results?.forEach(book => {
  //     // প্রতিটি বইয়ের জন্য একটি div তৈরি করা
  //     const bookItem = document.createElement('div');
  //     bookItem.classList.add('book'); // CSS class অ্যাসাইন করা

  //     // কভার ইমেজ তৈরি করা
  //     const coverImg = document.createElement('img');
  //     coverImg.src = book.formats['image/jpeg'] ? book.formats['image/jpeg'] : 'default-cover.jpg';
  //     coverImg.alt = 'Book Cover';

  //     // শিরোনাম তৈরি করা
  //     const title = document.createElement('h3');
  //     title.textContent = book.title;

  //     // লেখকের নাম তৈরি করা
  //     const author = document.createElement('p');
  //     author.textContent = `Author: ${book.authors.length > 0 ? book.authors[0].name : 'Unknown'}`;

  //     // Genre তৈরি করা
  //     const genre = document.createElement('p');
  //     genre.textContent = `Genre: ${book.subjects.length > 0 ? book.subjects[0] : 'Unknown'}`;

  //     // ID তৈরি করা
  //     const bookId = document.createElement('p');
  //     bookId.classList.add('book-id');
  //     bookId.textContent = `ID: ${book.id}`;

  //     // সব DOM এলিমেন্টগুলোকে bookItem ডিভে অ্যাপেন্ড করা
  //     bookItem.appendChild(coverImg);
  //     bookItem.appendChild(title);
  //     bookItem.appendChild(author);
  //     bookItem.appendChild(genre);
  //     bookItem.appendChild(bookId);

  //     // bookItem div-কে মূল bookList সেকশনে অ্যাপেন্ড করা
  //     bookList.appendChild(bookItem);
  // });

  //   books?.results?.forEach((book) => {
  //     const div = createBook(book);
  //     bookList.appendChild(div);
  //   });