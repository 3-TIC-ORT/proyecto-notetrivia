const socket = io("http://localhost:3000");
intervalo = document.getElementById("intervalo");
function funcion() {
    socket.emit("intervalo", intervalo.value)
}
intervalo.addEventListener("input", funcion)