        const botones = document.querySelectorAll("#menu-visible li, #menu-bottom li");
    const pantallas = document.querySelectorAll(".pantalla");
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            pantallas.forEach(p => p.classList.remove("activa"));
            const id = boton.dataset.pantalla;
            const target = document.getElementById(id);
            if (target) target.classList.add("activa");
        });
    });
    const botonUnirse = document.querySelector('.btn-unirse');
    const inputSala = document.getElementById('ingresarsala');
    botonUnirse.onclick = function() {
        inputSala.style.display = 'block';
    };
    const socket = io();
    let input = document.getElementById("ingresarsala");
    let boton = document.getElementById("boton-jose");
    boton.addEventListener("click", enviar)
    function enviar() {
        const sala = input.value;
        socket.emit("unirse-sala", { room: sala });
    }


    