const formularioForm = document.getElementById('formulario');
const emailInput = document.getElementById('inputEmail');
console.log("email", emailInput.value);
const passInput = document.getElementById('inputPass');
const nombreInput = document.getElementById('inputNombre');
const usuariosTable = document.getElementById('tabla');
const usuariosTableCard = document.getElementById('groupNotes');
console.log("USUARIOSTABLECARD", usuariosTableCard)
const rolInput = document.getElementById('inputRol');
console.log("roles", rolInput.value);
const titulo1 = document.getElementById('titulo');
const nota1 = document.getElementById('nota');
console.log("titulo_object", titulo1)
console.log("titulo", titulo1.value);
const grupoDeNotas = document.getElementById('groupNotes');
const json = localStorage.getItem('usuarios'); // Traer de localStorage el dato asociado a la key "usuarios".
const usuarios = JSON.parse(json) || []; // Convertir datos de un string JSON a código JavaScript.

function generarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioForm.onsubmit = function (e) {
    e.preventDefault();
    const usuario = {
        id: generarID(),
        email: emailInput.value,
        tituloNota: titulo1.value,
        contenidoNota: nota1.value,
        pass: passInput.value,
        nombre: nombreInput.value,
        rol: rolInput.value,
    };
    usuarios.push(usuario);
    const json = JSON.stringify(usuarios); // Convertir datos a un string JSON.
    localStorage.setItem('usuarios', json); // Guardar en localStorage un dato asociado a la key "usuarios".
    mostrarUsuarios();
    //formularioForm.reset(); // reset limpia los campos del formulario.
};

function mostrarUsuarios() {
    // const usuariosMap = usuarios.map(function (usuario) {
    //     return `
    //         <tr>
    //             <td>${usuario.nombre}</td>
    //             <td>${usuario.email}</td>
    //             <td>${usuario.rol}</td>
    //         </tr>
    //     `;
    // }); // La función recorre y map genera un array nuevo sin modificar el array original.
    // // Recibe por parámetros la función que debe ejecutarse por cada elemento del array.
    // usuariosTable.innerHTML = usuariosMap.join('');
    let filas = [];
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        const tr = `
            <tr>
                <td>${usuario.tituloNota}</td>
                <td>${usuario.contenidoNota}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.rol}</td>
            </tr>
        `;
        filas.push(tr);
        console.log ("FILAS", filas)
    }
        let filasCards = [];
        for (let i = 0; i < usuarios.length; i++) {
            const usuario = usuarios[i];
            const divCard1 = `<div class="card">
        <div class="card-body">
          <h5 class="card-title">${usuario.tituloNota}</h5>
          <textarea class="form-control" aria-label="With textarea">${usuario.contenidoNota}</textarea>
          <p class="card-text"><small class="text-muted">${usuario.id}</small></p>
        </div>
      </div>
        `;
            filasCards.push(divCard1);
            console.log("CARDS", filasCards)
            
        }
    usuariosTable.innerHTML = filas.join('');

     
    usuariosTableCard.innerHTML = filasCards.join('');

        

    }
    mostrarUsuarios();


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
