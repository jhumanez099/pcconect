const pool = require("../config/db.js");

// Mensajes de error comunes
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "Todos los campos son obligatorios.",
  ORDER_NOT_FOUND: "Pedido no encontrado.",
  CREATION_ERROR: "Error al crear el pedido.",
  RETRIEVAL_ERROR: "Error al consultar el pedido.",
  UPDATE_ERROR: "Error al actualizar el pedido.",
  DELETE_ERROR: "Error al eliminar el pedido.",
};

// Función para enviar respuestas de error
const handleError = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message, error: error?.message });
};

// Función auxiliar para validar campos requeridos
const validateFields = (fields) => {
  return Object.values(fields).every(
    (field) => field !== undefined && field !== null && field !== ""
  );
};

// Controlador para crear pedido
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

  const {
    fechaPedido,
    fechaInicioPedido,
    fechaFinPedido,
    precioTotalPedido,
    estadoPedido,
    cliente,
    usuario,
    tipoPedido,
    motivoPedido,
  } = fields;

  try {
    const [pedidoNuevo] = await pool.query(
      "INSERT INTO pedidos(fecha_pedido, fecha_inicio_pedido, fecha_fin_pedido, precio_total_pedido, estado_pedido, id_cliente, id_usuario, id_tipo_pedido, motivo_pedido) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        fechaPedido,
        fechaInicioPedido,
        fechaFinPedido,
        precioTotalPedido,
        estadoPedido,
        cliente,
        usuario,
        tipoPedido,
        motivoPedido,
      ]
    );

    res
      .status(201)
      .json({
        message: "El pedido se creó con éxito",
        pedidoId: pedidoNuevo.insertId,
      });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
  }
};

// Controlador para consultar todos los pedidos
const consultarPedidos = async (req, res) => {
  try {
    const [pedidos] = await pool.query(`
      SELECT 
        p.id_pedido, p.fecha_pedido, p.fecha_inicio_pedido, p.fecha_fin_pedido, 
        p.precio_total_pedido, p.estado_pedido, p.id_cliente, p.id_usuario, 
        p.id_tipo_pedido, p.motivo_pedido, p.fecha_creacion_pedido, 
        p.fecha_actualizacion_pedido, c.nombre_cliente, u.nombre_usuario, 
        t.nombre_tipo_pedido 
      FROM pedidos p
      JOIN clientes c ON c.id_cliente = p.id_cliente
      JOIN usuarios u ON u.id_usuario = p.id_usuario
      JOIN tipo_pedido t ON t.id_tipo_pedido = p.id_tipo_pedido
    `);
    res.status(200).json(pedidos);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para consultar un pedido específico
const consultarUnPedido = async (req, res) => {
  const { idPedido } = req.params.id;

  if (!idPedido) {
    return res.status(400).json({ message: "El ID del pedido es requerido." });
  }

  try {
    const [pedido] = await pool.query(
      `
      SELECT 
        p.id_pedido, p.fecha_pedido, p.fecha_inicio_pedido, p.fecha_fin_pedido, 
        p.precio_total_pedido, p.estado_pedido, p.id_cliente, p.id_usuario, 
        p.id_tipo_pedido, p.motivo_pedido, p.fecha_creacion_pedido, 
        p.fecha_actualizacion_pedido, c.nombre_cliente, u.nombre_usuario, 
        t.nombre_tipo_pedido 
      FROM pedidos p
      JOIN clientes c ON c.id_cliente = p.id_cliente
      JOIN usuarios u ON u.id_usuario = p.id_usuario
      JOIN tipo_pedido t ON t.id_tipo_pedido = p.id_tipo_pedido
      WHERE p.id_pedido = ?
      LIMIT 1
    `,
      [idPedido]
    );

    if (pedido.length === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.ORDER_NOT_FOUND });
    }

    res.status(200).json(pedido[0]);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para actualizar un pedido
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

  const {
    fechaPedido,
    fechaInicioPedido,
    fechaFinPedido,
    precioTotalPedido,
    estadoPedido,
    cliente,
    usuario,
    tipoPedido,
    motivoPedido,
  } = fields;

  try {
    const [pedidoActualizado] = await pool.query(
      "UPDATE pedidos SET fecha_pedido = ?, fecha_inicio_pedido = ?, fecha_fin_pedido = ?, precio_total_pedido = ?, estado_pedido = ?, id_cliente = ?, id_usuario = ?, id_tipo_pedido = ?, motivo_pedido = ? WHERE id_pedido = ?",
      [
        fechaPedido,
        fechaInicioPedido,
        fechaFinPedido,
        precioTotalPedido,
        estadoPedido,
        cliente,
        usuario,
        tipoPedido,
        motivoPedido,
        idPedido,
      ]
    );

    if (pedidoActualizado.affectedRows === 0) {
      return res.status(404).json({ message: ERROR_MESSAGES.ORDER_NOT_FOUND });
    }

    res.status(200).json({ message: "Pedido actualizado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
  }
};

// Controlador para eliminar un pedido
const eliminarPedido = async (req, res) => {
  const idPedido = req.params.id;

  if (!idPedido) {
    return res.status(400).json({ message: "El ID del pedido es requerido." });
  }

  try {
    const [pedidoEliminado] = await pool.query(
      "DELETE FROM pedidos WHERE id_pedido = ? LIMIT 1",
      [idPedido]
    );

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
