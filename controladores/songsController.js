import fs from "fs";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getIndex = (req, res) => {
    try {
      res.sendFile(path.join(__dirname, '../index.html'));
    } catch (error) {
      res.status(500).json({ error: "Error al procesar la solicitud" });
      console.error("Error al procesar la solicitud:", error);
    }
  };
  
  const getAllSongs = (req, res) => {
      try {
        const canciones = JSON.parse(fs.readFileSync("repertorio.json",'utf8'));
        res.status(200).json(canciones);
      } catch (error) {
        res.status(500).json({ error: "Error al procesar la solicitud" });
        console.error("Error al procesar la solicitud:", error);
      }
    };
  
  
    const addNewSong = (req, res) => {
      try {
          
          const canciones = JSON.parse(fs.readFileSync('repertorio.json','utf8'));
          const cancion = req.body;
          // console.log(req)
          canciones.push(cancion);
          fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
          res.status(201).send("Cancion creada con exit!");
          
      } catch (error) {
          res.status(500).json({ error: "Error al procesar la solicitud" });
          console.error("Error al procesar la solicitud:", error);
      }
    }
  
    const editSong = (req, res) => {
      try {
          const { id } = req.params
  
          
          const cancion = req.body;
          const canciones = JSON.parse(fs.readFileSync('repertorio.json','utf8'));
          const index = canciones.findIndex(p => p.id == id)
          canciones[index] = cancion
          fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
          res.status(202).send("Cancion editada");
          
      } catch (error) {
          res.status(500).json({ error: "Error al procesar la solicitud" });
          console.error("Error al procesar la solicitud:", error);
      }
    }
  
    const deleteSong = (req, res) => {
      try {
          const { id } = req.params
          const canciones = JSON.parse(fs.readFileSync('repertorio.json','utf8'));
          const index = canciones.findIndex(p => p.id == id)
          canciones.splice(index, 1)
          fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
          res.status(203).send("Cancion eliminada");
          
      } catch (error) {
          res.status(500).json({ error: "Error al procesar la solicitud" });
          console.error("Error al procesar la solicitud:", error);
      }
    }
  
    export { getAllSongs, addNewSong, editSong, deleteSong, getIndex };