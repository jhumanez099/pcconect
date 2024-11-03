const pool = require("../config/db.js");

// Mensajes de error comunes
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "El nombre del tipo del pedido es requerido.",
  ORDER_TYPE_NOT_FOUND: "Tipo de pedido no encontrado.",
  ORDER_TYPE_ALREADY_EXISTS: "El nombre del tipo de pedido ya existe.",
  CREATION_ERROR: "Error al crear el tipo de pedido.",
  RETRIEVAL_ERROR: "Error al consultar el tipo de pedido.",
  UPDATE_ERROR: "Error al actualizar el tipo de pedido.",
  DELETE_ERROR: "Error al eliminar el tipo de pedido.",
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

// Controlador para crear tipo de pedido
const crearTipoPedido = async (req, res) => {
  const { nombreTipoPedido } = req.body;

  if (!validateFields({ nombreTipoPedido })) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [tipoPedidoNuevo] = await pool.query(
      "INSERT INTO tipo_pedido(nombre_tipo_pedido) VALUES (?)",
      [nombreTipoPedido]
    );

    res.status(201).json({
      message: "El tipo de pedido se creó con éxito",
      tipoPedidoId: tipoPedidoNuevo.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      handleError(res, 400, ERROR_MESSAGES.ORDER_TYPE_ALREADY_EXISTS, error);
    } else {
      handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
    }
  }
};

// Controlador para consultar todos los tipos de pedido
const consultarTipoPedido = async (req, res) => {
  try {
    const [tiposPedidos] = await pool.query("SELECT * FROM tipo_pedido");
    res.status(200).json(tiposPedidos);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para consultar un tipo de pedido específico
const consultarUnTipoPedido = async (req, res) => {
  const { idTipoPedido } = req.params.id;

  if (!idTipoPedido) {
    return res.status(400).json({ message: "El ID del tipo de pedido es requerido." });
  }

  try {
    const [tipoPedido] = await pool.query(
      "SELECT * FROM tipo_pedido WHERE id_tipo_pedido = ?",
      [idTipoPedido]
    );

    if (tipoPedido.length === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.ORDER_TYPE_NOT_FOUND });
    }

    res.status(200).json(tipoPedido);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para actualizar un tipo de pedido
const actualizarTipoPedido = async (req, res) => {
  const idTipoPedido = req.params.id;
  const { nombreTipoPedido } = req.body;

  if (!validateFields({ nombreTipoPedido })) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [tipoPedidoActualizado] = await pool.query(
      "UPDATE tipo_pedido SET nombre_tipo_pedido = ? WHERE id_tipo_pedido = ?",
      [nombreTipoPedido, idTipoPedido]
    );

    if (tipoPedidoActualizado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.ORDER_TYPE_NOT_FOUND });
    }

    res.status(200).json({ message: "Tipo de pedido actualizado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
  }
};

// Controlador para eliminar un tipo de pedido
const eliminarTipoPedido = async (req, res) => {
  const idTipoPedido = req.params.id;

  if (!idTipoPedido) {
    return res
      .status(400)
      .json({ message: "El ID del tipo de pedido es requerido." });
  }

  try {
    const [tipoPedidoEliminado] = await pool.query(
      "DELETE FROM tipo_pedido WHERE id_tipo_pedido = ?",
      [idTipoPedido]
    );

    if (tipoPedidoEliminado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.ORDER_TYPE_NOT_FOUND });
    }

    res.status(200).json({ message: "Tipo de pedido eliminado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.DELETE_ERROR, error);
  }
};

module.exports = {
  crearTipoPedido,
  consultarTipoPedido,
  consultarUnTipoPedido,
  actualizarTipoPedido,
  eliminarTipoPedido,
};
