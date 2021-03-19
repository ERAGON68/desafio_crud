var validado = true;
//const usuariosTable = document.getElementById('tabla');
const usuariosTableCard = document.getElementById('groupNotes');
//const usuariosTableCard2 = document.getElementById('groupNotes2');
const alertaDiv = document.getElementById('alerta');
const json = localStorage.getItem('usuarios'); // Traer de localStorage el dato asociado a la key "usuarios".
let usuarios = JSON.parse(json) || []; // Convertir datos de un string JSON a código JavaScript.
const editarForm = document.getElementById('formularioEditar');
const busquedaForm = document.getElementById('formBusqueda');
//console.log('EDITARFORM', editarForm);
mostrarUsuarios();
//const formularioForm = document.getElementById('formulario');
const titulo1 = document.getElementById('titulo');
const nota1 = document.getElementById('nota');
let usuarioId = ''

function generarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

//formularioForm.onsubmit = function (e) {

  //  e.preventDefault();
    
    //validado = validateForm_addnota();
    //console.log ("VALIDADO",validado);
    //if (validado) {

      //  const usuario = {
        //    id: generarID(),
          //  tituloNota: titulo1.value,
            //contenidoNota: nota1.value,
           // registro: Date.now(),
       // };
        //usuarios.push(usuario);
        //const json = JSON.stringify(usuarios); // Convertir datos a un string JSON.
        //localStorage.setItem('usuarios', json); // Guardar en localStorage un dato asociado a la key "usuarios".
        //location.href = "./index.html";
        //mostrarUsuarios();
        //formularioForm.reset(); // reset limpia los campos del formulario.
        //volver()
    //} else {
             ////// alertaDiv.style = "display: block !important"
      //      alertaDiv.classList.remove('d-none');
        //  }
   // }

//;

function volver() {
    location.href = "./index.html";
  }

