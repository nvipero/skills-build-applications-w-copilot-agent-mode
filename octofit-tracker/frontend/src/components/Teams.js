
import React, { useEffect, useState } from 'react';
const TEAMS_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = TEAMS_API;
    console.log('Fetching teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setTeams(results);
        console.log('Fetched teams:', data);
      })
      .catch(err => console.error('Error fetching teams:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5">Loading teams...</div>;

  return (
    <div className="card shadow-sm mx-auto mb-4" style={{maxWidth: '900px'}}>
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">Teams</h2>
        {teams.length === 0 ? (
          <div className="alert alert-info">No teams found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  {Object.keys(teams[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    {Object.values(team).map((val, i) => (
                      <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
