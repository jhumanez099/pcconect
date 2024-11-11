const Equipo = require("../models/Equipment.js");

const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "Todos los campos son obligatorios.",
  EQUIPMENT_NOT_FOUND: "Equipo no encontrado.",
  CREATION_ERROR: "Error al crear el equipo.",
  RETRIEVAL_ERROR: "Error al consultar el equipo.",
  UPDATE_ERROR: "Error al actualizar el equipo.",
  DELETE_ERROR: "Error al eliminar el equipo.",
};

const handleError = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message });
};

const validateFields = (fields) => {
  return Object.values(fields).every(
    (field) => field !== undefined && field !== null
  );
};

const crearEquipo = async (req, res) => {
  console.log(req.body.fechaCompraEquipo)
  const {
    nombreTipoEquipo,
    modeloEquipo,
    marcaEquipo,
    especificacionesEquipo,
    estadoEquipo,
    fechaCompraEquipo,
  } = req.body;

  const fields = {
    nombreTipoEquipo,
    modeloEquipo,
    marcaEquipo,
    especificacionesEquipo,
    estadoEquipo,
    fechaCompraEquipo,
  };

  if (!validateFields(fields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const equipoNuevo = await Equipo.crear(fields);
    res.status(201).json({
      message: "El equipo se creó con éxito",
      equipoId: equipoNuevo.insertId,
    });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
  }
};

const consultarEquipo = async (req, res) => {
  try {
    const equipos = await Equipo.obtenerTodos();
    res.status(200).json(equipos);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

const consultarUnEquipo = async (req, res) => {
  const { modeloEquipo } = req.params;

  if (!modeloEquipo) {
    return res.status(400).json({ message: "El modelo del equipo es requerido." });
  }

  try {
    const equipo = await Equipo.obtenerPorModelo(modeloEquipo);

    if (equipo.length === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.EQUIPMENT_NOT_FOUND });
    }

    res.status(200).json(equipo);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

const actualizarEquipo = async (req, res) => {
  const idEquipo = req.params.id;
  const {
    nombreTipoEquipo,
    modeloEquipo,
    marcaEquipo,
    estadoEquipo,
    fechaCompraEquipo,
  } = req.body;

  const fields = {
    nombreTipoEquipo,
    modeloEquipo,
    marcaEquipo,
    estadoEquipo,
    fechaCompraEquipo,
  };

  if (!validateFields(fields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const equipoActualizado = await Equipo.actualizar(idEquipo, fields);

    if (equipoActualizado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.EQUIPMENT_NOT_FOUND });
    }

    res.status(200).json({ message: "Equipo actualizado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
  }
};

const eliminarEquipo = async (req, res) => {
  const idEquipo = req.params.id;

  if (!idEquipo) {
    return res.status(400).json({ message: "El ID del equipo es requerido." });
  }

  try {
    const equipoEliminado = await Equipo.eliminar(idEquipo);

    if (equipoEliminado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.EQUIPMENT_NOT_FOUND });
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
