import { subscribePOSTEvent, startServer } from "soquetic";
import fs from "fs";

const archivoUsuarios = "usuarios.json";
function leerUsuarios() {
    if (!fs.existsSync(archivoUsuarios)) return [];
    try {
        const data = fs.readFileSync(archivoUsuarios, "utf-8");
        if (data.trim() === "") return [];
        return JSON.parse(data);
    } catch (err) {
        console.error("Error leyendo JSON:", err);
        return [];
    }
}


function guardarUsuarios(usuarios) {
    fs.writeFileSync(archivoUsuarios, JSON.stringify(usuarios, null, 2));
}

subscribePOSTEvent("registro", (data) => {
    const { user, credenciales } = data;
    const usuarios = leerUsuarios();

    usuarios.push({ user, password: credenciales });
    guardarUsuarios(usuarios);

    console.log(`Usuario registrado: ${user}`);
    return { ok: true, mensaje: "Usuario registrado correctamente" };
});

startServer();
