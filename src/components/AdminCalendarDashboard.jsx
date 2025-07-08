import { useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const AdminCalendarDashboard = ({ appointments, patients }) => {
  const [selectedDayAppointments, setSelectedDayAppointments] = useState([]);

  const events = useMemo(() => {
    return appointments.map((a) => ({
      id: a.id,
      title: `${a.title} (${a.patientId})`,
      start: new Date(a.date),
      end: new Date(a.date),
      allDay: false,
    }));
  }, [appointments]);

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = new Date(slotInfo.start);
    const selectedDay = selectedDate.toDateString();

    const filtered = appointments.filter((a) => {
      const appDate = new Date(a.date).toDateString();
      return appDate === selectedDay;
    });

    setSelectedDayAppointments(filtered);
  };

  return (
    <div>
      <h3>📅 Calendar View</h3>
      <div style={{ height: '350px', marginBottom: '1.5 rem' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectSlot}
        />
      </div>

      {selectedDayAppointments.length > 0 && (
        <div>
          <h4>🗓️ Appointments on {new Date(selectedDayAppointments[0].date).toDateString()}</h4>
          <ul>
            {selectedDayAppointments.map((a) => {
              const patient = patients.find((p) => p.id === a.patientId);
              return (
                <li key={a.id}>
                  <strong>{a.title}</strong> - {a.treatment} <br />
                  Patient: {patient ? patient.fullName : a.patientId}, Time: {new Date(a.date).toLocaleTimeString()}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminCalendarDashboard;
