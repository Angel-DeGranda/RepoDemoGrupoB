// server/api/asistencia/index.post.js
import db from '../../lib/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // { fecha: '2026-05-14', asistencias: [...] }
  
  const stmt = db.prepare('INSERT INTO asistencia (estudiante_id, fecha, presente) VALUES (?, ?, ?)');
  
  // Usamos una transacción para que sea ultra rápido
  const transaction = db.transaction((asistencias) => {
    for (const item of asistencias) {
      stmt.run(item.estudianteId, body.fecha, item.presente ? 1 : 0);
    }
  });

  transaction(body.asistencias);
  return { success: true };
});