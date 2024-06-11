import express from "express";
import cors from "cors";
import songsRoutes from './rutas/songRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.use(songsRoutes);

app.listen(PORT, console.log(`¡Servidor encendido en el puerto! ${PORT}`));