function RecentSearches({ searches, onSelect }) {
  if (!searches.length) return null;

  return (
    <div className="recent-wrap">
      <span>Recent:</span>
      <div className="chip-row">
        {searches.slice(0, 5).map((id) => (
          <button key={id} type="button" className="chip" onClick={() => onSelect(id)}>
            {id}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;
