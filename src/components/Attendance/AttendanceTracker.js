import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_URL = 'http://localhost:5000/api';

function AttendanceTracker() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/attendance`);
      if (!res.ok) throw new Error('Failed to load attendance');
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      setError('Could not connect to server. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentage = (attended, total) => {
    if (total === 0) return "N/A";
    return ((attended / total) * 100).toFixed(1);
  };

  const getStatusColor = (percentage) => {
    if (percentage === "N/A") return '#888';
    const p = parseFloat(percentage);
    if (p >= 75) return '#10b981';
    if (p >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const totalClasses = subjects.reduce((sum, sub) => sum + (sub.total || 0), 0);
  const totalAttended = subjects.reduce((sum, sub) => sum + (sub.attended || 0), 0);
  const overallPercentage = totalClasses === 0 ? 0 : ((totalAttended / totalClasses) * 100).toFixed(2);

  const chartData = [
    { week: "Week 1", attendance: 82 },
    { week: "Week 2", attendance: 78 },
    { week: "Week 3", attendance: 85 },
    { week: "Week 4", attendance: 80 },
    { week: "Week 5", attendance: parseFloat(overallPercentage) || 0 },
  ];

  if (loading) {
    return (
      <div>
        <h2>Attendance Tracker</h2>
        <div className="card">
          <p style={{ textAlign: 'center', padding: '2rem' }}>Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Attendance Tracker</h2>

      {error && (
        <div style={{ background: '#fee', color: '#c00', padding: '12px', borderRadius: '8px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      <div className="card">
        <h3>Attendance Overview</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f5f5f5', borderRadius: '8px', flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Classes</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e' }}>{totalClasses}</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f5f5f5', borderRadius: '8px', flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#666' }}>Classes Attended</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e' }}>{totalAttended}</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f5f5f5', borderRadius: '8px', flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#666' }}>Overall Percentage</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: overallPercentage >= 75 ? '#10b981' : overallPercentage >= 60 ? '#f59e0b' : '#ef4444' }}>
              {overallPercentage}%
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Attendance Trend (Last 5 Weeks)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke="#1a1a2e" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3>Detailed Attendance Report</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '800px' }}>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Subject</th>
                <th>Professor</th>
                <th>Total</th>
                <th>Attended</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(sub => {
                const percentage = calculatePercentage(sub.attended, sub.total);
                return (
                  <tr key={sub.id}>
                    <td>{sub.code}</td>
                    <td style={{ fontSize: '12px' }}>{sub.name}</td>
                    <td style={{ fontSize: '12px' }}>{sub.professor}</td>
                    <td>{sub.total === 0 ? '-' : sub.total}</td>
                    <td>{sub.attended === 0 ? '-' : sub.attended}</td>
                    <td style={{ color: getStatusColor(percentage), fontWeight: 'bold' }}>
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
              <tr style={{ background: '#f5f5f5', fontWeight: 'bold' }}>
                <td colSpan="3" style={{ textAlign: 'right' }}>Total / Average</td>
                <td>{totalClasses}</td>
                <td>{totalAttended}</td>
                <td>{overallPercentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceTracker;