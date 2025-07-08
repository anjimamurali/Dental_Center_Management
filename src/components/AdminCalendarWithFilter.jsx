import React, { useState } from 'react';
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isWithinInterval } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
});

const AdminCalendarWithFilter = ({ appointments }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  
  const filteredAppointments = appointments.filter(app => {
    if (!fromDate && !toDate) return true;
    const appDate = new Date(app.date);
    const from = fromDate ? new Date(fromDate) : new Date('1970-01-01');
    const to = toDate ? new Date(toDate) : new Date('2100-01-01');
    return isWithinInterval(appDate, { start: from, end: to });
  });

 
  const events = filteredAppointments.map(app => ({
    id: app.id,
    title: `${app.title} (Patient: ${app.patientId})`,
    start: new Date(app.date),
    end: new Date(app.date),
    allDay: false,
  }));

 
  const appointmentsForDay = selectedDate
    ? filteredAppointments.filter(
        app => new Date(app.date).toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <div style={{ padding: 20 }}>
      <h2>Appointments Calendar</h2>

      <div style={{ marginBottom: 20, display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label>
          From:{' '}
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label>
          To:{' '}
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>
        <button onClick={() => { setFromDate(''); setToDate(''); }}>Clear Filter</button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.WEEK]}
        defaultView={Views.MONTH}
        style={{ height: 500 }}
        selectable
        onSelectSlot={({ start }) => setSelectedDate(start)}
        onSelectEvent={(event) => alert(`Appointment: ${event.title}`)}
      />

      {selectedDate && (
        <div style={{ marginTop: 20 }}>
          <h3>Appointments on {selectedDate.toDateString()}</h3>
          {appointmentsForDay.length > 0 ? (
            <ul>
              {appointmentsForDay.map(app => (
                <li key={app.id}>
                  <strong>{app.title}</strong> — Patient: {app.patientId} — Time: {new Date(app.date).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments scheduled for this day.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCalendarWithFilter;
