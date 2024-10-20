import { wishlist } from "../../scripts.js";

///// display books data
export const displayBooks = async (books) => {
  const bookList = document.getElementById("books");
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
