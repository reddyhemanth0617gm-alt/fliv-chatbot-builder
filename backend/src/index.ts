
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

// --- Simple in-memory store (replace with DB calls) ---
const users: any[] = [];
const bots: any[] = [];

// --- Auth ---
app.post('/v1/auth/signup', (req, res) => {
  const { email, password, name } = req.body;
  // TODO: store hashed password in DB
  const user = { id: 'u_' + Date.now(), email, name };
  users.push(user);
  res.status(201).json({ id: user.id, email: user.email });
});

app.post('/v1/auth/login', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'User not found (in demo store).' });
  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// --- Middleware to validate JWT (demo) ---
function authMiddleware(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing auth' });
  const token = auth.split(' ')[1];
  try {
    const data: any = jwt.verify(token, JWT_SECRET);
    (req as any).user = data;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// --- Bot CRUD ---
app.get('/v1/bots', authMiddleware, (req, res) => {
  const userId = (req as any).user.sub;
  const list = bots.filter(b => b.owner === userId);
  res.json(list);
});

app.post('/v1/bots', authMiddleware, (req, res) => {
  const userId = (req as any).user.sub;
  const { name, description } = req.body;
  const bot = { id: 'bot_' + Date.now(), owner: userId, name, description, embedKey: 'embed_' + Date.now() };
  bots.push(bot);
  res.status(201).json(bot);
});

// --- Train endpoint (stub) ---
app.post('/v1/bots/:botId/train', authMiddleware, async (req, res) => {
  const { botId } = req.params;
  // TODO: accept file upload or URL; chunk -> embed -> store in vector DB
  console.log('Received train request for', botId);
  res.json({ status: 'started', botId });
});

// --- Chat endpoint ---
app.post('/v1/bots/:botId/chat', authMiddleware, async (req, res) => {
  const { botId } = req.params;
  const { message } = req.body;
  // For demo: call OpenAI completion if API key present
  if (!process.env.OPENAI_API_KEY) {
    return res.json({ response: 'OpenAI key not configured. This is a demo response.' });
  }
  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
        max_tokens: 500
      })
    });
    const data = (await resp.json()) as any; // 👈 tells TS to treat it as any
const text =
  (data?.choices && data.choices[0]?.message?.content) ||
  'No response generated.';
res.json({ response: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'LLM error' });
  }
});

// --- Widget endpoint (public) ---
app.post('/v1/widget/chat', async (req, res) => {
  const embedKey = req.headers['x-embed-key'];
  const { message } = req.body;
  // TODO: validate embed key and map to bot
  res.json({ response: `Public widget echo: ${message}` });
});

// --- Billing stub ---
app.post('/v1/billing/subscribe', authMiddleware, (req, res) => {
  const { planId } = req.body;
  // TODO: call Stripe to create checkout session
  res.json({ url: 'https://stripe.com/checkout-demo' });
});

// --- Analytics stub ---
app.get('/v1/analytics/usage', authMiddleware, (req, res) => {
  res.json({ messages_sent: 123, tokens_used: 4567 });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Fliv backend running on', PORT));
