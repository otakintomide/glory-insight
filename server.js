/**
 * Production server: serves static build + proxies /api/holders to Moralis.
 * Run: node server.js (after npm run build)
 * Requires: MORALIS_API_KEY in environment (.env)
 */
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const GCAT_TOKEN = '0x47318Ce01d3c447acA06A7bbBd25a35Ad1184D96';
const MORALIS_HOLDERS_URL = `https://deep-index.moralis.io/api/v2.2/erc20/${GCAT_TOKEN}/holders?chain=bsc`;

async function fetchHolderCount(apiKey) {
  const resp = await fetch(MORALIS_HOLDERS_URL, {
    headers: { 'X-API-Key': apiKey },
  });
  const data = await resp.json();

  if (!resp.ok || data?.message) {
    return null;
  }

  const total = data?.totalHolders;
  if (total == null || total === '') return null;
  const num = typeof total === 'string' ? parseInt(total, 10) : total;
  return isNaN(num) ? null : num;
}

const app = express();

app.get('/api/holders', async (_req, res) => {
  const apiKey = process.env.MORALIS_API_KEY;
  if (!apiKey) {
    return res.json({ totalHolders: null });
  }
  try {
    const count = await fetchHolderCount(apiKey);
    res.json({ totalHolders: count });
  } catch {
    res.json({ totalHolders: null });
  }
});

app.use(express.static(join(__dirname, 'dist')));
app.use((req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 4173;
app.listen(port);
