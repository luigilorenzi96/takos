var startWrap = document.getElementById("start");
var questWrap = document.getElementById("questions-container");
var videoWrap = document.getElementById("videowrap");
var avanzamentoWrap = document.getElementById("avanzamento");
var controlli = document.getElementById("controlli");
var tastoMuto = document.getElementById("mute-controller");
var tastoSkip = document.getElementById('skip-controller');

var domande = ["Scegli il posto in macchina...", "La sveglia sta suonando!", "Pesca una carta:", "Domanda 4?", "Domanda 5?", "Domanda 6?", "Domanda 7?", "Domanda 8?"];
var risp1 = ["Guidatore", "Interrompi", "Probabilit\xE0", "a", "a", "a", "a", "a"];
var risp2 = ["Passeggero", "Ritarda", "Imprevisti", "c", "c", "c", "c", "c"];

var counter = 0;

var primeCinque = 0;
var ultimeTre = 0;

//mostra e nascondi
function nascondi(el1) {
    el1.classList.remove("show");
    el1.classList.add("hide");
}

function mostra(el2) {
    el2.classList.remove("hide");
    el2.classList.add("show");
}

function muto() {
    if (myVideo.muted) {
        myVideo.muted = false;
        tastoMuto.style.textDecoration = "none";
    } else {
        myVideo.muted = true;
        tastoMuto.style.textDecoration = "line-through";
    }
}

startWrap.addEventListener('click', start);
tastoMuto.addEventListener('click', muto);
tastoSkip.addEventListener('click', getDomanda);

function start() {
    nascondi(startWrap);
    mostra(avanzamentoWrap);
    getDomanda();
}

function getDomanda() {
    nascondi(videoWrap);
    myVideo.pause();
    nascondi(controlli);
    mostra(questWrap);
    document.getElementById("question").innerHTML = domande[counter];
    document.getElementById("option1").innerHTML = risp1[counter];
    document.getElementById("option2").innerHTML = risp2[counter];
    if (counter < 8) {
        document.getElementById("bullet" + [counter]).classList.remove('inactive');
        document.getElementById("bullet" + [counter]).classList.add('active');
    }
}

function inviaRisposta(risposta) {
    counter++;
    if (counter <= 5) {
        if (risposta === 1) {
            primeCinque++;
            myVideo.setAttribute('src', './media/' + counter + risposta + '.mp4');
            mostra(controlli);
        } else {
            myVideo.setAttribute('src', './media/' + counter + risposta + '.mp4');
            mostra(controlli);
        }
    } else {
        if (risposta === 1) {
            ultimeTre++;
            myVideo.setAttribute('src', './media/' + counter + risposta + '.mp4');
            mostra(controlli);
        } else {
            myVideo.setAttribute('src', './media/' + counter + risposta + '.mp4');
            mostra(controlli);
        }
    }

    nascondi(questWrap);
    mostra(videoWrap);
    console.log(primeCinque, ultimeTre, 'domanda ' + counter);

    if (counter < 8) {
        document.getElementById('myVideo').addEventListener('ended', getDomanda, false);
    } else {
        document.getElementById('myVideo').addEventListener('ended', getResults);
    }
}

function getResults() {
    if (primeCinque >= 3 && ultimeTre >= 2) {
        location.href = "https:\\google.com";
        console.log('primo personaggio')
    } else if (primeCinque >= 3 && ultimeTre < 2) {
        //location.href = "https";
        console.log('secondo personaggio')
    } else if (primeCinque < 3 && ultimeTre >= 2) {
        //location.href = "https";
        console.log('terzo personaggio')
    } else {
        //location.href = "https";
        console.log('quarto personaggio')
    }
}