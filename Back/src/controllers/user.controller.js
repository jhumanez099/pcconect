const pool = require("../config/db.js");

// Mensajes de error comunes
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "Todos los campos son obligatorios.",
  USER_NOT_FOUND: "Usuario no encontrado.",
  USER_ALREADY_REGISTERED: "El correo del usuario ya está registrado.",
  CREATION_ERROR: "Error al crear el usuario.",
  RETRIEVAL_ERROR: "Error al consultar el usuario.",
  UPDATE_ERROR: "Error al actualizar el usuario.",
  DELETE_ERROR: "Error al eliminar el usuario.",
};

// Función para enviar respuestas de error
const handleError = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message });
};

// Función de validación de campos obligatorios
const validateFields = (fields) => {
  return Object.values(fields).every(
    (field) => field !== undefined && field !== null && field !== ""
  );
};

// Controlador para crear usuario
const crearUsuario = async (req, res) => {
  const {
    nombreUsuario,
    tipoUsuario,
    correoUsuario,
    contraseñaUsuario,
    telefonoUsuario,
    cargoUsuario,
    estadoUsuario,
  } = req.body;

  if (
    !validateFields({
      nombreUsuario,
      tipoUsuario,
      correoUsuario,
      contraseñaUsuario,
      telefonoUsuario,
      cargoUsuario,
      estadoUsuario,
    })
  ) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [usuarioNuevo] = await pool.query(
      "INSERT INTO usuarios(nombre_usuario, id_tipo_usuario, correo_usuario, contraseña_usuario, telefono_usuario, cargo_usuario, estado_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        nombreUsuario,
        tipoUsuario,
        correoUsuario,
        contraseñaUsuario,
        telefonoUsuario,
        cargoUsuario,
        estadoUsuario,
      ]
    );

    res.status(201).json({
      message: "El usuario se creó con éxito",
      usuarioId: usuarioNuevo.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      handleError(res, 400, ERROR_MESSAGES.USER_ALREADY_REGISTERED, error);
    } else {
      handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
    }
  }
};

// Controlador para consultar todos los usuarios
const consultarUsuarios = async (req, res) => {
  try {
    const [usuarios] = await pool.query("SELECT * FROM usuarios");
    res.status(200).json(usuarios);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para consultar un usuario específico
const consultarUnUsuario = async (req, res) => {
  const { idUsuario } = req.params.id;

  if (!idUsuario) {
    return res
      .status(400)
      .json({ message: "El ID del usuario es requerido." });
  }

  try {
    const [usuario] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [idUsuario]
    );

    if (usuario.length === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    res.status(200).json(usuario);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para actualizar un usuario
const actualizarUsuario = async (req, res) => {
  const idUsuario = req.params.id;
  const {
    nombreUsuario,
    tipoUsuario,
    correoUsuario,
    contraseñaUsuario,
    telefonoUsuario,
    cargoUsuario,
    estadoUsuario,
  } = req.body;

  if (
    !validateFields({
      nombreUsuario,
      tipoUsuario,
      correoUsuario,
      contraseñaUsuario,
      telefonoUsuario,
      cargoUsuario,
      estadoUsuario,
    })
  ) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [usuarioActualizado] = await pool.query(
      "UPDATE usuarios SET nombre_usuario = ?, id_tipo_usuario = ?, correo_usuario = ?, contraseña_usuario = ?, telefono_usuario = ?, cargo_usuario = ?, estado_usuario = ? WHERE id_usuario = ?",
      [
        nombreUsuario,
        tipoUsuario,
        correoUsuario,
        contraseñaUsuario,
        telefonoUsuario,
        cargoUsuario,
        estadoUsuario,
        idUsuario,
      ]
    );

    if (usuarioActualizado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    res.status(200).json({ message: "Usuario actualizado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
  }
};

// Controlador para eliminar un usuario
const eliminarUsuario = async (req, res) => {
  const idUsuario = req.params.id;

  if (!idUsuario) {
    return res.status(400).json({ message: "El ID del usuario es requerido." });
  }

  try {
    const [usuarioEliminado] = await pool.query(
      "DELETE FROM usuarios WHERE id_usuario = ?",
      [idUsuario]
    );

    if (usuarioEliminado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    res.status(200).json({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.DELETE_ERROR, error);
  }
};

module.exports = {
  crearUsuario,
  consultarUsuarios,
  consultarUnUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
