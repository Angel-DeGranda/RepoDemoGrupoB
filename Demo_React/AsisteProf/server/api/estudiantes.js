import db from '../lib/db';

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === 'GET') {
    const query = getQuery(event);
    if (query.grupoId) {
      return db.prepare(`
        SELECT e.*, g.nombre as nombre_grupo
        FROM estudiantes e
        JOIN grupos g ON e.grupo_id = g.id
        WHERE e.grupo_id = ?
      `).all(query.grupoId);
    }
    return db.prepare(`
      SELECT e.*, g.nombre as nombre_grupo
      FROM estudiantes e
      JOIN grupos g ON e.grupo_id = g.id
    `).all();
  }

  if (method === 'POST') {
    const body = await readBody(event); // { nombre: 'Juan', grupoId: 1 }
    const info = db.prepare('INSERT INTO estudiantes (nombre, grupo_id) VALUES (?, ?)').run(body.nombre, body.grupoId);
    return { id: info.lastInsertRowid };
  }
});