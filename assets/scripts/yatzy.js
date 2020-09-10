const playboardcontainer = document.getElementsByClassName('yatzy-playboard__container')[0]; // grabs playboard

const gameOptions = [
    "1-s",
    "2-s",
    "3-s",
    "4-s",
    "5-s",
    "6-s", "sum", "bonus",
    "One pair", 
    "Two pairs",
    "three same",
    "four same",
    "full house",
    "small straight",
    "large straight",
    "chance", "yatzy", "total"
];

const imgDies = [
    
]

function initialiseYatzyBoard() {
    buildPlayBoard();
}

function buildPlayBoard() {

    for (let i = 0; i < gameOptions.length; i++) {
        let gridRow = createElement('div');
        gridRow.classList.add('grid-row');
        gridRow.innerHTML = `<label> ${gameOptions[i]} </label>
        <input class="yatzy-playboard__inputfields" type="text" disabled />`;
        playboardcontainer.appendChild(gridRow);
    }
}





function update(turn){
    for(var i = 0; i < dice.length; i++) {
        document.getElementById("die"+(1+i)).src="assets/images/" + dice[i].value + ".png"

    }
    document.getElementById("turnCount").innerHTML = `${turn}`
    console.log("test")

}

function createElement(element) {
    return document.createElement(element);
}