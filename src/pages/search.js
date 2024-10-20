const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let booksData = [];

const urlParams = new URLSearchParams(window?.location?.search);
const searchQuery = urlParams.get("query");

if (searchQuery) {
  //  নিচের লাইন দুটো বাদ দিয়ে search-input এর ভ্যালু = saveSearchQuery বসিয়ে দিলেও হয়।
  localStorage.setItem("searchQuery", searchQuery);
  const saveSearchQuery = localStorage.getItem("searchQuery");
  document.getElementById("search-input").value = saveSearchQuery;
}

async function displaySearchResults(books) {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = "";

  if (books.length === 0) {
    resultsContainer.innerHTML = `<p>No results found for "${searchQuery}"</p>`;
  } else {
    books.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("search-book-item");
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
      resultsContainer.appendChild(bookItem);
    });
  }
}

async function fetchSearchResults(query) {
  try {
    document.getElementById("loader").style.display = "block";
    // document.getElementById("pagination-container").style.display = "none";
    const response = await fetch(`https://gutendex.com/books/?search=${query}`);
    const data = await response.json();
    booksData = data.results;
    displaySearchResults(booksData);
    document.getElementById("loader").style.display = "none";
    //   setTimeout(function() {
    //     document.getElementById("pagination-container").style.display = "block";
    // }, 2000);
  } catch (error) {
    console.error("Error fetching search results:", error);
    document.getElementById("loader").style.display = "none";
  }
}

if (searchQuery) {
  fetchSearchResults(searchQuery);
}
