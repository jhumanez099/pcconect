const pool = require("../config/db.js");

// Mensajes de error comunes
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "El nombre del tipo del equipo es requerido.",
  EQUIPMET_TYPE_NOT_FOUND: "Tipo de equipo no encontrado.",
  EQUIPMENT_TYPE_ALREADY_EXISTS: "El nombre del tipo de equipo ya existe.",
  CREATION_ERROR: "Error al crear el tipo de equipo.",
  RETRIEVAL_ERROR: "Error al consultar el tipo de equipo.",
  UPDATE_ERROR: "Error al actualizar el tipo de equipo.",
  DELETE_ERROR: "Error al eliminar el tipo de equipo.",
};

// Función para enviar respuestas de error
const handleError = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message });
};

// Controlador para crear clientes
const crearTipoEquipo = async (req, res) => {
  const {
    nombreTipoEquipo
  } = req.body;

  if (
    !nombreTipoEquipo 
  ) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [tipoEquipoNuevo] = await pool.query(
      "INSERT INTO tipo_equipo(nombre_tipo_equipo) VALUES (?)",
      [
        nombreTipoEquipo
      ]
    );

    res.status(201).json({
      message: "El cliente se creó con éxito",
      tipoEquipoId: tipoEquipoNuevo.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      handleError(
        res,
        400,
        ERROR_MESSAGES.EQUIPMENT_TYPE_ALREADY_EXISTS,
        error
      );
    } else {
      handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
    }
  }
};

// Controlador para consultar todos los clientes
const consultarTipoEquipo = async (req, res) => {
  try {
    const [tiposEquipos] = await pool.query("SELECT * FROM tipo_equipo");
    res.status(200).json(tiposEquipos);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para consultar un cliente específico
const consultarUnTipoEquipo = async (req, res) => {
  const { nombreTipoEquipo } = req.params;

  if (!nombreTipoEquipo) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [tipoEquipo] = await pool.query(
      "SELECT * FROM tipo_equipo WHERE nombre_tipo_equipo = ?",
      [nombreTipoEquipo]
    );

    if (tipoEquipo.length === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.EQUIPMET_TYPE_NOT_FOUND });
    }

    res.status(200).json(tipoEquipo);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para actualizar un cliente
const actualizarTipoEquipo = async (req, res) => {
  const idTipoEquipo = req.params.id;
  const {
    nombreTipoEquipo
  } = req.body;

  if (
    !nombreTipoEquipo 
  ) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [tipoEquipoActualizado] = await pool.query(
      "UPDATE tipo_equipo SET nombre_tipo_equipo = ? WHERE id_tipo_equipo = ?",
      [
        nombreTipoEquipo,
        idTipoEquipo
      ]
    );

    if (tipoEquipoActualizado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.EQUIPMET_TYPE_NOT_FOUND });
    }

    res.status(200).json({ message: "Tipo del equipo actualizado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
  }
};

// Controlador para eliminar un cliente
const eliminarTipoEquipo = async (req, res) => {
  const idTipoEquipo = req.params.id;

  if (!idTipoEquipo) {
    return res.status(400).json({ message: "El ID del tipo equipo es requerido." });
  }

  try {
    const [tipoEquipoEliminado] = await pool.query(
      "DELETE FROM tipo_equipo WHERE id_tipo_equipo = ?",
      [idTipoEquipo]
    );

    if (tipoEquipoEliminado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.EQUIPMET_TYPE_NOT_FOUND });
    }

    res.status(200).json({ message: "Tipo del equipo eliminado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.DELETE_ERROR, error);
  }
};

module.exports = {
  crearTipoEquipo,
  consultarTipoEquipo,
  consultarUnTipoEquipo,
  actualizarTipoEquipo,
  eliminarTipoEquipo
};
