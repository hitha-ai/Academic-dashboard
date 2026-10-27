import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { FiDownload, FiMapPin, FiClock, FiTruck } from 'react-icons/fi';

function Transport({ userName = 'Student' }) {
  const [selectedRoute, setSelectedRoute] = useState(1);
  const [appliedRoute, setAppliedRoute] = useState(null);

  const routes = {
    1: { name: "Route A - City Center", fee: 25000, stops: ["Main Gate (7:00 AM)", "City Mall (7:15 AM)", "Railway Station (7:30 AM)", "College (8:00 AM)"] },
    2: { name: "Route B - North Side", fee: 22000, stops: ["North Point (6:45 AM)", "Lake View (7:00 AM)", "Park Colony (7:20 AM)", "College (8:00 AM)"] },
    3: { name: "Route C - East Corridor", fee: 20000, stops: ["East End (7:10 AM)", "Market Square (7:25 AM)", "Bus Stand (7:40 AM)", "College (8:00 AM)"] },
  };

  const currentRoute = routes[selectedRoute];

  const applyForRoute = () => {
    setAppliedRoute(selectedRoute);
  };

  const downloadPass = () => {
    if (!appliedRoute) {
      alert("Please apply for a route first");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Transport Bus Pass", 14, 20);
    doc.setFontSize(12);
    doc.text(`Student Name: ${userName}`, 14, 45);
    doc.text(`USN: REVA2023CS001`, 14, 55);
    doc.text(`Route: ${routes[appliedRoute].name}`, 14, 65);
    doc.text(`Fee Paid: ₹${routes[appliedRoute].fee}`, 14, 75);
    doc.text(`Valid From: ${new Date().toLocaleDateString()}`, 14, 85);
    doc.text(`Valid Till: Dec 2026`, 14, 95);
    doc.save(`Transport_Pass_${userName}.pdf`);
  };

  return (
    <div>
      <h2>Transport Management</h2>
      
      <div className="card">
        <h3>Select Your Bus Route</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {Object.keys(routes).map(route => (
            <button 
              key={route}
              onClick={() => setSelectedRoute(parseInt(route))}
              style={{ 
                background: selectedRoute === parseInt(route) ? '#1a1a2e' : '#e2e8f0',
                color: selectedRoute === parseInt(route) ? 'white' : '#333'
              }}
            >
              {routes[route].name}
            </button>
          ))}
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={applyForRoute} style={{ background: '#236851' }}>
            Apply for this Route
          </button>
        </div>
        
        {appliedRoute && (
          <div style={{ padding: '1rem', background: '#d1fae5', borderRadius: '12px', marginBottom: '1rem' }}>
            <strong>Your Active Route:</strong> {routes[appliedRoute].name}
          </div>
        )}
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <FiMapPin color="#1a1a2e" size={24} />
              <strong>Route Details</strong>
            </div>
            <p><strong>Route Name:</strong> {currentRoute.name}</p>
            <p><strong>Annual Fee:</strong> ₹{currentRoute.fee.toLocaleString()}</p>
          </div>
          
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <FiClock color="#1a1a2e" size={24} />
              <strong>Bus Stops & Timing</strong>
            </div>
            <ul style={{ marginLeft: '1rem' }}>
              {currentRoute.stops.map((stop, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>{stop}</li>
              ))}
            </ul>
          </div>
          
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <FiTruck color="#1a1a2e" size={24} />
              <strong>Your Status</strong>
            </div>
            <p><strong>Transport Pass:</strong> {appliedRoute ? "Active" : "Not Applied"}</p>
            <p><strong>Selected Route:</strong> {currentRoute.name}</p>
            <button onClick={downloadPass} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiDownload size={18} /> Download Bus Pass
            </button>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3>Announcements</h3>
        <ul style={{ marginLeft: '1rem' }}>
          <li style={{ marginBottom: '10px' }}>Bus timings changed for Route A from May 1st</li>
          <li style={{ marginBottom: '10px' }}>New route added for Electronic City area</li>
          <li style={{ marginBottom: '10px' }}>Transport fee payment deadline: June 30th</li>
        </ul>
      </div>
    </div>
  );
}

export default Transport;