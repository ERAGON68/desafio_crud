var validado = true;
//const usuariosTable = document.getElementById('tabla');
const usuariosTableCard = document.getElementById('groupNotes');
//const usuariosTableCard2 = document.getElementById('groupNotes2');

const json = localStorage.getItem('usuarios'); // Traer de localStorage el dato asociado a la key "usuarios".
const usuarios = JSON.parse(json) || []; // Convertir datos de un string JSON a código JavaScript.

mostrarUsuarios();
const formularioForm = document.getElementById('formulario');
console.log("FORMULARIOFORM",formularioForm);
const titulo1 = document.getElementById('titulo');
const nota1 = document.getElementById('nota');

function generarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioForm.onsubmit = function (e) {

    e.preventDefault();
    console.log ("VALIDADO ANTES DE FUNCION",validado);
    
    validado = validateForm_addnota();
    console.log ("VALIDADO",validado);
    if (validado) {

        const usuario = {
            id: generarID(),
            tituloNota: titulo1.value,
            contenidoNota: nota1.value,
        };
        usuarios.push(usuario);
        const json = JSON.stringify(usuarios); // Convertir datos a un string JSON.
        localStorage.setItem('usuarios', json); // Guardar en localStorage un dato asociado a la key "usuarios".
        location.href = "./index.html";
        mostrarUsuarios();
        formularioForm.reset(); // reset limpia los campos del formulario.
        volver()
    }
}
;

function volver() {
    location.href = "./index.html";
  }

function mostrarUsuarios() {
    let filasCards = [];
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        const divCard1 = `<div class="card">
        <div class="card-body">
          <h5 class="card-title">${usuario.tituloNota}</h5>
          <textarea class="form-control" aria-label="With textarea">${usuario.contenidoNota}</textarea>
          <p class="card-text"><small class="text-muted">ID Nota: ${usuario.id}</small></p>
        </div>
      </div>
        `;
        filasCards.push(divCard1);
        //console.log("CARDS", filasCards)

    }
    usuariosTableCard.innerHTML = filasCards.join('');

}



mostrarUsuarios();

function validateForm_addnota() {
    var x = document.forms["formulario"]["titulo"].value;
    console.log("X", x);

    var ps1 = document.forms["formulario"]["nota"].value
    var ps1Lenght = ps1.lenght;
    console.log("PS1", ps1);
    console.log ("PS1LENGHT", ps1Lenght);
    
    console.log("PS1", ps1.lenght)
    
    var exito = true

    if (x == "" || x == "123456789" || x.length <4 || x.lenght > 60 ) {
        alert("Titulo corto o demasiado largo (4 hasta 60 caracteres)!");
        exito = false;
        return false;
    }
    if (ps1 == "" || ps1 == "123456789" || ps1.lenght < 4 || ps1.lenght > 500 ) {
        alert("Nota vacia o invalida! (4 a 500 caracteres)");
        exito = false;
        console.log("exitops1", exito);
        return false;
    }
    console.log("exito final", exito);
    if (exito) {
        alert("Nota Creada!")
    } else {
        alert("Nota Cancelada!");
    }
    return exito;
}

//var numbers = [1, 4, 9];

// Ejemplo usando array map
// function mapRoots(num) {
//     console.log('mapRoots - num', num);
//     console.log('mapRoots - Math.sqrt(num)', Math.sqrt(num));
//     return Math.sqrt(num);
// };

// var roots = numbers.map(mapRoots);
// console.log('numbers', numbers);
// console.log('roots', roots);
