import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { setupcolaborativo } from "./colaborativo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});
  

app.use(express.static(path.join(__dirname, "..", "front-end",)));
let usuarios = JSON.parse(fs.readFileSync("usuarios.json"));
let proximoid = Object.values(usuarios).reduce((max, u) => Math.max(max, u.id), 0) + 1;
io.on("connection", (socket) => {
  console.log("papu conectado");
  socket.on("registro", (data) => {
    if (usuarios[data.user]) {
      socket.emit("registro-error", { mensaje: "El usuario ya existe" });
      return;
    } else if (data.password.length < 6) {
      socket.emit("registro-error", { mensaje: "La contraseña tiene que tener al menos 6 caracteres" });
      return;
    } else {
      usuarios[data.user] = {
        id: proximoid,
        password: data.password,
        username: data.user,
        intervalo: 10
      }
      proximoid++;
      socket.emit("registro-exito", { mensaje: "Usuario registrado con éxito" });
      fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));
    }
  });
    socket.on("login", (data) => {
    if (!usuarios[data.user]) {
      socket.emit("login-error", { mensaje: "El usuario no existe" });
      return;
    } else if (usuarios[data.user].password !== data.password) {
        socket.emit("login-error", { mensaje: "Contraseña incorrecta" });
        return;

    }
     const userObj = usuarios[data.user]; 
  socket.username = userObj.username;

  socket.emit("login-exito", { mensaje: "Bienvenido" });
  socket.emit("userDEV", userObj.username); 
        
        
      
    
});
  socket.on("intervalo", (data) => {
    let danonino = data * 10000
    usuarios[user].intervalo = danonino;
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2))
     })
    });
  
setupcolaborativo(io);
server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});