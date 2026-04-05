import { useEffect, useState } from "react";

const VOTER_ID_LENGTH = 10;

function SearchBox({ onSearch, loading, initialValue = "" }) {
  const [input, setInput] = useState(initialValue);
  const [error, setError] = useState("");

  useEffect(() => {
    setInput(initialValue || "");
  }, [initialValue]);

  const sanitizeVoterId = (value) => value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, VOTER_ID_LENGTH);

  const submit = (event) => {
    event.preventDefault();
    const normalized = sanitizeVoterId(input);

    if (!normalized) {
      setError("Please enter voter number.");
      return;
    }

    if (normalized.length !== VOTER_ID_LENGTH) {
      setError(`Voter ID must be exactly ${VOTER_ID_LENGTH} characters.`);
      return;
    }

    setError("");
    setInput(normalized);
    onSearch(normalized);
  };

  const clearInput = () => {
    setInput("");
    setError("");
  };

  const handleChange = (event) => {
    const value = sanitizeVoterId(event.target.value);
    setInput(value);

    if (value.length === VOTER_ID_LENGTH) {
      setError("");
    } else if (value.length > 0) {
      setError(`Voter ID must be exactly ${VOTER_ID_LENGTH} characters.`);
    } else {
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
          maxLength={VOTER_ID_LENGTH}
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
        <button type="submit" className="search-btn" disabled={loading || input.length !== VOTER_ID_LENGTH}>
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
