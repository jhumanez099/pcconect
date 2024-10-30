const express = require("express");
const { crearClientes, consultarClientes, consultarUnCliente, actualizarCliente, eliminarCliente } = require("../controllers/clients.controller.js");

const router = express.Router();

// Define la ruta para clientes
router.post("/clientes", crearClientes);
router.get("/clientes", consultarClientes);
router.get("/clientes/:nombreCliente", consultarUnCliente)
router.put("/clientes/:id", actualizarCliente)
router.delete("/clientes/:id", eliminarCliente)

module.exports = router;
