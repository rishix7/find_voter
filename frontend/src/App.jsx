import { useEffect, useState } from "react";
import axios from "axios";

import SearchBox from "./components/SearchBox";
import ResultCard from "./components/ResultCard";
import NotFound from "./components/NotFound";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [query, setQuery] = useState("");
  const [voter, setVoter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ booth52: 0, booth53: 0, booth54: 0, total: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/stats`);
        setStats(res.data);
      } catch {
        setStats({ booth52: 0, booth53: 0, booth54: 0, total: 0 });
      }
    };

    loadStats();
  }, []);

  const handleSearch = async (voterId) => {
    const normalized = voterId.toUpperCase().trim();
    if (!normalized) return;

    setQuery(normalized);
    setLoading(true);
    setError("");
    setVoter(null);

    try {
      const res = await axios.post(`${API_URL}/api/voter/lookup`, { voterId: normalized });

      if (res.data?.found) {
        setVoter(res.data.voter);
      } else {
        setError("Voter not found");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Voter not found");
      } else if (err.response?.status === 400) {
        setError("Please enter a valid voter number.");
      } else {
        setError("Unable to search right now. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header no-print">
          <h1>Voter ID Lookup App</h1>
          <p>Constituency 175, Tamil Nadu</p>
        </header>

        <section className="stats-grid no-print">
          <div className="stat-card booth-52">
            <span>Booth 52</span>
            <strong>{stats.booth52}</strong>
          </div>
          <div className="stat-card booth-53">
            <span>Booth 53</span>
            <strong>{stats.booth53}</strong>
          </div>
          <div className="stat-card booth-54">
            <span>Booth 54</span>
            <strong>{stats.booth54}</strong>
          </div>
          <div className="stat-card total">
            <span>Total Voters</span>
            <strong>{stats.total}</strong>
          </div>
        </section>

        <div className="no-print">
          <SearchBox onSearch={handleSearch} loading={loading} initialValue={query} />
        </div>

        {voter && <ResultCard voter={voter} />}
        {!loading && error && <NotFound voterId={query} />}
      </div>
    </div>
  );
}

export default App;
