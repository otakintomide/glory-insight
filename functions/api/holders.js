/**
 * Cloudflare Pages Function — GET /api/holders
 * Set MORALIS_API_KEY in Pages project Settings → Environment variables.
 */
const GCAT_TOKEN = '0x47318Ce01d3c447acA06A7bbBd25a35Ad1184D96';
const MORALIS_HOLDERS_URL = `https://deep-index.moralis.io/api/v2.2/erc20/${GCAT_TOKEN}/holders?chain=bsc`;

export async function onRequestGet({ env }) {
  const apiKey = env.MORALIS_API_KEY;
  if (!apiKey) {
    return Response.json({ totalHolders: null });
  }
  try {
    const resp = await fetch(MORALIS_HOLDERS_URL, {
      headers: { 'X-API-Key': apiKey },
    });
    const data = await resp.json();
    if (!resp.ok || data?.message) {
      return Response.json({ totalHolders: null });
    }
    const total = data?.totalHolders;
    if (total == null || total === '') {
      return Response.json({ totalHolders: null });
    }
    const num = typeof total === 'string' ? parseInt(total, 10) : total;
    return Response.json({ totalHolders: Number.isNaN(num) ? null : num });
  } catch {
    return Response.json({ totalHolders: null });
  }
}
