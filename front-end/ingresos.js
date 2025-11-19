const socket = io("http://localhost:3000");

const btnentrada = document.getElementById('btn-rojo');
const roomInput = document.getElementById('inputtt');
let user = localStorage.getItem("userDEV");

// 🔥 LISTA VISUAL DEL FRONT
const documentList = document.querySelector(".document-list");

// 🔥 Pedimos al backend los documentos del usuario
socket.emit("cargarNORMAL", { user });

// 🔥 Cuando el backend responde con "cargar1"
socket.on("cargar1", (data) => {
    console.log("DATA RECIBIDA:", data);

    if (!data || !data.rooms) return;

    // Limpia los documentos actuales del HTML (los de ejemplo)
    documentList.innerHTML = "";

    // Recorremos todos los documentos
    data.rooms.forEach(docId => {
        const item = document.createElement("div");
        item.classList.add("document-item");

        // Estructura igual a tu HTML original
        item.innerHTML = `
            ${docId}
            <div class="icons">
                <i class="fas fa-star"></i>
                <i class="fas fa-trash"></i>
            </div>
        `;

        // ⭐ activar o desactivar favoritos con tu css
        const star = item.querySelector(".fa-star");
        star.addEventListener("click", () => {
            star.classList.toggle("active");
        });

        // Cuando se clickea el documento → entra a la sala
        item.addEventListener("click", (e) => {
            // Evita entrar si clickeás la estrella o el tacho
            if (e.target.classList.contains("fa-star") || e.target.classList.contains("fa-trash")) return;

            localStorage.setItem("docId", docId);
            window.location.href = "editor/sala.html";
        });

        documentList.appendChild(item);
    });
});

// --- función original para crear/unirse ---
function envio() {
    const docId = roomInput.value;

    if (!docId) return alert("Por favor ingrese un ID de sala.");

    localStorage.setItem("docId", docId);
    window.location.href = "editor/sala.html";
}

btnentrada.addEventListener("click", envio);
