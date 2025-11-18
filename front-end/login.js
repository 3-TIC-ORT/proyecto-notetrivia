const socket = io("http://localhost:3000");
let formu = document.getElementById("form"); 
formu.addEventListener("submit", guardar);
function guardar(e) {
    e.preventDefault();  
    let password = document.getElementById("password").value;
    let user = document.getElementById("user").value;
    socket.emit("login", {user, password});
}
socket.on("login-exito", (data) => {
    alert(data.mensaje);
    window.location.href = "document.html";
    
});
socket.on("userDEV", (data) => {
        localStorage.setItem("userDEV", data)
})
socket.on("login-error", (data) => {
    alert(data.mensaje);
});

