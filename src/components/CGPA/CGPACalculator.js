import React, { useState } from 'react';

function CGPACalculator() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Microcontroller", credits: 3, score: 7.0 },
    { id: 2, name: "Embedded Systems", credits: 3, score: 8.2 },
    { id: 3, name: "Digital Signal Processing", credits: 4, score: 6.5 },
  ]);

  // Convert score (0-10) to letter grade
  const getGradeFromScore = (score) => {
    if (score >= 9.5) return "O";
    if (score >= 8.5) return "A+";
    if (score >= 7.5) return "A";
    if (score >= 6.5) return "B+";
    if (score >= 5.5) return "B";
    if (score >= 5.0) return "C";
    if (score >= 4.0) return "D";
    if (score >= 3.0) return "E";
    return "F";
  };

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now(), name: "", credits: 3, score: 0 }]);
  };

  const removeSubject = (id) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(sub => sub.id !== id));
    }
  };

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(sub => sub.id === id ? { ...sub, [field]: value } : sub));
  };

  const calculateCGPA = () => {
    let totalScorePoints = 0, totalCredits = 0;
    subjects.forEach(sub => {
      if (sub.name && sub.credits && sub.credits > 0) {
        totalScorePoints += sub.score * sub.credits;
        totalCredits += sub.credits;
      }
    });
    return totalCredits === 0 ? 0 : Math.min(10, (totalScorePoints / totalCredits)).toFixed(2);
  };

  return (
    <div>
      <h2>CGPA Calculator</h2>
      
      <div className="card">
        <h3>Subject Details</h3>
        <p style={{ fontSize: '13px', color: '#555', marginBottom: '1rem', background: '#f0f2f5', padding: '8px', borderRadius: '4px' }}>
        
        </p>
        
        {/* Table Header */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontWeight: 'bold', padding: '8px', background: '#1a1a2e', color: 'white', borderRadius: '4px' }}>
          <div style={{ flex: 3 }}>Subject Name</div>
          <div style={{ flex: 1, textAlign: 'center' }}>Credits</div>
          <div style={{ flex: 1, textAlign: 'center' }}>Score (0-10)</div>
          <div style={{ flex: 1, textAlign: 'center' }}>Grade</div>
          <div style={{ flex: 0.5, textAlign: 'center' }}>Action</div>
        </div>
        
        {/* Subject Rows */}
        {subjects.map(sub => (
          <div key={sub.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="e.g., Microcontroller"
              value={sub.name}
              onChange={(e) => updateSubject(sub.id, 'name', e.target.value)}
              style={{ flex: 3, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <input 
              type="number" 
              placeholder="Credits"
              value={sub.credits}
              onChange={(e) => updateSubject(sub.id, 'credits', parseInt(e.target.value) || 0)}
              style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd', textAlign: 'center' }}
              min="0"
              max="10"
            />
            <input 
              type="number" 
              placeholder="0-10"
              value={sub.score}
              onChange={(e) => {
                let value = parseFloat(e.target.value);
                if (isNaN(value)) value = 0;
                if (value > 10) value = 10;
                if (value < 0) value = 0;
                updateSubject(sub.id, 'score', value);
              }}
              style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd', textAlign: 'center' }}
              step="0.1"
              min="0"
              max="10"
            />
            <div style={{ flex: 1, textAlign: 'center', padding: '10px', background: '#e0e7ff', borderRadius: '4px', fontWeight: 'bold' }}>
              {getGradeFromScore(sub.score)}
            </div>
            <button 
              onClick={() => removeSubject(sub.id)} 
              style={{ flex: 0.5, background: '#236c2f', padding: '10px' }}
            >
              Remove
            </button>
          </div>
        ))}
        
        <button onClick={addSubject} style={{ marginTop: '1rem' }}>
          + Add Subject
        </button>
        
        {/* CGPA Display */}
        <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Your CGPA</h3>
          <div style={{ fontSize: '3rem', color: '#1a1a2e', fontWeight: 'bold' }}>
            {calculateCGPA()}
          </div>
          <p>out of 10</p>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
        
          </p>
        </div>
      </div>
    </div>
  );
}

export default CGPACalculator;