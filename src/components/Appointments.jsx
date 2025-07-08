import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Appointments.css';
import jsPDF from 'jspdf';

const Appointments = () => {
  const navigate = useNavigate(); 

  const handleGoBack = () => {
    navigate('/admin'); 
  };

  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    date: '',
    treatment: '',
    cost: '',
    status: '',
    nextDate: '',
    file: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('appointments'));
    if (!stored || stored.length === 0) {
      const sampleAppointments = [
        {
          id: 1,
          patientId: 'P001',
          title: 'Tooth Extraction',
          description: 'Upper left molar extraction',
          comments: 'Patient was anxious',
          date: new Date().toISOString(),
          treatment: 'Extraction with local anesthesia',
          cost: 1200,
          status: 'Completed',
          nextDate: '',
          file: ''
        },
        {
          id: 2,
          patientId: 'P002',
          title: 'Dental Cleaning',
          description: 'Routine cleaning appointment',
          comments: 'Plaque observed on lower teeth',
          date: new Date().toISOString(),
          treatment: 'Scaling and polishing',
          cost: 800,
          status: 'Completed',
          nextDate: '',
          file: ''
        },{
        id: 3,
        patientId: 'P003',
        title: 'Cavity Filling',
        description: 'Cavity on upper right molar',
        comments: 'Patient had sensitivity',
        date: new Date().toISOString(),
        treatment: 'Composite filling',
        cost: 1000,
        status: 'Ongoing',
        nextDate: '',
        file: ''
      },
      {
        id: 4,
        patientId: 'P004',
        title: 'Braces Consultation',
        description: 'Orthodontic evaluation',
        comments: 'Needs x-ray before start',
        date: new Date().toISOString(),
        treatment: 'Braces consultation and plan',
        cost: 500,
        status: 'Pending',
        nextDate: '',
        file: ''
      },
      {
        id: 5,
        patientId: 'P005',
        title: 'Root Canal',
        description: 'Severe toothache, lower right',
        comments: 'Tooth infected',
        date: new Date().toISOString(),
        treatment: 'Root canal therapy',
        cost: 3500,
        status: 'Ongoing',
        nextDate: '',
        file: ''
      },
      {
        id: 6,
        patientId: 'P006',
        title: 'Tooth Whitening',
        description: 'Cosmetic whitening',
        comments: 'Patient preparing for event',
        date: new Date().toISOString(),
        treatment: 'Bleaching with gel and light',
        cost: 1500,
        status: 'Completed',
        nextDate: '',
        file: ''
      },
      {
        id: 7,
        patientId: 'P007',
        title: 'Dental Implant',
        description: 'Missing lower molar',
        comments: 'Discussed payment options',
        date: new Date().toISOString(),
        treatment: 'Titanium implant procedure',
        cost: 8000,
        status: 'Pending',
        nextDate: '',
        file: ''
      },
      {
        id: 8,
        patientId: 'P008',
        title: 'Tooth Extraction',
        description: 'Decayed baby tooth',
        comments: 'Child was calm',
        date: new Date().toISOString(),
        treatment: 'Simple extraction',
        cost: 700,
        status: 'Completed',
        nextDate: '',
        file: ''
      },
      {
        id: 9,
        patientId: 'P009',
        title: 'Retainer Check',
        description: 'Post-braces retainer check',
        comments: 'Everything looks stable',
        date: new Date().toISOString(),
        treatment: 'Retainer adjustment',
        cost: 400,
        status: 'Completed',
        nextDate: '',
        file: ''
      },
      {
        id: 10,
        patientId: 'P010',
        title: 'Oral Surgery Review',
        description: 'Follow-up after cyst removal',
        comments: 'No complications',
        date: new Date().toISOString(),
        treatment: 'Surgical site examination',
        cost: 600,
        status: 'Ongoing',
        nextDate: '',
        file: ''
      },
    ];
      setAppointments(sampleAppointments);
      localStorage.setItem('appointments', JSON.stringify(sampleAppointments));
    } else {
      setAppointments(stored);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, file: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generateInvoice = (appointment) => {
    const doc = new jsPDF();
    const invoiceId = `INV-${Date.now()}`;

    doc.setFontSize(18);
    doc.text("Dental Center Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${invoiceId}`, 20, 30);
    doc.text(`Patient ID: ${appointment.patientId}`, 20, 40);
    doc.text(`Title: ${appointment.title}`, 20, 50);
    doc.text(`Date: ${new Date(appointment.date).toLocaleString()}`, 20, 60);
    doc.text(`Treatment: ${appointment.treatment}`, 20, 70);
    doc.text(`Cost: ₹${appointment.cost}`, 20, 80);
    doc.text(`Status: ${appointment.status}`, 20, 90);
    doc.text("Thank you for choosing our clinic!", 20, 110);

    doc.save(`${invoiceId}.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      ...form,
      id: Date.now()
    };
    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    generateInvoice(newAppointment);
    setShowModal(false);
    setForm({
      patientId: '',
      title: '',
      description: '',
      comments: '',
      date: '',
      treatment: '',
      cost: '',
      status: '',
      nextDate: '',
      file: ''
    });
  };

  return (
    <div className="appointments-container">
      <button onClick={handleGoBack} className="go-back-button">
        ← Back to Dashboard
      </button>

      <h2>📅 Dental Appointments</h2>
      <button onClick={() => setShowModal(true)} className="add-button">
        ➕ Add Appointment
      </button>

      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Cost</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id}>
              <td>{app.patientId}</td>
              <td>{app.title}</td>
              <td>{app.description}</td>
              <td>{new Date(app.date).toLocaleString()}</td>
              <td>{app.status}</td>
              <td>₹ {app.cost}</td>
              <td>
                {app.file ? (
                  <a href={app.file} target="_blank" rel="noreferrer">View</a>
                ) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit} className="form-grid">
              <h3>Add Appointment</h3>

              <input name="patientId" placeholder="Patient ID" value={form.patientId} onChange={handleChange} required />
              <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
              <textarea name="comments" placeholder="Comments" value={form.comments} onChange={handleChange} />
              <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
              <textarea name="treatment" placeholder="Treatment Details" value={form.treatment} onChange={handleChange} />
              <input name="cost" type="number" placeholder="Cost" value={form.cost} onChange={handleChange} />
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="">Select Status</option>
                <option>Completed</option>
                <option>Ongoing</option>
                <option>Cancelled</option>
              </select>
              <input name="nextDate" type="date" value={form.nextDate} onChange={handleChange} />
              <input name="file" type="file" accept="image/*,.pdf" onChange={handleChange} />

              <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="submit">Save & Generate Invoice</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
