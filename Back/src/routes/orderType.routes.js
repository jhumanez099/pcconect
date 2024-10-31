const express = require("express");
const {
  crearTipoPedido,
  consultarTipoPedido,
  consultarUnTipoPedido,
  actualizarTipoPedido,
  eliminarTipoPedido,
} = require("../controllers/orderType.controller.js");
const e = require("express");

const router = express.Router();

// Define la ruta para clientes
router.post("/tiposPedidos", crearTipoPedido);
router.get("/tiposPedidos", consultarTipoPedido);
router.get("/tiposPedidos/:nombreTipoPedido", consultarUnTipoPedido);
router.put("/tiposPedidos/:id", actualizarTipoPedido);
router.delete("/tiposPedidos/:id", eliminarTipoPedido);

module.exports = router;
