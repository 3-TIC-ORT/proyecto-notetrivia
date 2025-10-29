    const btnentrada = document.getElementById('enterBtn')
    const roomInput = document.getElementById('roomInput')


    function envio() {
      const docId = roomInput.value

      if (!docId) return alert("Por favor ingrese un ID de sala.")
      localStorage.setItem("docId", docId);
      window.location.href = "sala.html";
    }

    btnentrada.addEventListener("click", envio);