import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { enUS } from 'date-fns/locale';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AppointmentCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Admin access only
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user || user.role !== 'admin') {
      window.location.href = '/';
      return;
    }

    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const eventList = [];

    patients.forEach((patient) => {
      (patient.appointments || []).forEach((appt) => {
        const date = new Date(appt.datetime);
        eventList.push({
          title: `${patient.fullName}: ${appt.title}`,
          start: date,
          end: date,
          allDay: false,
          patient,
          appt,
        });
      });
    });

    setEvents(eventList);
  }, []);

  const handleSelectSlot = (slotInfo) => {
    const clickedDate = new Date(slotInfo.start).toDateString();
    const filtered = events.filter(
      (e) => new Date(e.start).toDateString() === clickedDate
    );
    setSelectedDate(clickedDate);
    setAppointments(filtered);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🗓️ Appointment Calendar (Admin Only)</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectSlot}
      />

      {selectedDate && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            📅 Appointments on {selectedDate}
          </h3>
          {appointments.length > 0 ? (
            <ul className="space-y-4">
              {appointments.map((e, index) => (
                <li key={index} className="border-b pb-2">
                  <p><strong>🧑 Patient:</strong> {e.patient.fullName}</p>
                  <p><strong>📌 Title:</strong> {e.appt.title}</p>
                  <p><strong>⏰ Time:</strong> {new Date(e.start).toLocaleTimeString()}</p>
                  <p><strong>💊 Treatment:</strong> {e.appt.treatment || 'Not yet updated'}</p>
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

export default AppointmentCalendar;

