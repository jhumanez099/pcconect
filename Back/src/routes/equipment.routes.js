const express = require("express");
const {
  crearEquipo,
  consultarEquipo,
  consultarUnEquipo,
  actualizarEquipo,
  eliminarEquipo,
} = require("../controllers/equipment.controller.js");

const router = express.Router();

// Define la ruta para clientes
router.post("/equipos", crearEquipo);
router.get("/equipos", consultarEquipo);
router.get("/equipos/:modeloEquipo", consultarUnEquipo);
router.put("/equipos/:id", actualizarEquipo);
router.delete("/equipos/:id", eliminarEquipo);

module.exports = router;
