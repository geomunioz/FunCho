
function addRegistro(){
    let formulario = new FormData(document.getElementById('form-registro'));

    fetch('http://localhost:85/FunCho/API/Funcho/familia/add', {
        method: 'POST',
        body: formulario
    })
    .then(respuesta => {
        console.log(respuesta);
    }).catch(err => console.error(err));
}

async function validarLogin(){
    const form = document.getElementById('form-login');
    let formulario = new FormData(form);

    await fetch('http://localhost:85/FunCho/API/Funcho/validar/login', {
        method: 'POST',
        body: formulario
    })
    .then(respuesta => respuesta.json())
    .then(response => {
        console.log(response);
        localStorage.setItem('cuenta', JSON.stringify(response))
    }).catch(err => console.error(err));
}

function crearPerfil(){
    let formulario = new FormData(document.getElementById('form-newProfile'));

    fetch('http://localhost:85/FunCho/API/Funcho/perfil/add', {
        method: 'POST',
        body: formulario
    })
    .then(respuesta => {
        console.log(respuesta);
    }).catch(err => console.error(err));
}

function editarPerfil(){
    const idProfile = localStorage.getItem('idIntegrante');
    let formulario = new FormData(document.getElementById('form-editProfile'));

    fetch('http://localhost:85/FunCho/API/Funcho/perfil/'+idProfile, {
        method: 'POST',
        body: formulario
    })
    .then(respuesta => {
        console.log(respuesta);
    }).catch(err => console.error(err));
}

function crearTarea(){
    let formulario = new FormData(document.getElementById('form-work'));

    fetch('http://localhost:85/FunCho/API/Funcho/tarea/add', {
        method: 'POST',
        body: formulario
    })
    .then(respuesta => {
        console.log(respuesta);
    }).catch(err => console.error(err));
}

async function getWork(id){
    let work;
    
    await fetch('http://localhost:85/FunCho/API/Funcho/tarea/'+id)
        .then(response => response.json())
        .then(response =>{
            work = response;
            console.log(work);
        })
        .catch(err => console.error(err));

    return work;
}


// export { getWork };

