const express = require("express");
const {
  crearTipoUsuario,
  consultarTipoUsuario,
  consultarUnTipoUsuario,
  actualizarTipoUsuario,
  eliminarTipoUsuario,
} = require("../controllers/userType.controller.js");
const e = require("express");

const router = express.Router();

// Define la ruta para clientes
router.post("/tiposUsuarios", crearTipoUsuario);
router.get("/tiposUsuarios", consultarTipoUsuario);
router.get("/tiposUsuarios/:nombreTipoUsuario", consultarUnTipoUsuario);
router.put("/tiposUsuarios/:id", actualizarTipoUsuario);
router.delete("/tiposUsuarios/:id", eliminarTipoUsuario);

module.exports = router;
