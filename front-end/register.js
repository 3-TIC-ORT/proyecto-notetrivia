const socket = io("http://localhost:3000");
let formu = document.getElementById("register"); 
formu.addEventListener("submit", guardar);
function guardar(e) {
    e.preventDefault();  
    let password = document.getElementById("password").value;
    let user = document.getElementById("username").value;
    socket.emit("registro", {user, password});
}
socket.on("registro-exito", (data) => {
    alert(data.mensaje);
});
socket.on("registro-error", (data) => {
    alert(data.mensaje);
});

