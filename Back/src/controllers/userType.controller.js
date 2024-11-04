const TipoUsuario = require("../models/UserType.js");

const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "El nombre del tipo del usuario es requerido.",
  USER_TYPE_NOT_FOUND: "Tipo de usuario no encontrado.",
  USER_TYPE_ALREADY_EXISTS: "El nombre del tipo de usuario ya existe.",
  CREATION_ERROR: "Error al crear el tipo de usuario.",
  RETRIEVAL_ERROR: "Error al consultar el tipo de usuario.",
  UPDATE_ERROR: "Error al actualizar el tipo de usuario.",
  DELETE_ERROR: "Error al eliminar el tipo de usuario.",
};

const handleError = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message });
};

const validateField = (field) => {
  return field !== undefined && field !== null && field !== "";
};

const crearTipoUsuario = async (req, res) => {
  const { nombreTipoUsuario } = req.body;

  if (!validateField(nombreTipoUsuario)) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const tipoUsuarioNuevo = await TipoUsuario.crear(nombreTipoUsuario);

    res.status(201).json({
      message: "El tipo de usuario se creó con éxito",
      tipoUsuarioId: tipoUsuarioNuevo.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      handleError(res, 400, ERROR_MESSAGES.USER_TYPE_ALREADY_EXISTS, error);
    } else {
      handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
    }
  }
};

const consultarTipoUsuario = async (req, res) => {
  try {
    const tiposUsuarios = await TipoUsuario.obtenerTodos();
    res.status(200).json(tiposUsuarios);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

const consultarUnTipoUsuario = async (req, res) => {
  const { idTipoUsuario } = req.params;

  if (!validateField(idTipoUsuario)) {
    return res
      .status(400)
      .json({ message: "El ID del tipo de usuario es requerido." });
  }

  try {
    const tipoUsuario = await TipoUsuario.obtenerPorId(idTipoUsuario);

    if (tipoUsuario.length === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.USER_TYPE_NOT_FOUND });
    }

    res.status(200).json(tipoUsuario[0]);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

const actualizarTipoUsuario = async (req, res) => {
  const idTipoUsuario = req.params.id;
  const { nombreTipoUsuario } = req.body;

  if (!validateField(nombreTipoUsuario)) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const tipoUsuarioActualizado = await TipoUsuario.actualizar(
      idTipoUsuario,
      nombreTipoUsuario
    );

    if (tipoUsuarioActualizado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.USER_TYPE_NOT_FOUND });
    }

    res.status(200).json({ message: "Tipo de usuario actualizado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
  }
};

const eliminarTipoUsuario = async (req, res) => {
  const idTipoUsuario = req.params.id;

  if (!validateField(idTipoUsuario)) {
    return res
      .status(400)
      .json({ message: "El ID del tipo de usuario es requerido." });
  }

  try {
    const tipoUsuarioEliminado = await TipoUsuario.eliminar(idTipoUsuario);

    if (tipoUsuarioEliminado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.USER_TYPE_NOT_FOUND });
    }

    res.status(200).json({ message: "Tipo de usuario eliminado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.DELETE_ERROR, error);
  }
};

module.exports = {
  crearTipoUsuario,
  consultarTipoUsuario,
  consultarUnTipoUsuario,
  actualizarTipoUsuario,
  eliminarTipoUsuario,
};
