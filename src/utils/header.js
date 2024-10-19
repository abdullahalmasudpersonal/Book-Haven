//  header js
const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");

// Open Close Navbar Menu on Click Burger
if (burgerMenu && navbarMenu) {
   burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
   });
}

// Close Navbar Menu on Click Menu Links
document.querySelectorAll(".menu-link").forEach((link) => {
   link.addEventListener("click", () => {
      burgerMenu.classList.remove("is-active");
      navbarMenu.classList.remove("is-active");
   });
});

//// active link js
document.querySelectorAll(".menu-link").forEach((link) => {
  if (link.href === window.location.href) {
     link.classList.add("active");
  }
});


// /////////// Header search ber //////////////////
document.getElementById("search-form").addEventListener("submit", function (e) {
   e.preventDefault(); // Prevent form from refreshing the page
 
   // সার্চ ইনপুটের ভ্যালু পাওয়া
   const searchQuery = document.getElementById("search-input").value;
 
   // সার্চ পেজে রিডাইরেক্ট করা (GET রিকোয়েস্টের মাধ্যমে কুয়েরি প্যারামিটার সহ)
   if (searchQuery) {
     window.location.href = `/search.html?query=${encodeURIComponent(searchQuery)}`;
   }
 });
 