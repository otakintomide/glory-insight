import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env') });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const GCAT_TOKEN = '0x47318Ce01d3c447acA06A7bbBd25a35Ad1184D96';
const MORALIS_HOLDERS_URL = `https://deep-index.moralis.io/api/v2.2/erc20/${GCAT_TOKEN}/holders?chain=bsc`;

/** Fetch total holders from Moralis holder summary endpoint */
async function fetchHolderCount(apiKey: string): Promise<number | null> {
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

/** Proxy /api/holders to Moralis /holders (API key never sent to client) */
function moralisHoldersProxy() {
  return {
    name: 'moralis-holders-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = req.url?.split('?')[0];
        if (path !== '/api/holders' && path !== '/api/holders/') {
          return next();
        }
        const apiKey = process.env.MORALIS_API_KEY;
        if (!apiKey) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ totalHolders: null }));
          return;
        }
        try {
          const count = await fetchHolderCount(apiKey);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({ totalHolders: count }));
        } catch {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ totalHolders: null }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), moralisHoldersProxy()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: false,
  },
});
