const socket = io("http://localhost:3000");
let formu = document.getElementById("form"); 
formu.addEventListener("submit", guardar);
function guardar(e) {
    e.preventDefault();  
    let password = document.querySelector("#password").value;
    let user = document.querySelector("#user").value;
    socket.emit("login", {user, password});
}
socket.on("login-exito", (data) => {
    alert(data.mensaje);
    window.location.href = "ingresos.html";
    const userInput = document.querySelector("#user")?.value || document.querySelector("input[name='user']")?.value;
    if (userInput) {
        localStorage.setItem("username", userInput);
    } else if (data && data.username) {
        localStorage.setItem("username", data.username);
    }
});
socket.on("login-error", (data) => {
    alert(data.mensaje);
});

