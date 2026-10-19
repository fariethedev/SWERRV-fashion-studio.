import { createServer } from 'node:http';
import { URL } from 'node:url';
import { LOOKS } from './data.js';

const PORT = Number(process.env.PORT || 8787);

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(payload));
}

function filterLooks(url) {
  const category = url.searchParams.get('category');
  const query = (url.searchParams.get('q') || '').trim().toLowerCase();
  const sort = url.searchParams.get('sort') || 'featured';
  const filtered = LOOKS.filter((look) => {
    const matchesCategory = !category || category === 'All' || look.category === category;
    const searchableText = [look.title, look.category, look.mood, look.medium, ...look.tags].join(' ').toLowerCase();
    return matchesCategory && (!query || searchableText.includes(query));
  });

  return filtered.sort((first, second) => {
    if (sort === 'newest') return Number(second.year) - Number(first.year);
    if (sort === 'alphabetical') return first.title.localeCompare(second.title);
    return first.number - second.number;
  });
}

const server = createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Origin': '*',
    });
    response.end();
    return;
  }

  if (request.method !== 'GET') {
    sendJson(response, 405, { error: 'This mock API is read-only. Use GET requests only.' });
    return;
  }

  if (url.pathname === '/health') {
    sendJson(response, 200, { status: 'ok', service: 'swerrv-mock-api', mode: 'read-only' });
    return;
  }

  if (url.pathname === '/api/looks') {
    const data = filterLooks(url);
    sendJson(response, 200, { data, count: data.length, total: LOOKS.length, source: 'fictional sample catalogue' });
    return;
  }

  const lookMatch = url.pathname.match(/^\/api\/looks\/([^/]+)$/);
  if (lookMatch) {
    const look = LOOKS.find((item) => item.id === decodeURIComponent(lookMatch[1]));
    if (!look) {
      sendJson(response, 404, { error: 'Look not found' });
      return;
    }
    sendJson(response, 200, { data: look, source: 'fictional sample catalogue' });
    return;
  }

  sendJson(response, 404, { error: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`SWERRV mock API listening at http://localhost:${PORT}`);
  console.log('Read-only routes: GET /health, GET /api/looks, GET /api/looks/:id');
});
