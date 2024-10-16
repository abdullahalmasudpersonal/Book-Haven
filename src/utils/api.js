const fetchBooks = async (page = 1) => {
  const response = await fetch(`https://gutendex.com/books/?page=${page}`);
  const data = await response.json();
  return data.results;
};

fetchBooks();
