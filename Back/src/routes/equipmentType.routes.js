const express = require("express");
const {
  crearTipoEquipo,
  consultarTipoEquipo,
  consultarUnTipoEquipo,
  actualizarTipoEquipo,
  eliminarTipoEquipo,
} = require("../controllers/equipmentType.controller.js");
const e = require("express");

const router = express.Router();

// Define la ruta para clientes
router.post("/tiposEquipos", crearTipoEquipo);
router.get("/tiposEquipos", consultarTipoEquipo);
router.get("/tiposEquipos/:nombreTipoEquipo", consultarUnTipoEquipo);
router.put("/tiposEquipos/:id", actualizarTipoEquipo);
router.delete("/tiposEquipos/:id", eliminarTipoEquipo);

module.exports = router;
