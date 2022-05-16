var h1 = document.getElementsByTagName('h1')[0];
var start = document.getElementsByClassName('title-option__button');

var sec = 5;
var min = 0;
var hrs = 0;
var t;

function tick(){
    sec--;
    if (sec <= 0 && (min>0 || hrs >0)) {
        sec = 59;
        min--;
        if (min <= 0 && hrs > 0) {
            min = 59;
            hrs--;
        }
    }
}

async function add() {
    tick();
    h1.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);

    if(hrs>0 || min>0 || sec>0){

        timer();
    }else{
        console.log('termino');
        const valores = window.location.search;

        //Creamos la instancia
        const urlParams = new URLSearchParams(valores);

        //Accedemos a los valores
        var tipoActividad = urlParams.get('type');

        var id = urlParams.get('name');
        var points = urlParams.get('points');

        const idProfile = localStorage.getItem('idIntegrante');
        console.log(idProfile);
        if(tipoActividad === 'sport'){
            var sport = await getSport(id);
            console.log(sport);

            sumarPunto(idProfile,points);

            // eliminarActividad(idProfile,parseInt(id));
            
        }else if(tipoActividad === 'work'){
            var sport = await getWork(id);
            console.log(sport);
            sumarPunto(idProfile,points);
            
        }else if(tipoActividad === 'recipe2'){
            var sport = await getReceta(id);
            console.log(sport.puntos);

            sumarPunto(idProfile,points);
            
        }
    }
}
function timer() {
        t = setTimeout(add, 1000);
}

async function getSport(id){
            
    let exercise;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': '380fed1cf0msh80b081f8501b0cap172456jsn34c4bcc62e14'
        }
    };
    
    await fetch('https://exercisedb.p.rapidapi.com/exercises/exercise/'+id, options)
        .then(response => response.json())
        .then(response =>{
            console.log(response);
            exercise = response;
        })
        .catch(err => console.error(err));

    return exercise;
}

async function getReceta(id){
    let receta;
    
    await fetch('http://localhost:85/FunCho/API/Funcho/receta/'+id)
        .then(response => response.json())
        .then(response =>{
            console.log(response);
            receta = response;
        })
        .catch(err => console.error(err));

    return receta;
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

function sumarPunto(id, points){
    var formData = new FormData();
                formData.append('methodHTTP', 'PUT');
                formData.append('puntos', points);

                fetch('http://localhost:85/FunCho/API/Funcho/sumarPuntos/'+id,{
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(response =>{
                    console.log(response);
                })
                .catch(err => console.error(err));
}

function sumarPunto(id, points){
    var formData = new FormData();
                formData.append('methodHTTP', 'PUT');
                formData.append('puntos', points);

                fetch('http://localhost:85/FunCho/API/Funcho/sumarPuntos/'+id,{
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(response =>{
                    console.log(response);
                })
                .catch(err => console.error(err));
}

function eliminarActividad(idIntegrante, idTarea){
    var formData = new FormData();
                formData.append('methodHTTP', 'DELETE');
                formData.append('idTarea', idTarea);
    fetch('http://localhost:85/FunCho/API/Funcho/eliminar/'+idIntegrante,{
                    method: 'DELETE',
                    body: formData
                })
                .then(response => response.json())
                .then(response =>{
                    console.log(response);
                })
                .catch(err => console.error(err));
}

// stop.onclick = function() {
//     clearTimeout(t);
// }
// reset.onclick = function() {
//     h1.textContent = "00:00:00";
//     seconds = 0; minutes = 0; hours = 0;
// }
