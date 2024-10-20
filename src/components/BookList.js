
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

    // এখানে প্রথমে সেভ করা সার্চ এবং ফিল্টার অ্যাপ্লাই করা হবে
    applySavedSearchAndFilter();

    previousPageURL = data.previous;
    nextPageURL = data.next;

    document.getElementById("prev-page").disabled = !previousPageURL;
    document.getElementById("next-page").disabled = !nextPageURL;

    document.getElementById("current-page").textContent = `Page ${currentPage}`;

    document.getElementById("loader").style.display = "none";
    document.getElementById("pagination-container").style.display = "block";
  } catch (error) {
    console.log(error);
    document.getElementById("loader").style.display = "none";
  }
}