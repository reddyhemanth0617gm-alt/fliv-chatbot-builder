
export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: 'Inter, sans-serif', background: 'linear-gradient(180deg,#0D1B2A,#1B263B)', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ color: '#00B4D8' }}>Fliv Chatbot Builder</h1>
      <p>Welcome — this is a starter Next.js frontend. Use the dashboard to create bots and grab embed codes.</p>
      <a href="/dashboard" style={{ color: '#00B4D8' }}>Go to Dashboard</a>
    </main>
  )
}
