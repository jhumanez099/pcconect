const pool = require("../config/db.js");

// Mensajes de error comunes
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "Todos los campos son obligatorios.",
  ORDER_DETAIL_NOT_FOUND: "Detalle del pedido no encontrado.",
  CREATION_ERROR: "Error al crear el detalle del pedido.",
  RETRIEVAL_ERROR: "Error al consultar el detalle del pedido.",
  UPDATE_ERROR: "Error al actualizar el detalle del pedido.",
  DELETE_ERROR: "Error al eliminar el detalle del pedido.",
};

// Función para enviar respuestas de error
const handleError = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message });
};

// Función para validar campos obligatorios
const validateFields = (fields) => {
  return fields.every(
    (field) => field !== undefined && field !== null && field !== ""
  );
};

// Controlador para crear detalle del pedido
const crearDetallePedido = async (req, res) => {
  const {
    pedido,
    equipo,
    cantidadDetallePedido,
    precioUnitarioDetallePedido,
    fechaInicioDetallePedido,
    fechaFinDetallePedido,
  } = req.body;
  const subtotalDetallePedido =
    cantidadDetallePedido * precioUnitarioDetallePedido;

  if (
    !validateFields([
      pedido,
      equipo,
      cantidadDetallePedido,
      precioUnitarioDetallePedido,
      fechaInicioDetallePedido,
      fechaFinDetallePedido,
    ])
  ) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [detallePedidoNuevo] = await pool.query(
      "INSERT INTO detalle_pedido(id_pedido, id_equipo, cantidad_detalle_pedido, precio_unitario_detalle_pedido, subtotal_detalle_pedido, fecha_inicio_detalle_pedido, fecha_fin_detalle_pedido) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        pedido,
        equipo,
        cantidadDetallePedido,
        precioUnitarioDetallePedido,
        subtotalDetallePedido,
        fechaInicioDetallePedido,
        fechaFinDetallePedido,
      ]
    );

    res.status(201).json({
      message: "El detalle del pedido se creó con éxito",
      detallePedidoId: detallePedidoNuevo.insertId,
    });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.CREATION_ERROR, error);
  }
};

// Controlador para consultar todos los detalles de los pedidos
const consultarDetallesPedidos = async (req, res) => {
  try {
    const [detallesPedidos] = await pool.query(
      `SELECT 
        d.*, e.nombre_equipo 
      FROM detalle_pedido d 
      JOIN equipos e ON d.id_equipo = e.id_equipo`
    );
    res.status(200).json(detallesPedidos);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para consultar un detalle del pedido específico
const consultarUnDetallePedido = async (req, res) => {
  const { idDetallePedido } = req.params.id;

  if (!idDetallePedido) {
    return res
      .status(400)
      .json({ message: "El ID del detalle del pedido es requerido." });
  }

  try {
    const [detallePedido] = await pool.query(
      `SELECT 
        d.*, e.nombre_equipo 
      FROM detalle_pedido d 
      JOIN equipos e ON d.id_equipo = e.id_equipo WHERE d.id_detalle_pedido = ?`,
      [idDetallePedido]
    );

    if (detallePedido.length === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.ORDER_DETAIL_NOT_FOUND });
    }

    res.status(200).json(detallePedido);
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.RETRIEVAL_ERROR, error);
  }
};

// Controlador para actualizar un detalle del pedido
const actualizarDetallePedido = async (req, res) => {
  const idDetallePedido = req.params.id;
  const {
    pedido,
    equipo,
    cantidadDetallePedido,
    precioUnitarioDetallePedido,
    fechaInicioDetallePedido,
    fechaFinDetallePedido,
  } = req.body;
  const subtotalDetallePedido =
    cantidadDetallePedido * precioUnitarioDetallePedido;

  if (
    !validateFields([
      pedido,
      equipo,
      cantidadDetallePedido,
      precioUnitarioDetallePedido,
      fechaInicioDetallePedido,
      fechaFinDetallePedido,
    ])
  ) {
    return res.status(400).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
  }

  try {
    const [detallePedidoActualizado] = await pool.query(
      "UPDATE detalle_pedido SET id_pedido = ?, id_equipo = ?, cantidad_detalle_pedido = ?, precio_unitario_detalle_pedido = ?, subtotal_detalle_pedido = ?, fecha_inicio_detalle_pedido = ?, fecha_fin_detalle_pedido = ? WHERE id_detalle_pedido = ?",
      [
        pedido,
        equipo,
        cantidadDetallePedido,
        precioUnitarioDetallePedido,
        subtotalDetallePedido,
        fechaInicioDetallePedido,
        fechaFinDetallePedido,
        idDetallePedido,
      ]
    );

    if (detallePedidoActualizado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.ORDER_DETAIL_NOT_FOUND });
    }

    res
      .status(200)
      .json({ message: "Detalle del pedido actualizado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.UPDATE_ERROR, error);
  }
};

// Controlador para eliminar un detalle del pedido
const eliminarDetallePedido = async (req, res) => {
  const idDetallePedido = req.params.id;

  if (!idDetallePedido) {
    return res
      .status(400)
      .json({ message: "El ID del detalle del pedido es requerido." });
  }

  try {
    const [detallePedidoEliminado] = await pool.query(
      "DELETE FROM detalle_pedido WHERE id_detalle_pedido = ?",
      [idDetallePedido]
    );

    if (detallePedidoEliminado.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.ORDER_DETAIL_NOT_FOUND });
    }

    res
      .status(200)
      .json({ message: "Detalle del pedido eliminado con éxito." });
  } catch (error) {
    handleError(res, 500, ERROR_MESSAGES.DELETE_ERROR, error);
  }
};

module.exports = {
  crearDetallePedido,
  consultarDetallesPedidos,
  consultarUnDetallePedido,
  actualizarDetallePedido,
  eliminarDetallePedido,
};
