import React, { useEffect, useState } from 'react';
import './AdminDashboard.css'; 

const PatientDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const demoAppointments = [
      {
        id: Date.now() + 1,
        patientId: 'P01',
        title: 'Root Canal',
        description: 'Molar tooth root canal treatment.',
        comments: 'Healing well.',
        date: '2025-06-10T10:00',
        treatment: 'Root Canal',
        cost: 3500,
        status: 'Completed',
        nextDate: '',
        file: ''
      },
      {
        id: Date.now() + 2,
        patientId: 'P02',
        title: 'Tooth Extraction',
        description: 'Wisdom tooth removal.',
        comments: 'No complications.',
        date: '2025-06-05T11:30',
        treatment: 'Extraction',
        cost: 2500,
        status: 'Completed',
        nextDate: '',
        file: ''
      },
      {
        id: Date.now() + 3,
        patientId: 'P03',
        title: 'Cavity Filling',
        description: 'Filling on upper left molar.',
        comments: '',
        date: '2025-06-01T14:00',
        treatment: 'Filling',
        cost: 1000,
        status: 'Completed',
        nextDate: '',
        file: ''
      },
      {
        id: Date.now() + 4,
        patientId: 'P04',
        title: 'Braces Check-up',
        description: 'Monthly adjustment.',
        comments: '',
        date: '2025-06-15T16:30',
        treatment: 'Ortho follow-up',
        cost: 700,
        status: 'Completed',
        nextDate: '',
        file: ''
      },
      {
        id: Date.now() + 5,
        patientId: 'P05',
        title: 'Teeth Cleaning',
        description: 'Routine cleaning procedure.',
        comments: 'Patient has sensitive gums.',
        date: '2025-06-20T09:00',
        treatment: 'Scaling & Polishing',
        cost: 900,
        status: 'Completed',
        nextDate: '',
        file: ''
      },
      {
        id: Date.now() + 6,
        patientId: 'P06',
        title: 'Follow-up Root Canal',
        description: 'Post root canal review.',
        comments: '',
        date: '2025-07-10T11:00',
        treatment: '',
        cost: '',
        status: 'Ongoing',
        nextDate: '2025-07-20',
        file: ''
      },
      {
        id: Date.now() + 7,
        patientId: 'P07',
        title: 'Orthodontic Consultation',
        description: 'Discussing braces treatment.',
        comments: '',
        date: '2025-07-15T13:00',
        treatment: '',
        cost: '',
        status: 'Scheduled',
        nextDate: '',
        file: ''
      },
      {
        id: Date.now() + 8,
        patientId: 'P08',
        title: 'Whitening',
        description: 'Teeth whitening procedure.',
        comments: '',
        date: '2025-07-25T10:00',
        treatment: '',
        cost: '',
        status: 'Scheduled',
        nextDate: '',
        file: ''
      },
      {
        id: Date.now() + 9,
        patientId: 'P09',
        title: 'Braces Tightening',
        description: 'Second adjustment appointment.',
        comments: '',
        date: '2025-08-01T15:30',
        treatment: '',
        cost: '',
        status: 'Scheduled',
        nextDate: '',
        file: ''
      },
      {
        id: Date.now() + 10,
        patientId: 'P10',
        title: 'Final Root Canal Review',
        description: 'Cap fitting and final review.',
        comments: '',
        date: '2025-08-10T11:00',
        treatment: '',
        cost: '',
        status: 'Scheduled',
        nextDate: '',
        file: ''
      }
    ];

    localStorage.setItem('appointments', JSON.stringify(demoAppointments));
    setAppointments(demoAppointments);
  }, []);

  const now = new Date();
  const upcomingAppointments = appointments.filter(app => new Date(app.date) >= now);
  const pastAppointments = appointments.filter(app => new Date(app.date) < now);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Welcome, <span>{user?.username}</span></h1>
            <p>Your dental appointment details</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <section className="patient-info">
        <h2>👤 Patient Details</h2>
        <div className="patient-card">
          <p><strong>ID:</strong> P001</p>
          <p><strong>Email:</strong> {user?.email || user?.username}</p>
          <p><strong>DOB:</strong> {user?.dob || '12/05/1996'}</p>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>📅 Upcoming Appointments</h2>
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((app) => (
                  <tr key={app.id}>
                    <td>{app.title}</td>
                    <td>{new Date(app.date).toLocaleString()}</td>
                    <td>
                      <span className={`status-pill ${app.status?.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data">No upcoming appointments</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>📜 Appointment History</h2>
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Treatment</th>
                <th>Cost</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {pastAppointments.length > 0 ? (
                pastAppointments.map((app) => (
                  <tr key={app.id}>
                    <td>{app.title}</td>
                    <td>{new Date(app.date).toLocaleString()}</td>
                    <td>{app.treatment || '—'}</td>
                    <td>₹ {app.cost || 0}</td>
                    <td>
                      {app.file ? (
                        <a href={app.file} target="_blank" rel="noreferrer" className="file-link">View</a>
                      ) : '—'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">No past appointments</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;
