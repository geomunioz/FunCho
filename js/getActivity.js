import { getSport } from "./clientSport.js";
import { getRecipe } from "./clientFood.js";
import { getWork } from "./client.js";

const valores = window.location.search;

//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
var tipoActividad = urlParams.get('type');

var id = urlParams.get('name');
console.log(tipoActividad);

var points = urlParams.get('points');

var exercise;
if(tipoActividad==='sport'){
    exercise = await getSport(id);

        const activityContainer = document.getElementsByClassName('activity-description')[0];

        const title  = document.getElementsByClassName('title')[0];
        title.textContent = exercise.name.toUpperCase();

        const textPoints = document.getElementsByClassName('points')[0];
        textPoints.textContent = points+' pts'

        const description = document.getElementById('description-detail');
        description.textContent = 'Realizar el ejercicio que se ilustra en la imagen realizando repeticion hasta concluir el tiempo establecido. Para iniciar deberas dar clic en el botón Iniciar'

        const picture = document.createElement('picture');
        picture.className = 'description';

        const img = document.createElement('img');
        img.src = exercise.gifUrl;
        img.width = 300;

        picture.appendChild(img);
        activityContainer.appendChild(picture);

}else if(tipoActividad==='work'){
    var work = await getWork(id);
    console.log(work);

    const activityContainer = document.getElementsByClassName('activity-description')[0];

        const title  = document.getElementsByClassName('title')[0];
        title.textContent = work.nombre;

        const textPoints = document.getElementsByClassName('points')[0];
        textPoints.textContent = work.puntos+' pts'

        const description = document.getElementById('description-detail');
        description.textContent = 'Descripción:'

            const li = document.createElement('li');
            li.textContent = work.descripcion;
            description.appendChild(li);

        const contador = document.getElementsByClassName('activity-time')[0];

}else if(tipoActividad==='recipe'){
    var recipe = await getRecipe(id);
    console.log(recipe);
    const activityContainer = document.getElementsByClassName('activity-description')[0];

        const title  = document.getElementsByClassName('title')[0];
        title.textContent = recipe.title;

        const textPoints = document.getElementsByClassName('points')[0];
        textPoints.textContent = points+' pts'

        const description = document.getElementById('description-detail');
        description.textContent = 'Ingredientes:'

        for(var j = 0; j<recipe.ingredients.length; j++){
            const li = document.createElement('li');
            li.textContent = recipe.ingredients[j];
            description.appendChild(li);
        }

        const br = document.createElement('br');
        description.appendChild(br);

        const p = document.createElement('p')
        p.textContent = 'Instrucciones:';

        description.appendChild(p);

        for(var k = 0; k<recipe.instructions.length; k++){
            const li = document.createElement('li');
            li.textContent = recipe.instructions[k].text;
            description.appendChild(li);
        }

        const contador = document.getElementsByClassName('activity-time')[0];

        const picture = document.createElement('picture');
        picture.className = 'description';

        const img = document.createElement('img');
        img.src = recipe.image;

        picture.appendChild(img);
        contador.appendChild(picture);
}