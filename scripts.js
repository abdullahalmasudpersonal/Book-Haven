export const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let booksData = [];
let currentPage = 1;
let previousPageURL = null;
let nextPageURL = null;

////// display home books /////////
export const displayBooks = async (books) => {
  const bookList = document.getElementById("homeBooks");
  if (books?.length > 0) {
    bookList.innerHTML = "";
  }
  books?.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.innerHTML = `
          <div>
            <div  class='imgDiv'>
               <img src="${book.formats["image/jpeg"]}" alt="Book Cover">
            </div>
            <div class='bookDetailsDiv'>
              <a style='text-decoration:none' href="/bookDetails.html?id=${
                book.id
              }" >
              <h3 title="${book.title}">${
      book.title?.length > 26 ? book?.title.slice(0, 22) + "..." : book?.title
    }</h3>
              </a>
              <p class='bookDetailsAuthor' title="${
                book?.authors[0]?.name || "Unknown"
              }"><span style='font-weight:600'>Author:</span> ${
      book.authors[0]?.name?.length > 25
        ? book.authors[0]?.name?.slice(0, 22) + "..." || "Unknown"
        : book.authors[0]?.name || "Unknown"
    }</p>
              <p class='bookDetailsSubject' title='${
                book.subjects[0] || "N/A"
              }'><span style='font-weight:600'>Genre:</span> ${
      book.subjects[0]?.length > 26
        ? book.subjects[0]?.slice(0, 22) + "..." || "N/A"
        : book.subjects[0] || "N/A"
    }</p>
              <p class='bookDetailsId'><span style='font-weight:600'>BookId:</span> ${
                book.id || "N/A"
              }</p>
              <button class="wishlist-btn" data-id="${book.id}">
              ${
                wishlist.includes(book.id)
                  ? "❤️ Wishlisted"
                  : "❤️ Add to Wishlist"
              }
              </button> 
               <a style='text-decoration:none' href="/bookDetails.html?id=${
                 book.id
               }" class="details-btn">
               <button   class='viewDetailBtn'>
                🔍 View Details
                </button>
                </a>
            </div>
          </div>`;
    bookList.appendChild(bookItem);
  });
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
    booksData = data?.results;
    displayBooks(booksData);

    previousPageURL = data?.previous;
    nextPageURL = data?.next;

    document.getElementById("prev-page").disabled = !previousPageURL;
    document.getElementById("next-page").disabled = !nextPageURL;

    document.getElementById("current-page").textContent = `Page ${currentPage}`;

    document.getElementById("loader").style.display = "none";
    document.getElementById("pagination-container").style.display = "block";
  } catch (error) {
    console.log(error);
    document.getElementById("loader").style.display = "none";
  }
};

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






//////////// Searching implementation  // Filter books by title/////////////////////////
function filterBooksByTitle(searchQuery) {
  console.log(searchQuery, "searchquery");
  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchQuery)
  );
  displayBooks(filteredBooks);
  localStorage.setItem("searchQuery", searchQuery);
}
// Search functionality
// document.getElementById("search-input").addEventListener("input", (e) => {
//   const searchQuery = e.target.value.toLowerCase();
//   filterBooksByTitle(searchQuery);
// });

//////////////////// Genre filtering implementarion
// document.getElementById("genre-filter").addEventListener("change", (e) => {
//   const selectedGenre = e.target.value;
//   const filteredBooks = selectedGenre
//     ? booksData?.filter((book) =>
//         book.subjects.some((subject) =>
//           subject.toLowerCase().includes(selectedGenre)
//         )
//       )
//     : booksData;
//   displayBooks(filteredBooks);
//   localStorage.setItem("selectedGenre", selectedGenre);
// });

//////// Apply saved search and filter from localStorage
function applySavedSearchAndFilter() {
  const savedSearchQuery = localStorage.getItem("searchQuery");
  const savedGenre = localStorage.getItem("selectedGenre");

  if (savedSearchQuery) {
    document.getElementById("search-input").value = savedSearchQuery;
  }

  if (savedGenre) {
    document.getElementById("genre-filter").value = savedGenre;
  }

  // উভয় ফিল্টার এবং সার্চ একসাথে কাজ করানো
  const filteredBooks = booksData.filter((book) => {
    const matchesSearch = savedSearchQuery
      ? book.title.toLowerCase().includes(savedSearchQuery.toLowerCase())
      : true;

    const matchesGenre = savedGenre
      ? book.subjects.some((subject) =>
          subject.toLowerCase().includes(savedGenre.toLowerCase())
        )
      : true;

    return matchesSearch && matchesGenre;
  });

  displayBooks(filteredBooks);
}

// পেজ রিফ্রেশ হলে localStorage থেকে সার্চ টার্ম এবং ফিল্টার রিস্টোর করা
// window.addEventListener("DOMContentLoaded", () => {
//   loadBooks(); // এখানে loadBooks কল করা যাতে ডেটা লোড হয় এবং তারপর ফিল্টার অ্যাপ্লাই হয়

//   // document.getElementById("close-btn").addEventListener("click", function () {
//   //   document.getElementById("search-input").value = ""; // ইনপুট ফিল্ড খালি করা
//   //   filterBooksByTitle(""); // ইনপুট খালি হলে সব বই আবার দেখানোর জন্য
//   // });

// });
/////////////////////






// ///////////////////////


