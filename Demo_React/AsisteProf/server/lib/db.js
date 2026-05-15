// server/lib/db.ts
import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database('escuela.db');

// Creamos las tablas si no existen
db.exec(`
  CREATE TABLE IF NOT EXISTS grupos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS estudiantes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    grupo_id INTEGER,
    FOREIGN KEY(grupo_id) REFERENCES grupos(id)
  );

  CREATE TABLE IF NOT EXISTS asistencia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    estudiante_id INTEGER,
    fecha TEXT NOT NULL,
    presente INTEGER, 
    FOREIGN KEY(estudiante_id) REFERENCES estudiantes(id)
  );
`);

export default db;