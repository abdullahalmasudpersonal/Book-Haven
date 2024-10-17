












let booksData = [];  
/////////// Load wishlist function
const wishlistBooksContainer = document.getElementById("wishlist-books");

// Wishlist-এ থাকা বইগুলো দেখানোর ফাংশন
const displayWishlistBooks = (books) => {
  wishlistBooksContainer.innerHTML = ""; // আগের বইগুলো মুছে ফেলা

  // LocalStorage থেকে Wishlist লোড করা
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  document.getElementById("wishlist-count").textContent = wishlist.length;

  // ফিল্টার করা বইগুলো লোড করা (wishlist-এর মধ্যে যেগুলো আছে)
  const wishlistBooks = books.filter(book => wishlist.includes(book.id));

  // যদি Wishlist খালি থাকে
  if (wishlistBooks.length === 0) {
    wishlistBooksContainer.innerHTML = `<p>Your wishlist is empty.</p>`;
    return;
  }

  // Wishlist বইগুলো দেখানো
  wishlistBooks.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("wishlist-book-item");

    bookItem.innerHTML = `
      <img src="${book.formats['image/jpeg']}" alt="Book Cover">
      <h3>${book.title}</h3>
      <p>Author: ${book.authors[0]?.name || "Unknown"}</p>
      <p>Genre: ${book.subjects[0] || "N/A"}</p>
      <button class="remove-from-wishlist-btn" data-id="${book.id}">Remove from Wishlist</button>
    `;

    wishlistBooksContainer.appendChild(bookItem);
  });
};

//////////  Remote wishlist function
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-from-wishlist-btn")) {
      const bookId = parseInt(e.target.dataset.id);
  
      // LocalStorage থেকে বই মুছে ফেলা
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlist = wishlist.filter(id => id !== bookId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      // পুনরায় Wishlist বইগুলো দেখানো
      displayWishlistBooks(booksData);  // booksData হলো মূল বইয়ের তালিকা যা API থেকে লোড হয়েছে
    }
  });


  
  ///////// load wishlist api
  async function loadWishlistBooks() {
    try {
        document.getElementById("loader").style.display = "block";
      const response = await fetch('https://gutendex.com/books');
      const data = await response.json();
      booksData = data.results;  
      displayWishlistBooks(booksData);
      document.getElementById("loader").style.display = "none";
    } catch (error) {
      console.log("Error loading wishlist books:", error);
      document.getElementById("loader").style.display = "none";
    }
  }

  
  // Wishlist পেজ লোড হলে এই ফাংশন কল করবে
  loadWishlistBooks();
  