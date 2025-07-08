import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Patients.css';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients'));
    if (storedPatients && Array.isArray(storedPatients)) {
      setPatients(storedPatients);
    } else {
      const initialPatients = [
        { id: 1001, fullName: 'Alice', dob: '1992-04-12', contact: '9876543210', health: 'Cavity treatment ongoing' },
        { id: 1002, fullName: 'Anju', dob: '1985-09-25', contact: '9123456789', health: 'Root canal completed' },
        { id: 1003, fullName: 'Cathy', dob: '1997-11-03', contact: '7012345678', health: 'Braces check-up pending' },
        { id: 1004, fullName: 'Dinesh', dob: '2001-01-30', contact: '8080808080', health: 'Tooth extraction scheduled' },
        { id: 1005, fullName: 'Eva', dob: '1990-06-15', contact: '9009009009', health: 'Teeth cleaning done' },
        { id: 1006, fullName: 'Anvi', dob: '2004-04-25', contact: '3698521470', health: 'Teeth cleaning scheduled' },
        { id: 1007, fullName: 'Aadhi', dob: '2000-07-30', contact: '9874563217', health: 'Braces check-up pending' },
      ];
      setPatients(initialPatients);
      localStorage.setItem('patients', JSON.stringify(initialPatients));
    }
  }, []);
  

  const handleDelete = (id) => {
    const updated = patients.filter((p) => p.id !== id);
    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
  };

  const handleAdd = () => {
    const newPatient = {
      id: Date.now(),
      fullName: 'New Patient',
      dob: '2000-01-01',
      contact: '0000000000',
      health: 'No known issues',
    };
    const updated = [...patients, newPatient];
    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
  };

  const filteredPatients = patients.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toString().includes(search)
  );

  return (
    <div className="patients-container">
      <button
        onClick={() => navigate('/admin')}
        className="back-button"
        style={{
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 16px',
          marginBottom: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        ← Back to Dashboard
      </button>

      <h2>🧾 Patient Records</h2>

      <div className="patients-controls">
        <input
          type="text"
          placeholder="Search by Name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleAdd}>➕ Add Patient</button>
      </div>

      {filteredPatients.length > 0 ? (
        <table className="patients-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Patient ID</th>
              <th>DOB</th>
              <th>Contact</th>
              <th>Health Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p) => (
              <tr key={p.id}>
                <td>{p.fullName}</td>
                <td>{p.id}</td>
                <td>{p.dob}</td>
                <td>{p.contact}</td>
                <td>{p.health}</td>
                <td className="actions">
                  <button onClick={() => setSelectedPatient(p)}>👁️ View</button>
                  <button onClick={() => alert("Edit logic here")}>✏️ Edit</button>
                  <button onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients found.</p>
      )}

      {selectedPatient && (
        <div className="modal">
          <div className="modal-content">
            <h3>Patient Info</h3>
            <p><strong>Full Name:</strong> {selectedPatient.fullName}</p>
            <p><strong>DOB:</strong> {selectedPatient.dob}</p>
            <p><strong>Contact:</strong> {selectedPatient.contact}</p>
            <p><strong>Health Info:</strong> {selectedPatient.health}</p>
            <button onClick={() => setSelectedPatient(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
