function el(id){
    return document.getElementById(id);
}
function create(w){
    return document.createElement(w);
}
var sound = new Audio(); // neues Audio object
sound.src = "sound/card-flip.wav";

var success = new Audio(); // neues Audio object
success.src = "sound/success.mp3";

var achi = new Audio(); // neues Audio object
achi.src = "sound/achievement.wav";

var bilder, bilderMix, z, bild1, bild2, erfolg, clicks, startZeit;

//initialisieren aller globalen variablen
// Startwerte setzen für  die newGame function
function initVaris(){
    z = 0; // zählt 1.Bild ---------- 2. Bild
    bilder = [];
    bilderMix = [];
    bild1; //speichert das erster Bildobject
    bild2;//speichert das zweiter Bildobject
    erfolg = 0;//zahl die gefundenen Paare
    clicks = 0;
    startZeit;
} //ENDE ini

// das sortiere bilder array wird mit Bildfaden gefüllt
function bilderArrayFuellen(){
    // 1. 8 bildpaare
    // Bildpfade
    var pfad
    for (var i = 1; i < 9; i++){
        pfad = "img_1/p_" + i + ".gif";
        bilder.push(pfad);
        bilder.push(pfad);
        
    }
    
}

function mischen (){
    bilder = []; //reset
    bilderMix = []; //reset
    bilderArrayFuellen(); //reset
    
    var anzahl = bilder.length;
    var index;
    
    for (var i = 0; i < anzahl; i++){
        index = Math.floor(Math.random()*bilder.length); // 1. zufälliger index
        var wert = bilder.splice(index,1)[0]; // 2. Wert aus images löschen
        bilderMix.push(wert); // 3. Wert in imageMix einfügen
   
    } //ENDE for
   // console.log(bilder);
  //  console.log(bilderMix);
} // ENDE mischen

// läd die 16 img Elemente
function bilderLaden(){
    
    el('game').innerHTML = "";
    var img;
    for (var i = 0; i < 16; i++){
        img = create('img'); //1. Element erzeugen
        img.src = 'img_1/memory.png'; //2. Eingenschaften vergeben
        // bild.id = "bild"+i;
        img.addEventListener('click',checkGame);
        img.setAttribute('data-nr',i);
        el('game').appendChild(img); //3. Element einfügen 
    }
}
function checkGame(){
    clickCounter(); // clicks counter
    sound.play();
    z++;
    if (z == 1){
        //1. Bild
    var index = parseInt(this.getAttribute('data-nr'));  
    this.src = bilderMix[index];
    this.removeEventListener('click',checkGame);
    bild1 = this;
    }
    
    if (z == 2){
         //2. Bild
    var index = parseInt(this.getAttribute('data-nr'));  
    this.src = bilderMix[index];
    this.removeEventListener('click',checkGame);
    bild2 = this;
        
        if (bild1.src == bild2.src){
            z = 0;
            success.play();
            // Gleiche Bilder
            spielEnde();
        } else {
            // Ungleiche Bilder
            setTimeout (unGleich, 900);
        }
        
    
    }

}
function timeCounter(){
    var stopTime = new Date();
    var diff = Math.floor((stopTime - startZeit)/1000);
    el('zeit').innerHTML = "You took " + diff + " seconds"
    return diff;
}

function clickCounter (){
    clicks++;
    
    if (clicks == 1){
        el('klicks').innerHTML = clicks + " move";
        // ZeitStempel für den Spielstart
        startZeit = new Date();
    }else {
        el('klicks').innerHTML = clicks + " moves";
    }
    
}

function spielEnde(){
    erfolg ++;
    if (erfolg == bilderMix.length/2){
       achi.play();
       timeCounter();
    }
}

function unGleich(){
    bild1.src = 'img_1/memory.png';
    bild2.src = 'img_1/memory.png';
    bild1.addEventListener('click', checkGame);
    bild2.addEventListener('click', checkGame);
    z = 0;
}
function newgame() { //set up new game
    bilderLaden();
    mischen();
    clicks = 0;
    erfolg = 0;
    el('klicks').innerHTML = "";
    el('zeit').innerHTML = ""
}

el('start').addEventListener('click',newgame);

initVaris();
bilderLaden();
bilderArrayFuellen();
mischen();