function mostrarUsuarios() {
    let filasCards = [];
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        const fecha = new Date(usuario.registro);
        const divCard1 = `<div class="card">
        <div class="card-body">
          <h5 class="card-title">${usuario.tituloNota}</h5>
          <textarea class="form-control" aria-label="With textarea">${usuario.contenidoNota}</textarea>
          <p class="card-text"><small class="text-muted">ID Nota: ${usuario.id}</small></p>
          <div d-fles d-flex flex-row justify-content-around>
            <button onclick="mostrarDetalle('${usuario.id}')" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalle">Ver detalle</button>
            <button onclick="cargarModalEditar('${usuario.id}')" type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#modalEditar">Editar</button>
            <button onclick="eliminarUsuario('${usuario.id}')" class="btn btn-danger btn-sm ">Eliminar</button>
          </div>  
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

    if (x == "" || x == "123456789" || x.length <6 || x.lenght > 60 ) {
        //alert("Titulo corto o demasiado largo (4 hasta 60 caracteres)!");
        exito = false;
        console.log("EXITO TITULO", exito);
        //return false;
    }
    if (ps1 == "" || ps1 == "123456789" || ps1.lenght < 4 || ps1.lenght > 500 ) {
        //alert("Nota vacia o invalida! (4 a 500 caracteres)");
        exito = false;
        console.log("EXITO NOTA", exito);
        //return false;
    }
    console.log("EXITO FINAL", exito);
    if (exito) {
        alert("Nota Creada!")
    } else {
        alertaDiv.classList.remove('d-none');
        //alert("Nota Cancelada!");
    }
    return exito;
}

function eliminarUsuario(id) {
    // const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);

    let usuariosFiltrados = [];
    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        const coincideId = usuario.id === id;
        if (!coincideId) {
            usuariosFiltrados.push(usuario);
        }
    }
    const json = JSON.stringify(usuariosFiltrados);
    localStorage.setItem('usuarios', json);
    usuarios = usuariosFiltrados;
    location.reload();
    mostrarUsuarios();
}

function mostrarDetalle(id) {
    const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id);
    console.log('mostrarDetalle - usuarioEncontrado', usuarioEncontrado);
    // const detalleDiv = document.getElementById('detalleUsuario');
    // detalleDiv.innerHTML = usuarioEncontrado.nombre;
    const detalleDiv = document.getElementById('detalleUsuario');
    const fecha = new Date(usuarioEncontrado.registro);
    console.log('mostrarDetalle - fecha', fecha);
    const detallesUsuario = `

        <p>Titulo: ${usuarioEncontrado.tituloNota} </p>
        <p>Nota: ${usuarioEncontrado.contenidoNota}</p>
        <p>id: ${usuarioEncontrado.id}</p>
        <p>Fecha de Publicacion: ${fecha.toLocaleString()}</p>

        
    `;
    detalleDiv.innerHTML = detallesUsuario;
}

function cargarModalEditar(id) {
    // Buscar el usuario en el array usando el método find().
    const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id);
    editarTituloInput.value = usuarioEncontrado.tituloNota;
    console.log ('USUARIOENCONTRADO', usuarioEncontrado);
    console.log ('TITULO ENCONTRADO', usuarioEncontrado.tituloNota);
    editarNotaInput.value = usuarioEncontrado.contenidoNota;
    console.log ('NOTA ENCONTRADA',usuarioEncontrado.contenidoNota);
    console.log ('NOTA ENCONTRADA VALUE', editarNotaInput.value);
    
    // Actualizar el valor de la variable global usuarioId, con el id del usuario encontrado.
    usuarioId = usuarioEncontrado.id;
    console.log('USUARIOS ARRAY', usuarios);
    console.log('USUARIOID', usuarioId);
    console.log('EDITARFORM', editarForm);

    
}
//console.log('USUARIOS ARRAY', usuarios)
editarForm.onsubmit = function editarUsuario(ee) {
    ee.preventDefault();
    // Actualizar un usuario del array, usando map().
    alert("ENTRO AL EVENTO DE EDITAR FORM");
    const usuariosModificado = usuarios.map((usuario) => {
        // Usamos el id de usuario guardado en usuarioId,
        // para modificar solo al usuario que coincida con este.
        if (usuario.id === usuarioId) {
            // Usar spread syntax para copiar las propiedades de un objeto a otro.
            const usuarioModificado = {
                ...usuario,
                tituloNota: editarTituloInput.value,
                contenidoNota: editarNotaInput.value,
            };
            return usuarioModificado;
        } else {
            // Retornar el usuario sin modificar en los casos que no coincida el id.
            //console.log('USUARIOMODIFICADO', usuarioModificado )
            return usuario;
        }
    });


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
const json = JSON.stringify(usuariosModificado);
    // Guardar lista de usuarios en localStorage.
    localStorage.setItem('usuarios', json);
    usuarios = usuariosModificado;
    //console.log("Se modificó exitosamente un usuario. 👨‍💻");
    mostrarUsuarios();
    //alert("ENTRO AL EVENTO DE EDITAR FORM FUERA DEL MAP");
    // Ocultar el modal con las funciones incluidas en bootstrap.
    const modalDiv = document.getElementById('modalEditar');
    const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
    modalBootstrap.hide();
};

const submitBusqueda = (e) => {
    e.preventDefault();
    const usuariosLocal = JSON.parse(localStorage.getItem('usuarios')) || [];
    const busquedaInput = document.getElementById('busqueda');
    const termino = busquedaInput.value.toLowerCase();
    const usuariosFiltrados = usuariosLocal.filter((usuario) => {
        console.log ("USUARIO", usuario);
        const tituloEnMinuscula = usuario.tituloNota.toLowerCase();
        const contenidoEnMinuscula = usuario.contenidoNota.toLowerCase();
        const encuentro = (tituloEnMinuscula.includes(termino) || contenidoEnMinuscula.includes(termino));
        console.log ("ENCUENTRO", encuentro);
        return encuentro;
     });
    usuarios = usuariosFiltrados;
    mostrarUsuarios();
    // Condicional para mostrar u ocultar el mensaje "sin resultados".
    const alerta = document.getElementById('alertaBusqueda');
    if (usuariosFiltrados.length === 0) {
        alerta.classList.remove('d-none');
    } else {
        alerta.classList.add('d-none');
    }
};

const limpiarFiltro = () => {
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    busquedaForm.reset();
    mostrarUsuarios();
    const alerta = document.getElementById('alertaBusqueda');
    alerta.classList.add('d-none');
}

mostrarUsuarios();
//formularioForm.onsubmit = submitFormulario;
//editarForm.onsubmit = editarUsuario;
busquedaForm.onsubmit = submitBusqueda;




