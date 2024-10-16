const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Function to update the wishlist display
function updateWishlistDisplay() {
    const wishlistContainer = document.getElementById("wishlist");
    wishlistContainer.innerHTML = "";  // Clear the previous wishlist display

    wishlist.forEach(bookId => {
        const book = booksData.find(b => b.id === bookId);  // Find the book in the original data
        if (book) {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.authors[0]?.name || "Unknown"}</p>
                <img src="${book.formats['image/jpeg']}" alt="${book.title}" />
                <button class="remove-from-wishlist-btn" data-id="${book.id}">Remove from Wishlist</button>
            `;
            wishlistContainer.appendChild(bookElement);
        }
    });
}

// Function to handle adding/removing books from wishlist
function toggleWishlist(bookId) {
    const index = wishlist.indexOf(bookId);

    if (index === -1) {
        // Add to wishlist
        wishlist.push(bookId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    // Update the display
    updateWishlistDisplay();
}

// Display wishlist when the page loads
updateWishlistDisplay();

// Event listener for adding/removing books from wishlist
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("wishlist-btn")) {
        const bookId = e.target.dataset.id;
        toggleWishlist(bookId);

        // Change button text based on wishlist status
        e.target.textContent = wishlist.includes(bookId) ? "❤️ Wishlisted" : "❤️ Add to Wishlist";
    }
});

// Event listener for removing books from wishlist
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-from-wishlist-btn")) {
        const bookId = e.target.dataset.id;
        toggleWishlist(bookId);
    }
});
