import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { FiHome, FiUser, FiDollarSign, FiClipboard, FiDownload } from 'react-icons/fi';

function Hostel({ userName = 'Student' }) {
  const [complaint, setComplaint] = useState({ title: "", description: "" });
  const [complaints, setComplaints] = useState([
    { id: 1, title: "Water leakage", status: "Resolved", date: "2026-04-10" },
    { id: 2, title: "Fan not working", status: "In Progress", date: "2026-04-12" },
  ]);

  const hostelDetails = {
    roomNo: "B-204",
    block: "Boys Block B",
    roomType: "Double Sharing",
    messPlan: "Veg + Non-Veg",
    feePaid: 85000,
    feeTotal: 95000,
    due: 10000,
  };

  const messMenu = {
    Monday: "Breakfast: Idli Sambar | Lunch: Rice, Dal, Curry | Dinner: Chapati, Paneer",
    Tuesday: "Breakfast: Dosa | Lunch: Biryani, Raita | Dinner: Roti, Mix Veg",
    Wednesday: "Breakfast: Pongal | Lunch: Sambar Rice | Dinner: Chapati, Kadai Veg",
    Thursday: "Breakfast: Upma | Lunch: Curd Rice | Dinner: Roti, Dal Makhani",
    Friday: "Breakfast: Puri Sabzi | Lunch: Fried Rice | Dinner: Chapati, Veg Curry",
    Saturday: "Breakfast: Chole Bhature | Lunch: Special Thali | Dinner: Roti, Paneer Butter Masala",
    Sunday: "Breakfast: Aloo Paratha | Lunch: Egg Curry/Rice | Dinner: Chapati, Mix Veg",
  };

  const addComplaint = (e) => {
    e.preventDefault();
    if (complaint.title) {
      setComplaints([{ id: Date.now(), title: complaint.title, status: "Pending", date: new Date().toISOString().split('T')[0] }, ...complaints]);
      setComplaint({ title: "", description: "" });
    }
  };

  const downloadHostelReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Hostel Accommodation Receipt", 14, 20);
    doc.setFontSize(12);
    doc.text(`Student Name: ${userName}`, 14, 45);
    doc.text(`USN: REVA2023CS001`, 14, 55);
    doc.text(`Room No: ${hostelDetails.roomNo}`, 14, 65);
    doc.text(`Block: ${hostelDetails.block}`, 14, 75);
    doc.text(`Mess Plan: ${hostelDetails.messPlan}`, 14, 85);
    doc.text(`Total Fee: ₹${hostelDetails.feeTotal.toLocaleString()}`, 14, 105);
    doc.text(`Paid: ₹${hostelDetails.feePaid.toLocaleString()}`, 14, 115);
    doc.text(`Due: ₹${hostelDetails.due.toLocaleString()}`, 14, 125);
    doc.save(`Hostel_Receipt_${userName}.pdf`);
  };

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = weekdays[new Date().getDay()];

  return (
    <div>
      <h2>Hostel Management</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <FiHome size={24} color="#1a1a2e" />
            <h3 style={{ margin: 0 }}>Room Details</h3>
          </div>
          <p><strong>Room No:</strong> {hostelDetails.roomNo}</p>
          <p><strong>Block:</strong> {hostelDetails.block}</p>
          <p><strong>Room Type:</strong> {hostelDetails.roomType}</p>
          <p><strong>Mess Plan:</strong> {hostelDetails.messPlan}</p>
        </div>
        
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <FiDollarSign size={24} color="#1a1a2e" />
            <h3 style={{ margin: 0 }}>Fee Details</h3>
          </div>
          <p><strong>Total Fee:</strong> ₹{hostelDetails.feeTotal.toLocaleString()}</p>
          <p><strong>Paid:</strong> ₹{hostelDetails.feePaid.toLocaleString()}</p>
          <p><strong>Due:</strong> <span style={{ color: hostelDetails.due > 0 ? '#5d1616' : '#10543d' }}>₹{hostelDetails.due.toLocaleString()}</span></p>
          <button onClick={downloadHostelReceipt} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiDownload size={18} /> Download Receipt
          </button>
        </div>
        
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <FiClipboard size={24} color="#1a1a2e" />
            <h3 style={{ margin: 0 }}>Today's Menu</h3>
          </div>
          <p><strong>{today}:</strong></p>
          <p style={{ fontSize: '14px', color: '#666' }}>{messMenu[today]}</p>
        </div>
      </div>
      
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <FiUser size={24} color="#1a1a2e" />
          <h3 style={{ margin: 0 }}>Register Complaint</h3>
        </div>
        <form onSubmit={addComplaint}>
          <input 
            type="text" 
            placeholder="Complaint Title"
            value={complaint.title}
            onChange={(e) => setComplaint({...complaint, title: e.target.value})}
            style={{ width: '100%', padding: '12px', marginBottom: '1rem', borderRadius: '10px', border: '1px solid #ddd' }}
            required
          />
          <textarea 
            placeholder="Description"
            value={complaint.description}
            onChange={(e) => setComplaint({...complaint, description: e.target.value})}
            style={{ width: '100%', padding: '12px', marginBottom: '1rem', minHeight: '80px', borderRadius: '10px', border: '1px solid #ddd' }}
          />
          <button type="submit">Submit Complaint</button>
        </form>
        
        <h3 style={{ marginTop: '1.5rem' }}>Your Complaints</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: '#1a1a2e', color: 'white' }}>
                <th>Date</th>
                <th>Title</th>
                <th>Status</th>
               </tr>
            </thead>
            <tbody>
              {complaints.map(comp => (
                <tr key={comp.id}>
                  <td>{comp.date}</td>
                  <td>{comp.title}</td>
                  <td>
                    <span className={`badge-${comp.status === 'Resolved' ? 'success' : comp.status === 'In Progress' ? 'warning' : 'danger'}`}>
                      {comp.status}
                    </span>
                  </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Hostel;