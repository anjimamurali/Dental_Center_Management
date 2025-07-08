
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import PatientDashboard from './components/PatientDashboard';
import PrivateRoute from './components/PrivateRoute';
import Authpage from './components/Authpage';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import AppointmentCalendar from './components/AppointmentCalendar';
import AdminAppointments from './Pages/AdminAppointments';






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authpage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/admin/patients" element={<Patients />} />
        <Route path='/admin/Appointments' element={<Appointments />} />
        <Route path="/calendar" element={<AppointmentCalendar />} />
        <Route path="/calendar"element={
        <PrivateRoute userRole="admin">
           <AppointmentCalendar />
            </PrivateRoute>
        }/>
        <Route path="/admin/appointments/calendar" element={<AdminAppointments />} />
        <Route path="/admin/appointments" element={<AdminAppointments />} />

        


      </Routes>
    </Router>
  );
}

export default App;
