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

// grid-rows
let gridRows;



function initialiseYatzyBoard() {
    buildPlayBoard();
    calculateTotal();

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
            <input class="yatzy-playboard__inputfields" type="number" disabled value="0" />`;
            playboardcontainer.appendChild(gridRow);
        }

        for (let j = 0; j < gameSumOptions.length; j++) {
            let gridRow = createElement('div');
            gridRow.classList.add('grid-row');
            gridRow.classList.add('grid-row__right');
            gridRow.dataset.right = j;
            gridRow.innerHTML = `<label class="yatzy-playboard_label"> ${gameSumOptions[j]} </label>
            <input class="yatzy-playboard__inputfields" type="number" value="0" />`;
            playboardcontainer.appendChild(gridRow);
        }
    }
    // stores each grid-row as an array
    // used to calculate total
    gridRows = Array.from(document.querySelectorAll('.grid-row'));
}


function disableRoll() {
   document.getElementById("rollBtn").disabled = true;
}

/*
function frequency(array) {
    let freq = [];

    for (let i = 0; i < array.length; i++) {
        let freqIndex = array[i];
        freq[freqIndex]++;
    }

    return freq;
}

*/

function update(turn){
    for(var i = 0; i < dice.length; i++) {
        document.getElementById("die"+(1+i)).src="assets/images/" + dice[i].value + ".png"

    }
    document.getElementById("turnCount").innerHTML = turn;

}

/**
 * Function to get all inputfields in the DOM.
 * @return array of all inputfields
 */
function getInputFields() {
    let inputfields = Array.from(gridRows.map(x => {
        if (x.dataset.right != 2) {
             return x.childNodes[2];
        }
        return null;
     }));

    return inputfields;
}

function calculateTotal() {
    // grabs inputfields
    let inputfields = Array.from(getInputFields());
    let valueFields = [];

    // iterate over each inputfield and creates an new array without null values
    inputfields.forEach((element, index) => {
        if (element != null) {
            valueFields.push(element.value);
        }
    });

    // calculates the total sum of all input fields
    const total = sum(valueFields);
    
    // grabs total input field and sets it value to (total)
    const inputfieldTotal = document.querySelector('[data-right="2"]').childNodes[2];
    inputfieldTotal.value = total;
}

/**
 * Function to calculate sum of all input fields
 * pre: Arr must an array of numbers
 * @param {*} arr to calculate sum from
 */
function sum(arr) {
    let sum;
    try {
        sum = parseInt(arr.reduce((sum, x) => sum + x));
    } catch(err) {
        console.log(err);
    }
    return sum;
}

/**
 * Function to create an HTML Element
 * @param {*} element to create
 */
function createElement(element) {
    return document.createElement(element);
}