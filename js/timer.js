var h1 = document.getElementsByTagName('h1')[0];
var start = document.getElementsByClassName('title-option__button');

var sec = 0;
var min = 0;
var hrs = 1;
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
function add() {
    tick();
    h1.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);

    if(hrs>0 || min>0 || sec>0)
    timer();
}
function timer() {
        t = setTimeout(add, 1000);
}

// stop.onclick = function() {
//     clearTimeout(t);
// }
// reset.onclick = function() {
//     h1.textContent = "00:00:00";
//     seconds = 0; minutes = 0; hours = 0;
// }
