const express = require("express");
const morgan = require("morgan"); // Importa el módulo morgan (para el registro de solicitudes)
const cors = require("cors")

// Importamos las rutas
const clienteRoutes = require("./routes/client.routes");
const tipoEquipoRoutes = require("./routes/equipmentType.routes");
const equipoRoutes = require("./routes/equipment.routes");
const tipoPedidoRoutes = require("./routes/orderType.routes");
const tipoUsuarioRoutes = require("./routes/userType.routes");
const usuarioRoutes = require("./routes/user.routes");
const pedidoRoutes = require("./routes/order.routes");
const detallePedidoRoutes = require("./routes/orderDetail.routes");

const app = express();

app.use(express.json()); // Habilita el middleware para analizar datos JSON en las solicitudes
app.use(morgan("dev")); //Sirve para ver las peticiones que se le hacen al servidor
app.use(cors());

app.use(clienteRoutes); //Utilizamos las rutas del CRUD de clientes
app.use(tipoEquipoRoutes); //Utilizamos las rutas del CRUD de tipo de equipos
app.use(equipoRoutes); //Utilizamos las rutas del CRUD de equipos
app.use(tipoPedidoRoutes); //Utilizamos las rutas del CRUD de tipo de pedidos
app.use(tipoUsuarioRoutes); //Utilizamos las rutas del CRUD de tipo de usuarios
app.use(usuarioRoutes); //Utilizamos las rutas del CRUD de usuarios
app.use(pedidoRoutes); //Utilizamos las rutas del CRUD de pedidos
app.use(detallePedidoRoutes); //Utilizamos las rutas del CRUD de pedidos


module.exports = app;
