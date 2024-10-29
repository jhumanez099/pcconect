import express from "express"
import morgan from "morgan";

const app = express();

app.use(morgan('dev')); //Sirve para ver las peticiones que se le hacen al servidor


export default app;