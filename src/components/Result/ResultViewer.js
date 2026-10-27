import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FiDownload } from 'react-icons/fi';

function ResultViewer({ userName = 'Student' }) {
  const [semester, setSemester] = useState(1);
  
  const resultsData = {
    1: [
      { slNo: 1, course: "Probability and Statistics", maxMarks: 100, marksSec: 92, credits: 3, gradePoints: 10.00, creditPoints: 30.00, grade: "O" },
      { slNo: 2, course: "Engineering Chemistry", maxMarks: 100, marksSec: 92, credits: 3, gradePoints: 10.00, creditPoints: 30.00, grade: "O" },
      { slNo: 3, course: "Communication Skills", maxMarks: 50, marksSec: 42, credits: 1, gradePoints: 9.00, creditPoints: 9.00, grade: "A+" },
      { slNo: 4, course: "Programming with C", maxMarks: 100, marksSec: 90, credits: 3, gradePoints: 10.00, creditPoints: 30.00, grade: "O" },
      { slNo: 5, course: "Elements of Mechanical Engineering", maxMarks: 100, marksSec: 84, credits: 3, gradePoints: 9.00, creditPoints: 27.00, grade: "A+" },
    ],
    2: [
      { slNo: 1, course: "Data Structures", maxMarks: 100, marksSec: 88, credits: 4, gradePoints: 9.00, creditPoints: 36.00, grade: "A" },
      { slNo: 2, course: "Discrete Mathematics", maxMarks: 100, marksSec: 85, credits: 3, gradePoints: 9.00, creditPoints: 27.00, grade: "A" },
      { slNo: 3, course: "Digital Electronics", maxMarks: 100, marksSec: 78, credits: 3, gradePoints: 8.00, creditPoints: 24.00, grade: "A-" },
      { slNo: 4, course: "Object Oriented Programming", maxMarks: 100, marksSec: 91, credits: 4, gradePoints: 10.00, creditPoints: 40.00, grade: "O" },
      { slNo: 5, course: "Data Structures Lab", maxMarks: 50, marksSec: 45, credits: 1, gradePoints: 9.00, creditPoints: 9.00, grade: "A+" },
    ],
    3: [
      { slNo: 1, course: "Database Management Systems", maxMarks: 100, marksSec: 86, credits: 4, gradePoints: 9.00, creditPoints: 36.00, grade: "A" },
      { slNo: 2, course: "Operating Systems", maxMarks: 100, marksSec: 82, credits: 4, gradePoints: 8.00, creditPoints: 32.00, grade: "A-" },
      { slNo: 3, course: "Computer Networks", maxMarks: 100, marksSec: 79, credits: 3, gradePoints: 8.00, creditPoints: 24.00, grade: "A-" },
      { slNo: 4, course: "Python Programming", maxMarks: 100, marksSec: 94, credits: 3, gradePoints: 10.00, creditPoints: 30.00, grade: "O" },
      { slNo: 5, course: "DBMS Lab", maxMarks: 50, marksSec: 48, credits: 1, gradePoints: 10.00, creditPoints: 10.00, grade: "O" },
    ],
    4: [
      { slNo: 1, course: "Design and Analysis of Algorithms", maxMarks: 100, marksSec: 87, credits: 4, gradePoints: 9.00, creditPoints: 36.00, grade: "A" },
      { slNo: 2, course: "Software Engineering", maxMarks: 100, marksSec: 84, credits: 3, gradePoints: 9.00, creditPoints: 27.00, grade: "A" },
      { slNo: 3, course: "Web Technologies", maxMarks: 100, marksSec: 90, credits: 4, gradePoints: 10.00, creditPoints: 40.00, grade: "O" },
      { slNo: 4, course: "Microprocessors", maxMarks: 100, marksSec: 76, credits: 3, gradePoints: 8.00, creditPoints: 24.00, grade: "A-" },
      { slNo: 5, course: "Blockchain Technology", maxMarks: 100, marksSec: 74, credits: 3, gradePoints: 7.00, creditPoints: 21.00, grade: "B+" },
    ],
    5: [
      { slNo: 1, course: "Machine Learning", maxMarks: 100, marksSec: 89, credits: 4, gradePoints: 9.00, creditPoints: 36.00, grade: "A" },
      { slNo: 2, course: "Internet of Things", maxMarks: 100, marksSec: 86, credits: 4, gradePoints: 9.00, creditPoints: 36.00, grade: "A" },
      { slNo: 3, course: "Big Data Analytics", maxMarks: 100, marksSec: 82, credits: 3, gradePoints: 8.00, creditPoints: 24.00, grade: "A-" },
      { slNo: 4, course: "Cryptography and Network Security", maxMarks: 100, marksSec: 85, credits: 4, gradePoints: 9.00, creditPoints: 36.00, grade: "A" },
      { slNo: 5, course: "Cloud Computing", maxMarks: 100, marksSec: 88, credits: 4, gradePoints: 9.00, creditPoints: 36.00, grade: "A" },
    ],
    6: null,
    7: null,
    8: null,
  };

  const currentResults = resultsData[semester];

  const calculateTotals = () => {
    if (!currentResults) return { totalCredits: 0, totalCreditPoints: 0, sgpa: 0 };
    let totalCredits = 0;
    let totalCreditPoints = 0;
    currentResults.forEach(sub => {
      totalCredits += sub.credits;
      totalCreditPoints += sub.creditPoints;
    });
    const sgpa = totalCredits === 0 ? 0 : (totalCreditPoints / totalCredits).toFixed(2);
    return { totalCredits, totalCreditPoints, sgpa };
  };

  const { totalCredits, totalCreditPoints, sgpa } = calculateTotals();

  const downloadPDF = () => {
    if (!currentResults) return;
    
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Academic Results", 14, 20);
    doc.setFontSize(12);
    doc.text("Semester " + semester + " Results", 14, 35);
    doc.text("Student Name: " + userName, 14, 45);
    doc.text("USN: REVA2023CS001", 14, 52);
    doc.text("Branch: Computer Science", 14, 59);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 66);
    
    const tableColumn = ["Sl. No.", "Course", "Max Marks", "Marks Sec.", "Credits", "Grade Pts", "Credit Pts", "Grade"];
    const tableRows = currentResults.map(sub => [
      sub.slNo,
      sub.course,
      sub.maxMarks,
      sub.marksSec,
      sub.credits,
      sub.gradePoints.toFixed(2),
      sub.creditPoints.toFixed(2),
      sub.grade
    ]);
    
    tableRows.push(["", "", "", "", totalCredits, "", totalCreditPoints.toFixed(2), ""]);
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 75,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [26, 26, 46] }
    });
    
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text("SGPA: " + sgpa + " / 10", 14, finalY);
    
    doc.save("Semester_" + semester + "_Results_" + userName + ".pdf");
  };

  return (
    <div>
      <h2>Result Viewer</h2>
      
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3>Semester {semester} Results</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div>
              <button onClick={() => setSemester(Math.max(1, semester-1))} style={{ marginRight: '10px' }}>
                Previous Semester
              </button>
              <button onClick={() => setSemester(Math.min(8, semester+1))}>
                Next Semester
              </button>
            </div>
            {currentResults !== null && (
              <button onClick={downloadPDF} style={{ background: '#9d0c0c', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiDownload size={18} /> Download PDF
              </button>
            )}
          </div>
        </div>
        
        {currentResults === null ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: '#f5f5f5', borderRadius: '8px' }}>
            <h3 style={{ color: '#666' }}>Results Not Available Yet</h3>
            <p>Results for Semester {semester} is not yet published.</p>
          </div>
        ) : (
          <div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '900px', fontSize: '14px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#1a1a2e', color: 'white' }}>
                    <th style={{ padding: '12px' }}>Sl. No.</th>
                    <th style={{ padding: '12px' }}>Course</th>
                    <th style={{ padding: '12px' }}>Max. Marks</th>
                    <th style={{ padding: '12px' }}>Marks Sec.</th>
                    <th style={{ padding: '12px' }}>Credits</th>
                    <th style={{ padding: '12px' }}>Grade Points</th>
                    <th style={{ padding: '12px' }}>Credit Points</th>
                    <th style={{ padding: '12px' }}>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {currentResults.map((sub) => (
                    <tr key={sub.slNo} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{sub.slNo}</td>
                      <td style={{ padding: '12px', fontSize: '12px' }}>{sub.course}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{sub.maxMarks}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{sub.marksSec}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{sub.credits}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{sub.gradePoints.toFixed(2)}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{sub.creditPoints.toFixed(2)}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{ 
                          background: sub.grade === 'O' ? '#224338' : sub.grade === 'A+' ? '#113664' : '#0f0c5c', 
                          color: 'white', 
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          fontWeight: 'bold' 
                        }}>
                          {sub.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: '#f5f5f5', fontWeight: 'bold' }}>
                    <td colSpan="4" style={{ padding: '12px', textAlign: 'right' }}>Total</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{totalCredits}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}></td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{totalCreditPoints.toFixed(2)}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div style={{ marginTop: '1.5rem', textAlign: 'center', padding: '1.5rem', background: '#f5f5f5', borderRadius: '8px' }}>
              <h3>Semester Grade Point Average (SGPA)</h3>
              <div style={{ fontSize: '3rem', color: '#1a1a2e', fontWeight: 'bold' }}>
                {sgpa}
              </div>
              <p>out of 10</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultViewer;