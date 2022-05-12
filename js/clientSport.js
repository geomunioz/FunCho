window.addEventListener('load', getAllExcersice);

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
                article.onclick = getDetailActivity('../activity.html?type=sport&name='+response[i].name);

                    const contentIcon =  document.createElement('div');
                    contentIcon.className = 'content-activity__icon';

                        const icon = document.createElement('i')
                        icon.className = 'fa-solid fa-futbol';

                    contentIcon.appendChild(icon);
                    
                    const contentActivity = document.createElement('div');
                    contentActivity.className = 'content-activity__details';

                        const p_title = document.createElement('p');
                        p_title.className = 'activity-details__name';
                        p_title.textContent = response[i].name;

                        const p_points = document.createElement('p');
                        p_points.className = 'activity-details__points';
                        p_points.textContent = 'Puntos: 45 points' ;
                    
                    contentActivity.appendChild(p_title);
                    contentActivity.appendChild(p_points);

                    const contentIcon2 = document.createElement('div')
                    contentIcon2.className = 'content-activity__icon';

                        const icon2 = document.createElement('i');
                        icon2.className = 'fa-regular fa-add';

                    contentIcon2.appendChild(icon2);

                article.appendChild(contentIcon);
                article.appendChild(contentActivity);
                article.appendChild(contentIcon2);

                container.appendChild(article);
            }
        })
        .catch(err => console.error(err));
}

function getDetailActivity(link){
    return function getDetail(){
        window.location.href = link;
    }
}