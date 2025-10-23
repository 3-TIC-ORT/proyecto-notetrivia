    const btnentrada = document.getElementById('enterBtn')
    const roomInput = document.getElementById('roomInput')
    const personainput = document.getElementById('userInput')

    function envio() {
      const docId = roomInput.value
      const user = personainput.value

      if (!docId) return alert("Por favor ingrese un ID de sala.")
      if (!user) return alert("Por favor ingrese un nombre.")

      localStorage.setItem("docId", docId);
      localStorage.setItem("user", user);
      window.location.href = "sala.html";
    }

    btnentrada.addEventListener("click", envio);