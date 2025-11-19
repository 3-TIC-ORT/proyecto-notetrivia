   const socket = io("http://localhost:3000");
 const btnentrada = document.getElementById('btn-rojo')
    const roomInput = document.getElementById('inputtt')
    let user = localStorage.getItem("userDEV")
   let lista = []
    socket.emit("cargarNORMAL", {user})
    socket.on("cargar1", (data) => {
        console.log(data)
      })

    function envio() {
      const docId = roomInput.value

      if (!docId) return alert("Por favor ingrese un ID de sala.")
      localStorage.setItem("docId", docId);
      window.location.href = "editor/sala.html";
    }

    btnentrada.addEventListener("click", envio);
 