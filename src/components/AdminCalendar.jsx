import { useMemo } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const AdminCalendar = ({ appointments }) => {
  const events = useMemo(() => {
    return appointments.map((a) => ({
      id: a.id,
      title: `${a.title} (${a.patientId})`,
      start: new Date(a.date),
      end: new Date(a.date),
      allDay: false,
    }));
  }, [appointments]);

  return (
    <div style={{ height: '600px', marginTop: '2rem' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        selectable
        onSelectEvent={(event) => alert(`Treatment: ${event.title}`)}
      />
    </div>
  );
};

export default AdminCalendar;
