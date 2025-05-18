import React, { useState, useEffect } from 'react';

function App() {
  const [cases, setCases] = useState([]);
  const [title, setTitle] = useState('');
  const [parties, setParties] = useState('');
  const [status, setStatus] = useState('Open');

  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [hearingDate, setHearingDate] = useState('');
  const [hearingDescription, setHearingDescription] = useState('');
  const [hearings, setHearings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/cases')
      .then(res => res.json())
      .then(data => setCases(data));

    fetch('http://localhost:5000/hearings')
      .then(res => res.json())
      .then(data => setHearings(data));
  }, []);

  const handleAddCase = () => {
    fetch('http://localhost:5000/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        parties: parties.split(',').map(p => p.trim()),
        status
      })
    })
      .then(res => res.json())
      .then(newCase => {
        setCases([...cases, newCase]);
        setTitle('');
        setParties('');
        setStatus('Open');
      });
  };

  const handleScheduleHearing = () => {
    fetch('http://localhost:5000/hearings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caseId: Number(selectedCaseId),
        date: hearingDate,
        description: hearingDescription
      })
    })
      .then(res => res.json())
      .then(newHearing => {
        setHearings([...hearings, newHearing]);
        setSelectedCaseId('');
        setHearingDate('');
        setHearingDescription('');
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Court Case Management</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <input
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          type="text"
          placeholder="Case Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          type="text"
          placeholder="Parties (comma-separated)"
          value={parties}
          onChange={e => setParties(e.target.value)}
        />
        <select
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        <button
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer'
          }}
          onClick={handleAddCase}
        >
          Add Case
        </button>
      </div>

      <h2 style={{ color: '#333' }}>Existing Cases</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cases.map(c => (
          <li
            key={c.id}
            style={{
              backgroundColor: '#f9f9f9',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          >
            <strong>{c.title}</strong> - {c.status} <br />
            <em>Parties: {c.parties.join(', ')}</em>
          </li>
        ))}
      </ul>

      <h2 style={{ color: '#333', marginTop: '40px' }}>Schedule Hearing</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        <select
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          value={selectedCaseId}
          onChange={e => setSelectedCaseId(e.target.value)}
        >
          <option value="">Select Case</option>
          {cases.map(c => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
        <input
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          type="date"
          value={hearingDate}
          onChange={e => setHearingDate(e.target.value)}
        />
        <input
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          type="text"
          placeholder="Hearing Description"
          value={hearingDescription}
          onChange={e => setHearingDescription(e.target.value)}
        />
        <button
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#28a745',
            color: '#fff',
            cursor: 'pointer'
          }}
          onClick={handleScheduleHearing}
        >
          Schedule Hearing
        </button>
      </div>

      <h2 style={{ color: '#333' }}>Scheduled Hearings</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {hearings.map(h => (
          <li
            key={h.id}
            style={{
              backgroundColor: '#f9f9f9',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          >
            Case ID: {h.caseId} <br />
            Date: {h.date} <br />
            Description: {h.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
