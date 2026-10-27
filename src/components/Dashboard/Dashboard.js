import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBarChart2, FiTarget, FiCalendar, FiFileText, FiCreditCard, FiTruck, FiHome, FiBell, FiLogOut } from 'react-icons/fi';

function Dashboard({ onLogout }) {
  const navigate = useNavigate();

  const modules = [
    { id: 1, name: "Attendance Tracker", icon: <FiBarChart2 size={32} />, path: "/attendance", color: "#1a1a2e" },
    { id: 2, name: "CGPA Calculator", icon: <FiTarget size={32} />, path: "/cgpa", color: "#10b981" },
    { id: 3, name: "Exam Schedule", icon: <FiCalendar size={32} />, path: "/exam", color: "#3b82f6" },
    { id: 4, name: "Results", icon: <FiFileText size={32} />, path: "/result", color: "#8b5cf6" },
    { id: 5, name: "Reminders", icon: <FiBell size={32} />, path: "/reminder", color: "#f97316" },
    { id: 6, name: "Fee Payment", icon: <FiCreditCard size={32} />, path: "/fee", color: "#f59e0b" },
    { id: 7, name: "Transport", icon: <FiTruck size={32} />, path: "/transport", color: "#06b6d4" },
    { id: 8, name: "Hostel Management", icon: <FiHome size={32} />, path: "/hostel", color: "#ec489a" },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Dashboard</h2>
        <button onClick={onLogout} style={{ background: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
          <FiLogOut size={18} /> Logout
        </button>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {modules.map(module => (
          <div 
            key={module.id}
            onClick={() => navigate(module.path)}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
            }}
          >
            <div style={{ color: module.color, marginBottom: '1rem' }}>
              {module.icon}
            </div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{module.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;