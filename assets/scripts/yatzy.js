let playboardcontainer = document.getElementsByClassName('yatzy-playboard__container')[0]; // grabs playboard

const divs = document.getElementsByClassName("dice");

const gameOptions = [
    "1-s",
    "2-s",
    "3-s",
    "4-s",
    "5-s",
    "6-s",
    "One pair", 
    "Two pairs",
    "three same",
    "four same",
    "full house",
    "small straight",
    "large straight",
    "chance", "yatzy"
];

const gameSumOptions = ["sum", "bonus", "total"];





function initialiseYatzyBoard() {
    buildPlayBoard();
    

    //ikke færdig, virker ikke, skal også nok smide det i sin egen funktion
    for(var i = 0; i < divs.length; i++){
    document.getElementsByClassName("dice")[i].addEventListener("click", function(){
        if (this.style.border == "3px solid red") {
            this.style.border = "3px solid black";
        }
        if (this.style.border == "3px solid black") {
            this.style.border = "3px solid red";
        }
        
    })
    
    }
}

function buildPlayBoard() {
    if (playboardcontainer) {
        for (let i = 0; i < gameOptions.length; i++) {
            let gridRow = createElement('div');
            gridRow.classList.add('grid-row');
            gridRow.classList.add('grid-row__left');
            gridRow.innerHTML = `<label> ${gameOptions[i]} </label>
            <input class="yatzy-playboard__inputfields" type="text" disabled />`;
            playboardcontainer.appendChild(gridRow);
        }

        for (let j = 0; j < gameSumOptions.length; j++) {
            let gridRow = createElement('div');
            gridRow.classList.add('grid-row');
            gridRow.classList.add('grid-row__right');
            gridRow.innerHTML = `<label class="yatzy-playboard_label"> ${gameSumOptions[j]} </label>
            <input class="yatzy-playboard__inputfields" type="text" disabled />`;
            playboardcontainer.appendChild(gridRow);
        }
    }
}


function disableRoll() {
   document.getElementById("rollBtn").disabled = true;
}


function frequency(array) {
    let freq = [];

    for (let i = 0; i < array.length; i++) {
        let freqIndex = array[i];
        freq[freqIndex]++;
    }

    return freq;
}



function update(turn){
    for(var i = 0; i < dice.length; i++) {
        document.getElementById("die"+(1+i)).src="assets/images/" + dice[i].value + ".png"

    }
    document.getElementById("turnCount").innerHTML = turn;

}

function createElement(element) {
    return document.createElement(element);
}