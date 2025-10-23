 const socket = io();
    const editor = document.getElementById("editor");
    const roomMUESTRA = document.getElementById("roomName");
    const userMUESTRA = document.getElementById("userName");

    const docId = localStorage.getItem("docId");
    const user = localStorage.getItem("user");

    if (!docId || !user) {
      alert("Faltan datos, redirigiendo...");
      window.location.href = "index.html";
    }

    roomMUESTRA.textContent = docId;
    userMUESTRA.textContent = user;

    
    socket.emit("unirse", { docId, user });
    socket.on("loadDocument", (content) => {
      editor.value = content;
    });
    socket.on("updateDocument", (newContent) => {
      editor.value = newContent;
    });

    editor.addEventListener("input", () => {
      socket.emit("editDocument", {
        docId,
        user,
        content: editor.value
      });
    });
    window.addEventListener("beforeunload", () => {
      socket.emit("salir", { docId, user });
    })