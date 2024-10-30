const pool = require("../db.js");

const crearClientes = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const {
    nombreCliente,
    direccionCliente,
    telefonoCliente,
    correoCliente,
    estadoCliente,
  } = req.body;

  // Validar que todos los campos estén presentes
  if (
    !nombreCliente ||
    !direccionCliente ||
    !telefonoCliente ||
    !correoCliente ||
    !estadoCliente
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // Ejecutar la consulta directamente
    const [clienteNuevo] = await pool.query(
      "INSERT INTO clientes(nombre_cliente, direccion_cliente, telefono_cliente, correo_cliente, estado_cliente) VALUES (?, ?, ?, ?, ?)",
      [
        nombreCliente,
        direccionCliente,
        telefonoCliente,
        correoCliente,
        estadoCliente,
      ]
    );

    console.log("Cliente creado correctamente");
    res
      .status(201)
      .json({
        message: "El cliente se creó con éxito",
        clienteId: clienteNuevo.insertId,
      });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res
        .status(400)
        .json({ message: "El nombre o correo del cliente ya existe" });
    } else {
      res.status(500).json({ message: "Error al crear el cliente" });
    }
  }
};

const consultarClientes = async (req, res) => {
  try {
    // Ejecuta la consulta directamente usando `await` sin `new Promise`
    const [clientes] = await pool.query("SELECT * FROM clientes");

    console.log("Clientes consultados correctamente");
    res.status(200).json(clientes);
  } catch (error) {
    console.error("Error al consultar los clientes:", error);
    res.status(500).json({ message: "Error al consultar los clientes" });
  }
};

const consultarUnCliente = async (req, res) => {
  const { nombreCliente } = req.params; // Cambiamos a params en lugar de body

  // Verificamos que el nombre del cliente esté presente
  if (!nombreCliente) {
    return res
      .status(400)
      .json({ message: "El nombre del cliente es requerido." });
  }

  try {
    const [cliente] = await pool.query(
      "SELECT * FROM clientes WHERE nombre_cliente = ?",
      [nombreCliente]
    );

    // Verificamos si se encontró un cliente
    if (cliente.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    console.log("Cliente consultado correctamente");
    res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al consultar el cliente:", error);
    res.status(500).json({ message: "Error al consultar el cliente" });
  }
};

const actualizarCliente = async (req, res) => {
  const idCliente = req.params.id; // Obtener el id directamente
  const {
    nombreCliente,
    direccionCliente,
    telefonoCliente,
    correoCliente,
    estadoCliente,
  } = req.body;

  // Validar que se envíen los datos necesarios
  if (
    !nombreCliente ||
    !direccionCliente ||
    !telefonoCliente ||
    !correoCliente ||
    !estadoCliente
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son requeridos." });
  }

  try {
    const [resultado] = await pool.query(
      "UPDATE clientes SET nombre_cliente = ?, direccion_cliente = ?, telefono_cliente = ?, correo_cliente = ?, estado_cliente = ? WHERE id_cliente = ?",
      [
        nombreCliente,
        direccionCliente,
        telefonoCliente,
        correoCliente,
        estadoCliente,
        idCliente,
      ]
    );

    // Verificar si se actualizó algún cliente
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    console.log("Cliente actualizado correctamente");
    res.status(200).json({ message: "Cliente actualizado con éxito." });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res.status(500).json({ message: "Error al actualizar el cliente" });
  }
};

const eliminarCliente = async (req, res) => {
  const idCliente = req.params.id;

  // Verificar que el idCliente esté presente
  if (!idCliente) {
    return res.status(400).json({ message: "El ID del cliente es requerido." });
  }

  try {
    const [resultado] = await pool.query(
      "DELETE FROM clientes WHERE id_cliente = ?",
      [idCliente]
    );

    // Verificar si se eliminó algún cliente
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    console.log("Cliente eliminado correctamente");
    res.status(200).json({ message: "Cliente eliminado con éxito." });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ message: "Error al eliminar el cliente" });
  }
};

module.exports = { crearClientes, consultarClientes, consultarUnCliente, actualizarCliente, eliminarCliente };
