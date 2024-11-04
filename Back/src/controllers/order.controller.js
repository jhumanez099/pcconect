const Pedido = require("../models/Order.js");

const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "Todos los campos son obligatorios.",
  ORDER_NOT_FOUND: "Pedido no encontrado.",
  CREATION_ERROR: "Error al crear el pedido.",
  RETRIEVAL_ERROR: "Error al consultar el pedido.",
  UPDATE_ERROR: "Error al actualizar el pedido.",
  DELETE_ERROR: "Error al eliminar el pedido.",
};

const handleError = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message, error: error?.message });
};

const validateFields = (fields) => {
  return Object.values(fields).every(
    (field) => field !== undefined && field !== null && field !== ""
  );
};

const crearPedidos = async (req, res) => {
  const fields = {
    fechaPedido: req.body.fechaPedido,
    fechaInicioPedido: req.body.fechaInicioPedido,
    fechaFinPedido: req.body.fechaFinPedido,
    precioTotalPedido: req.body.precioTotalPedido,
    estadoPedido: req.body.estadoPedido,
    cliente: req.body.cliente,
    usuario: req.body.usuario,
    tipoPedido: req.body.tipoPedido,
    motivoPedido: req.body.motivoPedido,
  };

  if (!validateFields(fields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const pedidoNuevo = await Pedido.crear(fields);
    res.status(201).json({
      message: "El pedido se creó con éxito",
      pedidoId: pedidoNuevo.insertId,
    });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
  }
};

const consultarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.obtenerTodos();
    res.status(200).json(pedidos);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

const consultarUnPedido = async (req, res) => {
  const { idPedido } = req.params;

  if (!idPedido) {
    return res.status(400).json({ message: "El ID del pedido es requerido." });
  }

  try {
    const pedido = await Pedido.obtenerPorId(idPedido);

    if (pedido.length === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.ORDER_NOT_FOUND });
    }

    res.status(200).json(pedido[0]);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

const actualizarPedido = async (req, res) => {
  const idPedido = req.params.id;
  const fields = {
    fechaPedido: req.body.fechaPedido,
    fechaInicioPedido: req.body.fechaInicioPedido,
    fechaFinPedido: req.body.fechaFinPedido,
    precioTotalPedido: req.body.precioTotalPedido,
    estadoPedido: req.body.estadoPedido,
    cliente: req.body.cliente,
    usuario: req.body.usuario,
    tipoPedido: req.body.tipoPedido,
    motivoPedido: req.body.motivoPedido,
  };

  if (!validateFields(fields)) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const pedidoActualizado = await Pedido.actualizar(idPedido, fields);

    if (pedidoActualizado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.ORDER_NOT_FOUND });
    }

    res.status(200).json({ message: "Pedido actualizado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
  }
};

const eliminarPedido = async (req, res) => {
  const idPedido = req.params.id;

  if (!idPedido) {
    return res.status(400).json({ message: "El ID del pedido es requerido." });
  }

  try {
    const pedidoEliminado = await Pedido.eliminar(idPedido);

    if (pedidoEliminado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.ORDER_NOT_FOUND });
    }

    res.status(200).json({ message: "Pedido eliminado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.DELETE_ERROR, error);
  }
};

module.exports = {
  crearPedidos,
  consultarPedidos,
  consultarUnPedido,
  actualizarPedido,
  eliminarPedido,
};
