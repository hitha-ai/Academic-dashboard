import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const checkPasswordStrength = (pass) => {
    if (pass.length === 0) {
      setPasswordStrength('');
      return;
    }
    if (pass.length < 6) {
      setPasswordStrength('Weak - Minimum 6 characters');
    } else if (pass.length >= 6 && pass.length < 8) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Strong');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const getStrengthColor = () => {
    if (passwordStrength.includes('Weak')) return '#5b0e0e';
    if (passwordStrength === 'Medium') return '#694508';
    if (passwordStrength === 'Strong') return '#0e3e2e';
    return '#ddd';
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email.endsWith('@reva.edu.in')) {
      setError('Please use college email id (@reva.edu.in)');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    // Pass user info to App
    onLogin(true, { name, email });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!resetEmail.endsWith('@reva.edu.in')) {
      setResetMessage('Please enter valid college email id (@reva.edu.in)');
      return;
    }
    setResetMessage(`Password reset link sent to ${resetEmail}. Use any password with 6+ characters to login.`);
    setTimeout(() => {
      setShowForgot(false);
      setResetMessage('');
      setResetEmail('');
    }, 3000);
  };

  if (showForgot) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div className="card" style={{ width: '400px' }}>
          <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>
          <form onSubmit={handleForgotPassword}>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="email"
                placeholder="College Email (@reva.edu.in)"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                required
              />
            </div>
            {resetMessage && <p style={{ color: resetMessage.includes('sent') ? '#10b981' : '#ef4444', textAlign: 'center' }}>{resetMessage}</p>}
            <button type="submit" style={{ width: '100%', background: '#667eea' }}>
              Send Reset Link
            </button>
            <button 
              type="button" 
              onClick={() => setShowForgot(false)} 
              style={{ width: '100%', marginTop: '10px', background: '#6b7280' }}
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="card" style={{ width: '450px', borderRadius: '16px' }}>
        <h2 style={{ textAlign: 'center', color: '#1a1a2e' }}>Academic Dashboard</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem' }}>Login to access your portal</p>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="College Email (@reva.edu.in)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              required
            />
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={handlePasswordChange}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              required
            />
          </div>
          {passwordStrength && (
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ 
                background: getStrengthColor(), 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '20px',
                fontSize: '12px'
              }}>
                {passwordStrength}
              </span>
            </div>
          )}
          {error && <p style={{ color: '#c90a0a', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#667eea', borderRadius: '8px' }}>
            Login
          </button>
          <button 
            type="button" 
            onClick={() => setShowForgot(true)} 
            style={{ width: '100%', marginTop: '10px', background: 'transparent', color: '#667eea', border: '1px solid #667eea' }}
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;