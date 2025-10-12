
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [bots, setBots] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem('fliv_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bots`, {
        headers: { Authorization: token ? `Bearer ${token}` : '' }
      });
      if (res.ok) setBots(await res.json());
    }
    load();
  }, []);

  return (
    <div style={{ padding: 24, color: 'white', fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: 'linear-gradient(180deg,#0D1B2A,#1B263B)' }}>
      <h2 style={{ color: '#00B4D8' }}>Dashboard</h2>
      <div style={{ marginTop: 16 }}>
        <a href="/create-bot" style={{ color: '#fff', background: '#00B4D8', padding: '8px 12px', borderRadius: 8 }}>Create New Bot</a>
      </div>
      <div style={{ marginTop: 20 }}>
        {bots.length === 0 ? <p>No bots yet.</p> : (
          <ul>
            {bots.map(b => <li key={b.id}>{b.name} — <code style={{ color: '#00B4D8' }}>{b.embedKey}</code></li>)}
          </ul>
        )}
      </div>
    </div>
  )
}
