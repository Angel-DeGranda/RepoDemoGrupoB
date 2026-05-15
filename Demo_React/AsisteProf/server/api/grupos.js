import db from '../lib/db';

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === 'GET') {
    return db.prepare('SELECT * FROM grupos').all();
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const info = db.prepare('INSERT INTO grupos (nombre) VALUES (?)').run(body.nombre);
    return { id: info.lastInsertRowid, nombre: body.nombre };
  }
});