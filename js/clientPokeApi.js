window.addEventListener('load', getAvatar);

async function getAvatar(){
    let idPokemon = [25, 6, 7, 39, 133, 94, 150, 151, 249, 143, 4, 1, 135, 80, 45];

    const baseUrl = "https://pokeapi.co/api/v2/pokemon";
    const appNode = document.getElementsByClassName('container-family')[0];
    for(var i=0; i<idPokemon.length; i++){

        await fetch(baseUrl + '/' + idPokemon[i])
        .then(response => response.json())
        .then(response => {
            console.log(response.name)
            const label = document.createElement('label');
            label.className = 'container-input__radio';
            label.htmlFor = 'avatar';

                const inputRadio = document.createElement('input')
                inputRadio.type = 'radio';
                inputRadio.name = 'avatar';
                inputRadio.id = 'avatar';

                const article = document.createElement('article');
                article.className = 'container-member';

                    const picture = document.createElement('picture');
                    picture.className = 'container-profile';

                        const img = document.createElement('img');
                        img.src = response.sprites.front_default;
                        img.alt = response.name;
                        
                    picture.appendChild(img);
                
                article.appendChild(picture);
            label.appendChild(inputRadio);
            label.appendChild(article);

            appNode.appendChild(label);
        })
        .catch(err => console.error(err));
    }
}