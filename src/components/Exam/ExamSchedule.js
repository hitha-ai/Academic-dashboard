import React, { useState } from 'react';

function ExamSchedule() {
  const [exams, setExams] = useState([
    { id: 1, subject: "Cryptography and Network Security", date: "06-05-2026", time: "09:00 AM", venue: "Hall A" },
    { id: 2, subject: "Web Technology", date: "06-05-2026", time: "02:00 PM", venue: "Hall B" },
    { id: 3, subject: "Agile Software Development and DevOps", date: "07-05-2026", time: "09:00 AM", venue: "Hall A" },
    { id: 4, subject: "Cloud Computing", date: "08-05-2026", time: "09:00 AM", venue: "Hall C" },
    { id: 5, subject: "Blockchain Technology", date: "08-05-2026", time: "02:00 PM", venue: "Hall B" },
  ]);

  return (
    <div>
      <h2>Exam Schedule</h2>
      
      <div className="card">
        <h3>Examination Timetable</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '600px' }}>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(exam => (
                <tr key={exam.id}>
                  <td>{exam.subject}</td>
                  <td>{exam.date}</td>
                  <td>{exam.time}</td>
                  <td>{exam.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExamSchedule;