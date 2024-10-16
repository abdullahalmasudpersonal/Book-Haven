const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// পেজ লোড হওয়ার সময় wishlist এ থাকা বইগুলোতে "Wishlisted" দেখানো
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".wishlist-btn").forEach((button) => {
    const bookId = button.dataset.id;
    if (wishlist.includes(bookId)) {
      button.textContent = "❤️ Wishlisted";
    } else {
      button.textContent = "❤️ Add to Wishlist";
    }
  });
});

// ক্লিক ইভেন্ট হ্যান্ডলার wishlist পরিচালনার জন্য
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("wishlist-btn")) {
    const bookId = e.target.dataset.id;

    if (!wishlist.includes(bookId)) {
      wishlist.push(bookId); 
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      e.target.textContent = "❤️ Wishlisted";  // বাটনের টেক্সট আপডেট
    } else {
      const index = wishlist.indexOf(bookId);
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      e.target.textContent = "❤️ Add to Wishlist";  // বাটনের টেক্সট আপডেট
    }
  }
});