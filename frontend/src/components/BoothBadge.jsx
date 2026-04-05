function BoothBadge({ boothNo }) {
  const colorClass = {
    52: "badge-52",
    53: "badge-53",
    54: "badge-54"
  }[boothNo] || "badge-default";

  return <span className={`booth-badge ${colorClass}`}>{boothNo}</span>;
}

export default BoothBadge;
