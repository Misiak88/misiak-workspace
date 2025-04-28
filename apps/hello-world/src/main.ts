/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { join } from 'path';

const app = express();
const port = process.env.PORT || 3333;

// serwujemy pliki z folderu `assets`
app.use(express.static(join(__dirname, 'assets')));

// dowolna ścieżka zwraca index.html (SPA-friendly)
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'assets', 'index.html'));
});

app.listen(port, () =>
  console.log(`🔥 Serwer static-site działa: http://localhost:${port}`)
);
