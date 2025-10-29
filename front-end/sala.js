 const socket = io("http://localhost:3000");
    const editor = document.getElementById("editor");
    const roomMUESTRA = document.getElementById("roomName");
    const userMUESTRA = document.getElementById("userName");

    const docId = localStorage.getItem("docId");
    const user = localStorage.getItem("userDEV");

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
 function probando() {
      socket.emit("editDocument", {
        docId,
        user,
        content: editor.value
      });
    }
    editor.addEventListener("input",probando)