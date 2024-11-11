const pool = require("../config/db.js");

const Equipo = {
  // Crear un equipo
  async crear(fields) {
    const query = `
      INSERT INTO 
        equipos(id_tipo_equipo, modelo_equipo, marca_equipo, especificaciones_equipo, estado_equipo, fecha_compra_equipo)
      VALUES 
        (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, Object.values(fields));
    return result;
  },

  // Consultar todos los equipos
  async obtenerTodos() {
    const query = `
      SELECT 
        e.*, te.* 
      FROM 
        equipos e 
      JOIN 
        tipo_equipo te ON te.id_tipo_equipo = e.id_tipo_equipo
    `;
    const [equipos] = await pool.query(query);
    return equipos;
  },

  // Consultar un equipo por modelo
  async obtenerPorModelo(modelo) {
    const query = `
      SELECT 
        e.*, te.*
      FROM 
        equipos e 
      JOIN 
        tipo_equipo te ON te.id_tipo_equipo = e.id_tipo_equipo 
      WHERE 
        e.modelo_equipo = ?
      LIMIT   
        1
    `;
    const [equipo] = await pool.query(query, [modelo]);
    return equipo;
  },

  // Actualizar un equipo
  async actualizar(id, fields) {
    const query = `
      UPDATE 
        equipos 
      SET 
        id_tipo_equipo = ?, modelo_equipo = ?, marca_equipo = ?, especificaciones_equipo = ?, estado_equipo = ?, fecha_compra_equipo = ?
      WHERE 
        id_equipo = ?
    `;
    const [result] = await pool.query(query, [...Object.values(fields), id]);
    return result;
  },

  // Eliminar un equipo
  async eliminar(id) {
    const query = "DELETE FROM equipos WHERE id_equipo = ? LIMIT 1";
    const [result] = await pool.query(query, [id]);
    return result;
  },
};

module.exports = Equipo;
