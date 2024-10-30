const mysql = require('mysql2/promise')

// Crear un pool de conexiones
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "db_proyecto",
  password: "", // Añade tu contraseña aquí si es necesario
  waitForConnections: true, // Espera por conexiones disponibles
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0, // Sin límite en la cola de espera
});

// Exportar el pool
module.exports = pool;
