import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import AdminCalendarDashboard from '../components/AdminCalendarDashboard';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setPatients(storedPatients);
    setAppointments(storedAppointments);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const nextAppointments = [...appointments]
    .filter(a => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 10);

  const treatmentStats = appointments.reduce(
    (acc, a) => {
      if (a.status === 'Pending' || a.status === 'Ongoing') acc.pending++;
      else if (a.status === 'Completed') acc.completed++;
      return acc;
    },
    { pending: 0, completed: 0 }
  );

  const totalRevenue = appointments
    .filter(a => a.status === 'Completed')
    .reduce((sum, a) => sum + (Number(a.cost) || 0), 0);

  const patientCount = {};
  appointments.forEach(a => {
    patientCount[a.patientId] = (patientCount[a.patientId] || 0) + 1;
  });

  const topPatients = Object.entries(patientCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([patientId, count]) => {
      const patient = patients.find(p => p.id === patientId);
      return {
        patientId,
        name: patient ? patient.fullName : patientId,
        appointments: count,
      };
    });

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1>Welcome, Dr. {user?.username}</h1>
            <p>Your Dental Center Management Dashboard</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <section className="admin-cards">
        <div className="card" onClick={() => navigate('/admin/patients')}>
          <h2>Patients</h2>
          <p>Manage patient records and appointments</p>
        </div>
        <div className="card" onClick={() => navigate('/admin/appointments')}>
          <h2>Appointments</h2>
          <p>View and schedule dental appointments</p>
        </div>
        <div className="card">
          <h2>Treatment Records</h2>
          <p>Upload and review treatment files</p>
        </div>
      </section>

      <section className="dashboard-summary">
        <h2>Dashboard Summary</h2>

        <div className="dashboard-section">
          <h3>Appointments</h3>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {nextAppointments.length > 0 ? (
                nextAppointments.map(a => {
                  const patient = patients.find(p => p.id === a.patientId);
                  return (
                    <tr key={a.id}>
                      <td>{patient ? patient.fullName : a.patientId}</td>
                      <td>{a.title}</td>
                      <td>{new Date(a.date).toLocaleString()}</td>
                      <td>{a.status}</td>
                      <td>₹ {a.cost}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    No upcoming appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section">
          <h3>Top Patients </h3>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Number of Appointments</th>
              </tr>
            </thead>
            <tbody>
              {topPatients.length > 0 ? (
                topPatients.map(tp => (
                  <tr key={tp.patientId}>
                    <td>{tp.name}</td>
                    <td>{tp.appointments}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} style={{ textAlign: 'center' }}>
                    No patient data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section">
          <h3>Treatment Status</h3>
          <p>Pending / Ongoing: {treatmentStats.pending}</p>
          <p>Completed: {treatmentStats.completed}</p>
        </div>

        <div className="dashboard-section">
          <h3>Total Revenue</h3>
          <p>₹ {totalRevenue}</p>
        </div>

        <div className="dashboard-section">
          <AdminCalendarDashboard appointments={appointments} patients={patients} />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
