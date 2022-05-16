const buttonCreate = document.getElementsByClassName('title-option__button')[0];

function redirectCreateWork(){
    window.location.href = './newWork.html';
}

buttonCreate.addEventListener('click', redirectCreateWork);