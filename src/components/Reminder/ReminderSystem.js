import React, { useState, useEffect } from 'react';
import { FiBell, FiTrash2 } from 'react-icons/fi';

const API_URL = 'http://localhost:5000/api';

function ReminderSystem() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({ title: "", date: "", time: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/reminders`);
      if (!res.ok) throw new Error('Failed to load reminders');
      const data = await res.json();
      setReminders(data);
    } catch (err) {
      setError('Could not connect to server. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addReminder = async () => {
    if (!newReminder.title.trim() || !newReminder.date) {
      setError('Title and date are required');
      return;
    }

    setError('');
    try {
      const res = await fetch(`${API_URL}/reminders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReminder)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create reminder');
      }

      const created = await res.json();
      setReminders([created, ...reminders]);
      setNewReminder({ title: "", date: "", time: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteReminder = async (id) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/reminders/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete reminder');
      setReminders(reminders.filter(r => r.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Reminder System</h2>
      
      {error && (
        <div style={{ background: '#fee', color: '#c00', padding: '12px', borderRadius: '8px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="card">
        <h3>Add New Reminder</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Reminder title"
            value={newReminder.title}
            onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
            style={{ flex: 2, minWidth: '150px', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}
          />
          <input 
            type="date" 
            value={newReminder.date}
            onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
            style={{ flex: 1, minWidth: '120px', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}
          />
          <input 
            type="time" 
            value={newReminder.time}
            onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
            style={{ flex: 1, minWidth: '100px', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}
          />
          <button onClick={addReminder} style={{ padding: '12px 24px' }}>
            Add Reminder
          </button>
        </div>
      </div>
      
      <div className="card">
        <h3><FiBell style={{ marginRight: '8px' }} /> Your Reminders</h3>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>Loading...</p>
        ) : reminders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>No reminders found. Add a reminder using the form above.</p>
        ) : (
          reminders.map(rem => (
            <div key={rem.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #eee' }}>
              <div>
                <strong>{rem.title}</strong>
                <div style={{ fontSize: '12px', color: '#888' }}>{rem.date} {rem.time}</div>
              </div>
              <button onClick={() => deleteReminder(rem.id)} style={{ background: '#dc2626', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FiTrash2 size={14} /> Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReminderSystem;