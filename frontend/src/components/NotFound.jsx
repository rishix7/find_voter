function NotFound({ voterId }) {
  return (
    <div className="not-found-card">
      <div className="not-found-icon">?</div>
      <h3>No voter found for ID "{voterId}"</h3>
      <p>Please check the ID and try again. IDs are case-insensitive.</p>
    </div>
  );
}

export default NotFound;
