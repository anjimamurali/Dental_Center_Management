import React, { useState, useEffect } from 'react';
import AdminCalendarWithFilter from '../components/AdminCalendarWithFilter';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(stored);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ color: '#1e3a8a', marginBottom: '1.5rem' }}>📅 Appointments Calendar</h1>

      {appointments.length > 0 ? (
        <AdminCalendarWithFilter appointments={appointments} />
      ) : (
        <p style={{ color: '#555' }}>No appointments available to show on the calendar.</p>
      )}
    </div>
  );
};

export default AdminAppointments;
