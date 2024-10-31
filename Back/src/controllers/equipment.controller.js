const pool = require("../config/db.js");

// Mensajes de error comunes
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "Todos los campos son obligatorios.",
  EQUIPMENT_NOT_FOUND: "Equipo no encontrado.",
  CREATION_ERROR: "Error al crear el equipo.",
  RETRIEVAL_ERROR: "Error al consultar el equipo.",
  UPDATE_ERROR: "Error al actualizar el equipo.",
  DELETE_ERROR: "Error al eliminar el equipo.",
};

// Función para enviar respuestas de error
const handleError = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message });
};

// Controlador para crear clientes
const crearEquipo = async (req, res) => {
  const {
    nombreTipoEquipo,
    modeloEquipo,
    marcaEquipo,
    estadoEquipo,
    fechaCompraEquipo
  } = req.body;

  if (
    !nombreTipoEquipo ||
    !modeloEquipo ||
    !marcaEquipo ||
    !estadoEquipo ||
    !fechaCompraEquipo
  ) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [equipoNuevo] = await pool.query(
      "INSERT INTO equipos(id_tipo_equipo, modelo_equipo, marca_equipo, estado_equipo, fecha_compra_equipo) VALUES (?, ?, ?, ?, ?)",
      [
        nombreTipoEquipo,
        modeloEquipo,
        marcaEquipo,
        estadoEquipo,
        fechaCompraEquipo,
      ]
    );

    res.status(201).json({
      message: "El equipo se creó con éxito",
      equipoId: equipoNuevo.insertId,
    });
  } catch (error) {
      handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
    }
  };

// Controlador para consultar todos los clientes
const consultarEquipo = async (req, res) => {
  try {
    const [equipos] = await pool.query("SELECT * FROM equipos e, tipo_equipo te WHERE te.id_tipo_equipo = e.id_tipo_equipo");
    res.status(200).json(equipos);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para consultar un cliente específico
const consultarUnEquipo = async (req, res) => {
  const { modeloEquipo } = req.params;

  if (!modeloEquipo) {
    return res
      .status(400)
      .json({ message: "El modelo del equipo es requerido." });
  }

  try {
    const [equipo] = await pool.query(
      "SELECT * FROM equipos e, tipo_equipo te WHERE te.id_tipo_equipo = e.id_tipo_equipo AND e.modelo_equipo = ?",
      [modeloEquipo]
    );

    if (equipo.length === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.EQUIPMENT_NOT_FOUND });
    }

    res.status(200).json(equipo);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para actualizar un cliente
const actualizarEquipo = async (req, res) => {
  const idEquipo = req.params.id;
  const {
    nombreTipoEquipo,
    modeloEquipo,
    marcaEquipo,
    estadoEquipo,
    fechaCompraEquipo
  } = req.body;

  if (
    !nombreTipoEquipo ||
    !modeloEquipo ||
    !marcaEquipo ||
    !estadoEquipo ||
    !fechaCompraEquipo
  ) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [equipoActualizado] = await pool.query(
      "UPDATE equipos SET id_tipo_equipo = ?, modelo_equipo = ?, marca_equipo = ?, estado_equipo = ?, fecha_compra_equipo = ? WHERE id_equipo = ?",
      [
        nombreTipoEquipo,
        modeloEquipo,
        marcaEquipo,
        estadoEquipo,
        fechaCompraEquipo,
        idEquipo,
      ]
    );

    if (equipoActualizado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.EQUIPMENT_NOT_FOUND });
    }

    res.status(200).json({ message: "Equipo actualizado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
  }
};

// Controlador para eliminar un cliente
const eliminarEquipo = async (req, res) => {
  const idEquipo = req.params.id;

  if (!idEquipo) {
    return res.status(400).json({ message: "El ID del equipo es requerido." });
  }

  try {
    const [equipoEliminado] = await pool.query(
      "DELETE FROM equipos WHERE id_equipo = ?",
      [idEquipo]
    );

    if (equipoEliminado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.EQUIPMENT_NOT_FOUND });
    }

    res.status(200).json({ message: "Equipo eliminado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.DELETE_ERROR, error);
  }
};

module.exports = {
  crearEquipo,
  consultarEquipo,
  consultarUnEquipo,
  actualizarEquipo,
  eliminarEquipo,
};
