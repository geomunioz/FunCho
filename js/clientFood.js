const valores = window.location.search;

//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
var tipoActividad = urlParams.get('type');

if(!tipoActividad){
    window.addEventListener('load', getAllRecipes);
}

async function getAllRecipes(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'random-recipes.p.rapidapi.com',
            'X-RapidAPI-Key': '380fed1cf0msh80b081f8501b0cap172456jsn34c4bcc62e14'
        }
    };
    
    fetch('https://random-recipes.p.rapidapi.com/ai-quotes/90', options)
        .then(response => response.json())
        .then(response => {
           console.log(response) 
           console.log(response.length) //90
            let container = document.getElementsByClassName('list-activities')[0];

            for(var i = 0; i<response.length; i++){
                var valPoints = Math.floor(Math.random() * (36 - 25)) + 25;
                //Creacion de elementos
                const article = document.createElement('article');
                article.className = 'content-activity';
                

                    const contentIcon =  document.createElement('div');
                    contentIcon.className = 'content-activity__icon';

                        const icon = document.createElement('i')
                        icon.className = 'fa-solid fa-apple-whole';

                    contentIcon.appendChild(icon);
                    
                    const contentActivity = document.createElement('div');
                    contentActivity.className = 'content-activity__details';
                    contentActivity.onclick = getDetailActivity('./activity.html?type=recipe&name='+response[i].id+'&points='+valPoints, response[i]);

                        const p_title = document.createElement('p');
                        p_title.className = 'activity-details__name';
                        p_title.textContent = response[i].title;

                        const p_points = document.createElement('p');
                        p_points.className = 'activity-details__points';
                        p_points.textContent = 'Puntos: '+valPoints+' points' ;
                    
                    contentActivity.appendChild(p_title);
                    contentActivity.appendChild(p_points);

                    const contentIcon2 = document.createElement('div')
                    contentIcon2.className = 'content-activity__icon';

                        const icon2 = document.createElement('i');
                        icon2.className = 'fa-regular fa-add';
                        icon2.onclick = agregarTarea(response[i], valPoints);

                    contentIcon2.appendChild(icon2);

                article.appendChild(contentIcon);
                article.appendChild(contentActivity);
                article.appendChild(contentIcon2);

                container.appendChild(article);
            }
        })
        .catch(err => console.error(err));
}

function agregarTarea(tarea, points){

    return function agregar(){
        //Agregar receta
        agregarReceta(tarea, points);
        const idProfile = localStorage.getItem('idIntegrante');

        var formData = new FormData();
        formData.append('idIntegrante', idProfile);
        formData.append('idTarea', tarea.id);
        formData.append('type', 'recipe');

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

async function agregarReceta(receta, points){
    var formData = new FormData();
                formData.append('idReceta', receta.id);
                formData.append('nombre', receta.title);
                formData.append('ingredientes', receta.ingredients[0]);
                formData.append('instrucciones', receta.instructions[0].text);
                formData.append('puntos', points);

                fetch('http://localhost:85/FunCho/API/Funcho/receta/add',{
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(response =>{
                    console.log(response);
                })
                .catch(err => console.error(err));
}

async function getRecipe(idRecipe){
    var recipe = window.localStorage.getItem('recipe');
    // console.log(JSON.parse(recipe))
    return JSON.parse(recipe);
}

function getDetailActivity(link, recipe){
    return function getDetail(){
        localStorage.setItem('recipe', JSON.stringify(recipe))
        window.location.href = link;
    }
}

export { getRecipe };