// server/api/stats.js
import db from '../lib/db';

export default defineEventHandler(async (event) => {
  // Consulta SQL para obtener: Nombre, Total de Clases, y cuántas veces estuvo presente
  const stats = db.prepare(`
    SELECT 
      e.nombre,
      COUNT(a.id) as total_clases,
      SUM(CASE WHEN a.presente = 1 THEN 1 ELSE 0 END) as asistencias,
      SUM(CASE WHEN a.presente = 0 THEN 1 ELSE 0 END) as faltas
    FROM estudiantes e
    LEFT JOIN asistencia a ON e.id = a.estudiante_id
    GROUP BY e.id
  `).all();

  return stats;
});