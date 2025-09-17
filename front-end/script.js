

function guardar(e) {
    e.preventDefault();  
    let password = document.querySelector("#password").value;
    let user = document.querySelector("#user").value;

    postEvent("registro", { credenciales: password, user }, (data) => {
        console.log(data);
        alert(data.mensaje); 
    });
}   

let formu = document.getElementById("form"); 
formu.addEventListener("submit", guardar);
connect2Server();

