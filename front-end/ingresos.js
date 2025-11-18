    const btnentrada = document.getElementById('btn-rojo')
    const roomInput = document.getElementById('inputtt')

        
    function envio() {
      const docId = roomInput.value

      if (!docId) return alert("Por favor ingrese un ID de sala.")
      localStorage.setItem("docId", docId);
      window.location.href = "editor/sala.html";
    }

    btnentrada.addEventListener("click", envio);
 