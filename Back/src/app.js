const express = require("express");
const morgan = require("morgan"); // Importa el módulo morgan (para el registro de solicitudes)

const clientes_routes = require("./routes/clients.routes");

const app = express();

app.use(express.json()); // Habilita el middleware para analizar datos JSON en las solicitudes
app.use(morgan("dev")); //Sirve para ver las peticiones que se le hacen al servidor

app.use(clientes_routes);

module.exports = app;
