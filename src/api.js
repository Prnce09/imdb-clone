const API_KEY = process.env.REACT_APP_OMDB_KEY;
const BASE_URL = "https://www.omdbapi.com";

// Popular movies - OMDB me popular endpoint nahi hota
// isliye kuch famous movies hardcode karke fetch karte hain
const POPULAR_MOVIES = [
  "Avengers", "Inception", "Interstellar", "Batman",
  "Spider-Man", "Iron Man", "Joker", "The Dark Knight"
];

export const fetchPopularMovies = async () => {
  const promises = POPULAR_MOVIES.map((title) =>
    fetch(`${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
      .then((res) => res.json())
  );
  const results = await Promise.all(promises);
  // sirf valid movies return karo
  return results.filter((movie) => movie.Response === "True");
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  if (data.Response === "False") return [];

  // OMDB search sirf basic info deta hai
  // har movie ki detail alag fetch karni padti hai
  const details = await Promise.all(
    data.Search.map((movie) =>
      fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${movie.imdbID}`)
        .then((res) => res.json())
    )
  );
  return details.filter((movie) => movie.Response === "True");
};