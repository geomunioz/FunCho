const valores = window.location.search;

//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
var tipoActividad = urlParams.get('type');

if(!tipoActividad){
    window.addEventListener('load', getAllExcersice);
}

async function getAllExcersice(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': '380fed1cf0msh80b081f8501b0cap172456jsn34c4bcc62e14'
        }
    };
    
    await fetch('https://exercisedb.p.rapidapi.com/exercises', options)
        .then(response => response.json())
        .then(response => {
            console.log(response.length) //1327
            let container = document.getElementsByClassName('list-activities')[0];

            
            for(var i = 0; i<response.length; i++){
                //Creacion de elementos
                const article = document.createElement('article');
                article.className = 'content-activity';
                

                    const contentIcon =  document.createElement('div');
                    contentIcon.className = 'content-activity__icon';

                        const icon = document.createElement('i')
                        icon.className = 'fa-solid fa-futbol';

                    contentIcon.appendChild(icon);
                    
                    const contentActivity = document.createElement('div');
                    contentActivity.className = 'content-activity__details';
                    contentActivity.onclick = getDetailActivity('./activity.html?type=sport&name='+response[i].id+'&points=25');
                        const p_title = document.createElement('p');
                        p_title.className = 'activity-details__name';
                        p_title.textContent = response[i].name;

                        const p_points = document.createElement('p');
                        p_points.className = 'activity-details__points';
                        p_points.textContent = 'Puntos: 25 points' ;
                    
                    contentActivity.appendChild(p_title);
                    contentActivity.appendChild(p_points);

                    const contentIcon2 = document.createElement('div')
                    contentIcon2.className = 'content-activity__icon';

                        const icon2 = document.createElement('i');
                        icon2.className = 'fa-regular fa-add';
                        icon2.onclick = agregarTarea(response[i]);

                    contentIcon2.appendChild(icon2);

                article.appendChild(contentIcon);
                article.appendChild(contentActivity);
                article.appendChild(contentIcon2);

                container.appendChild(article);
            }
        })
        .catch(err => console.error(err));
}

function agregarTarea(tarea){

    return function agregar(){
        const idProfile = localStorage.getItem('idIntegrante');

        var formData = new FormData();
        formData.append('idIntegrante', idProfile);
        formData.append('idTarea', tarea.id);
        formData.append('type', 'sport');

        fetch('http://localhost:85/FunCho/API/Funcho/actividad/add',{
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(response =>{
            work = response;
            console.log(work);
        })
        .catch(err => console.error(err));

        window.location.href = './principal.html';
    }
}

function getDetailActivity(link){
    return function getDetail(){
        window.location.href = link;
    }
}

async function getSport(nameActividad){
    let exercise;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
            'X-RapidAPI-Key': '380fed1cf0msh80b081f8501b0cap172456jsn34c4bcc62e14'
        }
    };
    
    await fetch('https://exercisedb.p.rapidapi.com/exercises/exercise/'+nameActividad, options)
        .then(response => response.json())
        .then(response =>{
            exercise = response;
            console.log(exercise);
        })
        .catch(err => console.error(err));

    return exercise;
}

export { getSport };