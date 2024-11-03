const pool = require("../config/db.js");

// Mensajes de error comunes
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "Todos los campos son obligatorios.",
  CLIENT_NOT_FOUND: "Cliente no encontrado.",
  CLIENT_ALREADY_EXISTS: "El nombre o correo del cliente ya existe.",
  CREATION_ERROR: "Error al crear el cliente.",
  RETRIEVAL_ERROR: "Error al consultar el cliente.",
  UPDATE_ERROR: "Error al actualizar el cliente.",
  DELETE_ERROR: "Error al eliminar el cliente.",
};

// Función para enviar respuestas de error
const handleError = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message });
};

// Función para validar campos no vacíos
const validateFields = (fields) => {
  return Object.values(fields).every(
    (field) => field !== undefined && field !== null && field !== ""
  );
};

// Controlador para crear clientes
const crearClientes = async (req, res) => {
  const fields = {
    nombreCliente: req.body.nombreCliente,
    direccionCliente: req.body.direccionCliente,
    telefonoCliente: req.body.telefonoCliente,
    correoCliente: req.body.correoCliente,
    estadoCliente: req.body.estadoCliente,
    encargadoCliente: req.body.encargadoCliente,
  };

  if (!validateFields(fields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [clienteNuevo] = await pool.query(
      "INSERT INTO clientes(nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente, estado_cliente, encargado_cliente) VALUES (?, ?, ?, ?, ?, ?)",
      Object.values(fields)
    );

    res.status(201).json({
      message: "El cliente se creó con éxito",
      clienteId: clienteNuevo.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      handleError(res, 400, ERROR_MESSAGES.CLIENT_ALREADY_EXISTS, error);
    } else {
      handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
    }
  }
};

// Controlador para consultar todos los clientes
const consultarClientes = async (req, res) => {
  try {
    const [clientes] = await pool.query("SELECT * FROM clientes");
    res.status(200).json(clientes);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para consultar un cliente específico por ID
const consultarUnCliente = async (req, res) => {
  const { idCliente } = req.params.id;

  if (!idCliente) {
    return res.status(400).json({ message: "El ID del cliente es requerido." });
  }

  try {
    const [cliente] = await pool.query(
      "SELECT * FROM clientes WHERE id_cliente = ?",
      [idCliente]
    );

    if (cliente.length === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    }

    res.status(200).json(cliente);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para actualizar un cliente
const actualizarCliente = async (req, res) => {
  const idCliente = req.params.id;
  const fields = {
    nombreCliente: req.body.nombreCliente,
    direccionCliente: req.body.direccionCliente,
    telefonoCliente: req.body.telefonoCliente,
    correoCliente: req.body.correoCliente,
    estadoCliente: req.body.estadoCliente,
    encargadoCliente: req.body.encargadoCliente,
  };

  if (!validateFields(fields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [clienteActualizado] = await pool.query(
      "UPDATE clientes SET nombre_cliente = ?, direccion_cliente = ?, telefono_cliente = ?, correo_cliente = ?, estado_cliente = ?, encargado_cliente = ? WHERE id_cliente = ?",
      [...Object.values(fields), idCliente]
    );

    if (clienteActualizado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    }

    res.status(200).json({ message: "Cliente actualizado con éxito." });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      handleError(res, 400, ERROR_MESSAGES.CLIENT_ALREADY_EXISTS, error);
    } else {
      handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
    }
  }
};

// Controlador para eliminar un cliente
const eliminarCliente = async (req, res) => {
  const idCliente = req.params.id;

  if (!idCliente) {
    return res.status(400).json({ message: "El ID del cliente es requerido." });
  }

  try {
    const [clienteEliminado] = await pool.query(
      "DELETE FROM clientes WHERE id_cliente = ?",
      [idCliente]
    );

    if (clienteEliminado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.CLIENT_NOT_FOUND });
    }

    res.status(200).json({ message: "Cliente eliminado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.DELETE_ERROR, error);
  }
};

module.exports = {
  crearClientes,
  consultarClientes,
  consultarUnCliente,
  actualizarCliente,
  eliminarCliente,
};
