let playboardcontainer = document.getElementsByClassName('yatzy-playboard__container')[0]; // grabs playboard

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
    getDieValues();
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


function getDieValues() {
    let dice = Array.from(document.querySelectorAll('dice'));

    let resultSet = frequency(dice);
    console.log(resultSet);
}


function frequency(array) {
    let freq = [];

    for (let i = 0; i < array.length; i++) {
        let freqIndex = array[i];
        freq[freqIndex]++;
    }

    return freq;
}



function createElement(element) {
    return document.createElement(element);
}