import BoothBadge from "./BoothBadge";

function ResultCard({ voter }) {
  const copySummary = async () => {
    const summary = [
      `Voter ID: ${voter.voter_id}`,
      `Booth No: ${voter.part_no}`,
      `Serial No: ${voter.serial_no}`,
      `Name: ${voter.name}`,
      `Age/Gender: ${voter.age} / ${voter.gender_en}`,
      `Relation: ${voter.relation_type} ${voter.relation_name}`,
      `House No: ${voter.house_no}`,
      `Section: ${voter.section ?? "N/A"}`,
      `Constituency: ${voter.constituency_no}`,
      `State: ${voter.state}`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      alert("Result copied to clipboard");
    } catch {
      alert("Unable to copy. Please copy manually.");
    }
  };

  return (
    <article className="result-card">
      <div className="result-head">
        <span className="ok-icon">?</span>
        <h2>Voter Found</h2>
      </div>

      <div className="highlight-grid">
        <div className="highlight-box">
          <span>Booth No</span>
          <strong>
            <BoothBadge boothNo={voter.part_no} />
          </strong>
        </div>
        <div className="highlight-box">
          <span>Serial No</span>
          <strong>{voter.serial_no}</strong>
        </div>
      </div>

      <div className="details-grid">
        <p><span>Name</span><strong className="tamil-text">{voter.name}</strong></p>
        <p><span>Voter ID</span><strong>{voter.voter_id}</strong></p>
        <p><span>Section</span><strong>{voter.section ?? "N/A"}</strong></p>
        <p><span>House No</span><strong>{voter.house_no}</strong></p>
        <p><span>Age</span><strong>{voter.age} years</strong></p>
        <p><span>Gender</span><strong>{voter.gender_en}</strong></p>
        <p><span>Relation</span><strong>{voter.relation_type} {voter.relation_name}</strong></p>
        <p><span>Constituency</span><strong>{voter.constituency_no}</strong></p>
        <p><span>State</span><strong>{voter.state}</strong></p>
      </div>

      <div className="action-row no-print">
        <button type="button" onClick={() => window.print()}>Print</button>
        <button type="button" onClick={copySummary}>Copy</button>
      </div>
    </article>
  );
}

export default ResultCard;
