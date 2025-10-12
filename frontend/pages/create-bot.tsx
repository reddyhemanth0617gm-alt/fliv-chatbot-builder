
import { useState } from 'react';

export default function CreateBot() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  async function create() {
    const token = localStorage.getItem('fliv_token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
      body: JSON.stringify({ name, description: '' })
    });
    if (res.ok) {
      setMsg('Bot created! Refresh the dashboard.');
    } else {
      setMsg('Error creating bot.');
    }
  }

  return (
    <div style={{ padding: 24, color: 'white', fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: 'linear-gradient(180deg,#0D1B2A,#1B263B)' }}>
      <h2 style={{ color: '#00B4D8' }}>Create New Bot</h2>
      <div style={{ marginTop: 12 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Bot name" style={{ padding: 8, borderRadius: 8 }} />
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={create} style={{ background: '#00B4D8', padding: '8px 12px', borderRadius: 8 }}>Create</button>
      </div>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </div>
  )
}
