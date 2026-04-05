import { useEffect, useState } from "react";

function SearchBox({ onSearch, loading, initialValue = "" }) {
  const [input, setInput] = useState(initialValue);
  const [error, setError] = useState("");

  useEffect(() => {
    setInput(initialValue || "");
  }, [initialValue]);

  const submit = (event) => {
    event.preventDefault();
    const normalized = input.toUpperCase().trim();

    if (!normalized) {
      setError("Please enter voter number.");
      return;
    }

    setError("");
    onSearch(normalized);
  };

  const clearInput = () => {
    setInput("");
    setError("");
  };

  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    setInput(value);

    if (value.trim()) {
      setError("");
    }
  };

  return (
    <div className="search-box-wrapper">
      <form className="search-wrap" onSubmit={submit} noValidate>
        <input
          type="text"
          className={`search-input ${error ? "search-input-error" : ""}`}
          value={input}
          onChange={handleChange}
          placeholder="e.g. RRN1106715"
          disabled={loading}
          aria-invalid={Boolean(error)}
          aria-describedby="voter-id-error"
        />
        {input && (
          <button
            type="button"
            className="clear-btn"
            onClick={clearInput}
            disabled={loading}
            aria-label="Clear input"
          >
            X
          </button>
        )}
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? <span className="spinner" aria-label="Loading" /> : "Search"}
        </button>
      </form>
      {error && (
        <p id="voter-id-error" className="search-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default SearchBox;
