const formularioForm = document.getElementById('formulario');


formularioForm.onsubmit = function (e) {

    e.preventDefault();
    
    validado = validateForm_addnota();
    console.log ("VALIDADO",validado);
    if (validado) {

        const usuario = {
          id: generarID(),
            tituloNota: titulo1.value,
            contenidoNota: nota1.value,
            registro: Date.now(),
        };
        usuarios.push(usuario);
        const json = JSON.stringify(usuarios); // Convertir datos a un string JSON.
        localStorage.setItem('usuarios', json); // Guardar en localStorage un dato asociado a la key "usuarios".
        location.href = "./index.html";
        mostrarUsuarios();
        formularioForm.reset(); // reset limpia los campos del formulario.
        volver()
    } else {
             //// alertaDiv.style = "display: block !important"
            alertaDiv.classList.remove('d-none');
          }
    }

;
