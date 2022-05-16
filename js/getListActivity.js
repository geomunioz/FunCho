window.addEventListener('load', getActividades);

async function getActividades(){
    const idProfile = localStorage.getItem('idIntegrante');
    console.log(idProfile);
    await fetch('http://localhost:85/FunCho/API/Funcho/listaActividades/'+idProfile)
    .then(response => response.json())
    .then(response =>{  
        console.log(response);
        localStorage.setItem('actividades', JSON.stringify(response));
                
    })
    
    .catch(err => console.error(err));

            var actividad = JSON.parse(localStorage.getItem('actividades'));
            console.log(actividad);

            const container = document.getElementsByClassName('container-activities')[0];

            for(var i = 0; i<actividad.length; i++){
                    if(actividad[i].type === 'sport'){
                        if(actividad[i].idTarea.length<4){
                            var suma = '';
                            var idActividad = actividad[i].idTarea;
                            while(suma.length + idActividad.length < 4){
                                suma = suma + '0';
                            }

                            var suma = suma +idActividad;
                        }else{
                            suma = actividad[i].idActividad;
                        }
                        console.log(suma);
                        var sport = await getSport(suma);
                        console.log(sport);
                        const article = document.createElement('article');
                        article.className = 'content-activity';
                        

                            const contentIcon =  document.createElement('div');
                            contentIcon.className = 'content-activity__icon';

                                const icon = document.createElement('i')
                                icon.className = 'fa-solid fa-futbol';

                            contentIcon.appendChild(icon);
                            
                            const contentActivity = document.createElement('div');
                            contentActivity.className = 'content-activity__details';
                            contentActivity.onclick = getDetailActivity('./activity.html?type=sport&name='+sport.id+'&points=25');
                                const p_title = document.createElement('p');
                                p_title.className = 'activity-details__name';
                                p_title.textContent = sport.name;

                                const p_points = document.createElement('p');
                                p_points.className = 'activity-details__points';
                                p_points.textContent = 'Puntos: 25 points' ;
                            
                            contentActivity.appendChild(p_title);
                            contentActivity.appendChild(p_points);

                        article.appendChild(contentIcon);
                        article.appendChild(contentActivity);

                        container.appendChild(article);
                    }else if(actividad[i].type === 'tarea'){
                        console.log(actividad[i].idTarea);
                        var sport = await getWork(actividad[i].idTarea);
                        console.log(sport);
                        const article = document.createElement('article');
                        article.className = 'content-activity';
                        

                            const contentIcon =  document.createElement('div');
                            contentIcon.className = 'content-activity__icon';

                                const icon = document.createElement('i')
                                icon.className = 'fa-regular fa-square-check';

                            contentIcon.appendChild(icon);
                            
                            const contentActivity = document.createElement('div');
                            contentActivity.className = 'content-activity__details';
                            contentActivity.onclick = getDetailActivityFood('./activity.html?type=work&name='+sport.idTarea+'&points='+sport.puntos, sport);
                                const p_title = document.createElement('p');
                                p_title.className = 'activity-details__name';
                                p_title.textContent = sport.nombre;

                                const p_points = document.createElement('p');
                                p_points.className = 'activity-details__points';
                                p_points.textContent = sport.puntos ;
                            
                            contentActivity.appendChild(p_title);
                            contentActivity.appendChild(p_points);

                        article.appendChild(contentIcon);
                        article.appendChild(contentActivity);

                        container.appendChild(article);
                    }else if(actividad[i].type === 'recipe'){
                        console.log(actividad[i].idTarea);
                        var sport = await getReceta(actividad[i].idTarea);
                        console.log(sport.puntos);
                        const article = document.createElement('article');
                        article.className = 'content-activity';
                        

                            const contentIcon =  document.createElement('div');
                            contentIcon.className = 'content-activity__icon';

                                 const icon = document.createElement('i')
                                 icon.className = 'fa-solid fa-apple-whole';

                            contentIcon.appendChild(icon);
                            
                            const contentActivity = document.createElement('div');
                            contentActivity.className = 'content-activity__details';
                             contentActivity.onclick = getDetailActivityFood('./activity.html?type=recipe2&name='+sport.idReceta+'&points='+sport.puntos, sport);
                                const p_title = document.createElement('p');
                                p_title.className = 'activity-details__name';
                                p_title.textContent = sport.nombre;

                                const p_points = document.createElement('p');
                                p_points.className = 'activity-details__points';
                                p_points.textContent = sport.puntos ;
                            
                            contentActivity.appendChild(p_title);
                            contentActivity.appendChild(p_points);

                        article.appendChild(contentIcon);
                        article.appendChild(contentActivity);

                        container.appendChild(article);
                    }
            }

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

        function getDetailActivity(link){
            return function getDetail(){
                window.location.href = link;
            }
        }

        function getDetailActivityFood(link, recipe){
            return function getDetail(){
                localStorage.setItem('recipe', JSON.stringify(recipe))
                window.location.href = link;
            }
        }