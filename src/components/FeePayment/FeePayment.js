import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { FiDownload } from 'react-icons/fi';

function FeePayment({ userName = 'Student' }) {
  const [selectedSem, setSelectedSem] = useState(1);

  const feeStructure = {
    1: { tuition: 50000, library: 5000, lab: 8000, sports: 3000, total: 66000, paid: 66000, due: 0 },
    2: { tuition: 50000, library: 5000, lab: 8000, sports: 3000, total: 66000, paid: 50000, due: 16000 },
    3: { tuition: 50000, library: 5000, lab: 8000, sports: 3000, total: 66000, paid: 40000, due: 26000 },
    4: { tuition: 50000, library: 5000, lab: 8000, sports: 3000, total: 66000, paid: 0, due: 66000 },
  };

  const paymentHistory = [
    { date: "2025-06-15", sem: 1, amount: 66000, status: "Paid", transactionId: "TXN123456" },
    { date: "2025-12-10", sem: 2, amount: 50000, status: "Paid", transactionId: "TXN789012" },
  ];

  const currentFee = feeStructure[selectedSem];

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Fee Payment Receipt", 14, 20);
    doc.setFontSize(12);
    doc.text(`Student Name: ${userName}`, 14, 40);
    doc.text(`USN: REVA2023CS001`, 14, 50);
    doc.text(`Semester: ${selectedSem}`, 14, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 70);
    doc.text(`Transaction ID: REC${Date.now()}`, 14, 80);
    doc.text(`Amount Paid: ₹${currentFee.paid.toLocaleString()}`, 14, 100);
    doc.text(`Status: ${currentFee.due === 0 ? 'Paid in Full' : 'Partial Payment'}`, 14, 110);
    doc.save(`Fee_Receipt_Sem${selectedSem}_${userName}.pdf`);
  };

  return (
    <div>
      <h2>Fee Payment</h2>
      
      <div className="card">
        <h3>Fee Structure - Semester {selectedSem}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #121b44, #49a1d0)' }}>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Tuition Fee</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>₹{currentFee.tuition.toLocaleString()}</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #04301d, #137b5c)' }}>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Library Fee</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>₹{currentFee.library.toLocaleString()}</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #613f06, #959d02)' }}>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Lab Fee</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>₹{currentFee.lab.toLocaleString()}</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #5c0a0a, #b04d0f)' }}>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Sports Fee</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>₹{currentFee.sports.toLocaleString()}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', padding: '1rem', background: '#e0e7ff', borderRadius: '12px', flexWrap: 'wrap', gap: '1rem' }}>
          <div><strong>Total Fee:</strong> ₹{currentFee.total.toLocaleString()}</div>
          <div><strong style={{ color: '#075a3e' }}>Paid:</strong> ₹{currentFee.paid.toLocaleString()}</div>
          <div><strong style={{ color: currentFee.due > 0 ? '#681f1f' : '#164938' }}>Due:</strong> ₹{currentFee.due.toLocaleString()}</div>
        </div>
        
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select 
            value={selectedSem} 
            onChange={(e) => setSelectedSem(parseInt(e.target.value))}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}
          >
            <option value={1}>Semester 1</option>
            <option value={2}>Semester 2</option>
            <option value={3}>Semester 3</option>
            <option value={4}>Semester 4</option>
          </select>
          {currentFee.due > 0 && (
            <button style={{ background: '#20473a' }}>Pay ₹{currentFee.due}</button>
          )}
          <button onClick={downloadReceipt} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiDownload size={18} /> Download Receipt
          </button>
        </div>
      </div>
      
      <div className="card">
        <h3>Payment History</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr style={{ background: '#1a1a2e', color: 'white' }}>
                <th>Date</th>
                <th>Semester</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.date}</td>
                  <td>{payment.sem}</td>
                  <td>₹{payment.amount.toLocaleString()}</td>
                  <td><span className="badge-success">Paid</span></td>
                  <td>{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}

export default FeePayment;