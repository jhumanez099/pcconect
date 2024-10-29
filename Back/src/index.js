import app from "./app.js";
import pool from "./db.js";

// app.get("/", async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM clientes");
//     console.log(res.json(rows))
//   } catch (error) {
//     console.error("Error al ejecutar la consulta:", error);
//     res.status(500).send("Error en el servidor");
//   }
// });

app.listen(3000)
console.log('Servidor escuchando en el puerto', 3000);
