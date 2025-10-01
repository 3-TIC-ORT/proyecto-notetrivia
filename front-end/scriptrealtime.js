    const socket = io();
    const editor = document.getElementById("editor");
    socket.on("cargar", (texto) => {
        editor.value = texto
    })
    socket.on("actualizar", (data) => {
        editor.value = data;
    })
        editor.addEventListener("input", () => {
      socket.emit("editarDocumento", editor.value);
    });