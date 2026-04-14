import { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_OMDB_KEY

function MovieSearch() {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchMovies(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  async function fetchMovies(title) {
    setLoading(true);
    setError(null);

    try {
      const res  = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${API_KEY}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setResults(data.Search);
      } else {
        setResults([]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  const FALLBACK_IMG = "https://placehold.co/50x70?text=N/A";

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>🎬 Movie Search</h2>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 14px",
          fontSize: 16,
          borderRadius: 8,
          border: "1px solid #ccc",
          boxSizing: "border-box",
          marginBottom: 16,
        }}
      />

      {loading && <p>⏳ Searching...</p>}
      {error   && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && query.trim() && results.length === 0 && (
        <p style={{ color: "#888" }}>🔍 No results found for "{query}"</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {results.map((movie) => (
          <li
            key={movie.imdbID}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              padding: "12px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMG}
              alt={movie.Title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK_IMG;
              }}
              style={{ width: 50, height: 70, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
            />

            <div>
              <strong style={{ fontSize: 15 }}>{movie.Title}</strong>
              <p style={{ margin: "4px 0 0", color: "#888", fontSize: 13 }}>
                {movie.Type} · {movie.Year}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;