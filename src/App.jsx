import React, { useState, useEffect } from "react";
import { fetchPopularMovies, searchMovies } from "./api";
import MovieCard from "./components/MovieCard";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Popular movies load karo — sirf ek baar (mount pe)
  useEffect(() => {
    loadPopular();
  }, []);

  const loadPopular = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPopularMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return loadPopular();
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">🎬 MovieVault</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn" type="submit">Search</button>
          {query && (
            <button className="reset-btn" type="button" onClick={() => { setQuery(""); loadPopular(); }}>
              Clear
            </button>
          )}
        </form>
      </header>

      <main className="main">
        {loading && (
          <div className="status">
            <div className="spinner" />
            <p>Loading movies...</p>
          </div>
        )}

        {error && (
          <div className="status error">
            <p>⚠️ {error}</p>
            <button onClick={loadPopular}>Try Again</button>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="status">
            <p>No movies found.</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <>
            <p className="result-count">{movies.length} movies found</p>
            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;