import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.static(path.join(__dirname, "..", "front-end")));
let usuarios = JSON.parse(fs.readFileSync("usuarios.json"));
let proximoid = Object.values(usuarios).reduce((max, u) => Math.max(max, u.id), 0) + 1;// devuele array de objetos lo recorre acumula y con max usa el mayor entre el acumulado y el id del usuario actual.

    let rooms = {}
    rooms = JSON.parse(fs.readFileSync("rooms.json","utf-8"))
    function guardar(){
      fs.writeFileSync("rooms.json", JSON.stringify(rooms, null, 2))
    }
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
        username: data.user
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
    } else {
      socket.emit("login-exito", { mensaje: "Login exitoso" });
    }
});
    });
    
server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});