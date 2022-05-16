window.addEventListener('load', getActividades);

        function getActividades(){
            const idProfile = localStorage.getItem('idIntegrante');
            console.log(idProfile);
            fetch('http://localhost:85/FunCho/API/Funcho/listaActividades/'+idProfile)
            .then(response => response.json())
            .then(response =>{  
                console.log(response);
                let container = document.getElementsByClassName('container-activities')[0];

                for(var i = 0; i<response.length; i++){
                    if(response[i].type === 'sport'){
                        console.log(response[i].idTarea);
                        var actividad = getSport(response[i].idTarea);
                        console.log(actividad);
                        const article = document.createElement('article');
                        article.className = 'content-activity';
                        

                            const contentIcon =  document.createElement('div');
                            contentIcon.className = 'content-activity__icon';

                                const icon = document.createElement('i')
                                icon.className = 'fa-solid fa-futbol';

                            contentIcon.appendChild(icon);
                            
                            const contentActivity = document.createElement('div');
                            contentActivity.className = 'content-activity__details';
                            contentActivity.onclick = getDetailActivity('./activity.html?type=sport&name='+actividad.id+'&points=25');
                                const p_title = document.createElement('p');
                                p_title.className = 'activity-details__name';
                                p_title.textContent = actividad.name;

                                const p_points = document.createElement('p');
                                p_points.className = 'activity-details__points';
                                p_points.textContent = 'Puntos: 25 points' ;
                            
                            contentActivity.appendChild(p_title);
                            contentActivity.appendChild(p_points);

                        article.appendChild(contentIcon);
                        article.appendChild(contentActivity);

                        container.appendChild(article);
                    }else if(response[i].type === 'tarea'){

                    }else{

                    }
                }
                
            })
            .catch(err => console.error(err));
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

        function getDetailActivity(link){
            return function getDetail(){
                window.location.href = link;
            }
        }