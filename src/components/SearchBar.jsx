import { useState, useEffect } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      fetch(`https://api.datamuse.com/sug?s=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClick = (word) => {
    setQuery(word);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleClick(item.word)}>
              {item.word}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;