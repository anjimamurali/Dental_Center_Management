import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authpage.css';

const Authpage = () => {
  const [role, setRole] = useState('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');    
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = {
      admin: { username: 'admin@gmail.com', password: 'admin123' },
      patient: { username: 'patient@gmail.com', password: 'patient123' },
    };

    if (
      username === credentials[role].username &&
      password === credentials[role].password
    ) {
      localStorage.setItem('user', JSON.stringify({ role, username }));
      setError('');  
      navigate(role === 'admin' ? '/admin' : '/patient');
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box glass">
        {error && <div className="auth-error">{error}</div>}

        <h2>🦷 Dental Center Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="auth-input"
          >
            <option value="admin">Admin (Dentist)</option>
            <option value="patient">Patient</option>
          </select>
          <input
            className="auth-input"
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Authpage;
