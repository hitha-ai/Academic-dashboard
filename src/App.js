import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import AttendanceTracker from './components/Attendance/AttendanceTracker';
import CGPACalculator from './components/CGPA/CGPACalculator';
import ExamSchedule from './components/Exam/ExamSchedule';
import ResultViewer from './components/Result/ResultViewer';
import ReminderSystem from './components/Reminder/ReminderSystem';
import FeePayment from './components/FeePayment/FeePayment';
import Transport from './components/Transport/Transport';
import Hostel from './components/Hostel/Hostel';
import Login from './components/Login/Login';
import './styles/App.css';

// Component for back button on all pages
function Layout({ children, onLogout, userName }) {
  const navigate = useNavigate();
  
  return (
    <div className="app">
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/')} 
            style={{ background: '#4a5568', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
          >
            ← Dashboard
          </button>
          <h1>Academic Dashboard</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'white' }}>Welcome, {userName}!</span>
        </div>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });

  const handleLogin = (status, userData) => {
    setIsLoggedIn(status);
    if (userData) {
      setUser(userData);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout onLogout={() => setIsLoggedIn(false)} userName={user.name}>
            <Dashboard onLogout={() => setIsLoggedIn(false)} />
          </Layout>
        } />
        <Route path="/attendance" element={
          <Layout onLogout={() => setIsLoggedIn(false)} userName={user.name}>
            <AttendanceTracker />
          </Layout>
        } />
        <Route path="/cgpa" element={
          <Layout onLogout={() => setIsLoggedIn(false)} userName={user.name}>
            <CGPACalculator />
          </Layout>
        } />
        <Route path="/exam" element={
          <Layout onLogout={() => setIsLoggedIn(false)} userName={user.name}>
            <ExamSchedule />
          </Layout>
        } />
        <Route path="/result" element={
          <Layout onLogout={() => setIsLoggedIn(false)} userName={user.name}>
            <ResultViewer userName={user.name} />
          </Layout>
        } />
        <Route path="/reminder" element={
          <Layout onLogout={() => setIsLoggedIn(false)} userName={user.name}>
            <ReminderSystem />
          </Layout>
        } />
        <Route path="/fee" element={
          <Layout onLogout={() => setIsLoggedIn(false)} userName={user.name}>
            <FeePayment userName={user.name} />
          </Layout>
        } />
        <Route path="/transport" element={
          <Layout onLogout={() => setIsLoggedIn(false)} userName={user.name}>
            <Transport userName={user.name} />
          </Layout>
        } />
        <Route path="/hostel" element={
          <Layout onLogout={() => setIsLoggedIn(false)} userName={user.name}>
            <Hostel userName={user.name} />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;