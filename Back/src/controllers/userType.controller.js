const pool = require("../config/db.js");

// Mensajes de error comunes
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "El nombre del tipo del usuario es requerido.",
  USER_TYPE_NOT_FOUND: "Tipo de usuario no encontrado.",
  USER_TYPE_ALREADY_EXISTS: "El nombre del tipo de usuario ya existe.",
  CREATION_ERROR: "Error al crear el tipo de usuario.",
  RETRIEVAL_ERROR: "Error al consultar el tipo de usuario.",
  UPDATE_ERROR: "Error al actualizar el tipo de usuario.",
  DELETE_ERROR: "Error al eliminar el tipo de usuario.",
};

// Función para enviar respuestas de error
const handleError = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message });
};

// Controlador para crear clientes
const crearTipoUsuario = async (req, res) => {
  const { nombreTipoUsuario } = req.body;

  if (!nombreTipoUsuario) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [tipoUsuarioNuevo] = await pool.query(
      "INSERT INTO tipo_usuario(nombre_tipo_usuario) VALUES (?)",
      [nombreTipoUsuario]
    );

    res.status(201).json({
      message: "El tipo del usuario se creó con éxito",
      tipoUsuarioId: tipoUsuarioNuevo.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      handleError(
        res,
        400,
        ERROR_MESSAGES.USER_TYPE_ALREADY_EXISTS,
        error
      );
    } else {
      handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
    }
  }
};

// Controlador para consultar todos los clientes
const consultarTipoUsuario = async (req, res) => {
  try {
    const [tiposUsuarios] = await pool.query("SELECT * FROM tipo_usuario");
    res.status(200).json(tiposUsuarios);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para consultar un cliente específico
const consultarUnTipoUsuario = async (req, res) => {
  const { nombreTipoUsuario } = req.params;

  if (!nombreTipoUsuario) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [tipoUsuario] = await pool.query(
      "SELECT * FROM tipo_usuario WHERE nombre_tipo_usuario = ?",
      [nombreTipoUsuario]
    );

    if (tipoUsuario.length === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.USER_TYPE_NOT_FOUND });
    }

    res.status(200).json(tipoUsuario);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para actualizar un cliente
const actualizarTipoUsuario = async (req, res) => {
  const idTipoUsuario = req.params.id;
  const { nombreTipoUsuario } = req.body;

  if (!nombreTipoUsuario) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [tipoUsuarioActualizado] = await pool.query(
      "UPDATE tipo_usuario SET nombre_tipo_usuario = ? WHERE id_tipo_usuario = ?",
      [nombreTipoUsuario, idTipoUsuario]
    );

    if (tipoUsuarioActualizado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.USER_TYPE_NOT_FOUND });
    }

    res.status(200).json({ message: "Tipo del usuario actualizado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
  }
};

// Controlador para eliminar un cliente
const eliminarTipoUsuario = async (req, res) => {
  const idTipoUsuario = req.params.id;

  if (!idTipoUsuario) {
    return res
      .status(400)
      .json({ message: "El ID del tipo usuario es requerido." });
  }

  try {
    const [tipoUsuarioEliminado] = await pool.query(
      "DELETE FROM tipo_usuario WHERE id_tipo_usuario = ?",
      [idTipoUsuario]
    );

    if (tipoUsuarioEliminado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.USER_TYPE_NOT_FOUND });
    }

    res.status(200).json({ message: "Tipo del usuario eliminado con éxito." });
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
