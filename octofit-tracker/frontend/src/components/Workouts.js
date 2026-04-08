
import React, { useEffect, useState } from 'react';
const WORKOUTS_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = WORKOUTS_API;
    console.log('Fetching workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data) ? data : data.results || [];
        setWorkouts(results);
        console.log('Fetched workouts:', data);
      })
      .catch(err => console.error('Error fetching workouts:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5">Loading workouts...</div>;

  return (
    <div className="card shadow-sm mx-auto mb-4" style={{maxWidth: '900px'}}>
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">Workouts</h2>
        {workouts.length === 0 ? (
          <div className="alert alert-info">No workouts found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  {Object.keys(workouts[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    {Object.values(workout).map((val, i) => (
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

export default Workouts;
