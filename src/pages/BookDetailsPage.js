function getBookIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
document.getElementById("wishlist-count").textContent = wishlist.length;

async function loadBookDetails() {
  const bookId = getBookIdFromUrl();
  document.getElementById("loader").style.display = "block";
  if (!bookId) {
    document.getElementById("book-details").innerHTML =
      "<p>No book selected!</p>";
    return;
  }

  try {
    const response = await fetch(`https://gutendex.com/books/${bookId}`);
    const book = await response.json();
    console.log(book);

    const bookDetailsContainer = document.getElementById("book-details");
    bookDetailsContainer.innerHTML = `
    <div class='imageDiv'>
      <img src="${book.formats["image/jpeg"]}" alt="${book.title} Cover">
    </div>
    <div class='detailDiv'>
      <h1>${book.title}</h1>
      <p><strong>Author:</strong> ${book.authors[0]?.name || "Unknown"}</p>
      <p><strong>Genre:</strong> ${book.subjects[0] || "N/A"}</p>
      <p><strong>Language:</strong> ${book.languages[0] || "N/A"}</p>
      <p><strong>Download Count:</strong> ${book.download_count}</p>
      <p><strong>Summary:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> <!-- Replace with actual description if available -->
    </div>
  
    `;
    document.getElementById("loader").style.display = "none";
  } catch (error) {
    document.getElementById("book-details").innerHTML =
      "<p>Error loading book details.</p>";
    document.getElementById("loader").style.display = "none";
  }
}

loadBookDetails();
