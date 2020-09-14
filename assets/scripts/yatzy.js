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


// grid-rows
let gridRows;


let calculations  = [
    calculateOnePair,
    calculateTwoPairs,
    calculateThreeSame,
    calculateFourSame,
    calculateFullHouse,
    calculateSmallStraight,
    calculateLargeStraight,
    calculateChance,
    calculateYatzy,
];

document.getElementById("rollBtn").addEventListener('click', function(){
    thisRound.RollDies()
});

function initialiseYatzyBoard() {
    buildPlayBoard();
    addListner(divs.length); 
    inputListner(getInputFields().length-3, getInputFields());
   
   
}


function buildPlayBoard() {
    if (playboardcontainer) {
        for (let i = 0; i < gameOptions.length; i++) {
            let gridRow = createElement('div');
            gridRow.classList.add('grid-row');
            gridRow.classList.add('grid-row__left');
            gridRow.innerHTML = `<label> ${gameOptions[i]} </label>
            <input class="yatzy-playboard__inputfields" name="${gameOptions[i]}" type="button" value="0"  />`;
            playboardcontainer.appendChild(gridRow);
        }

        for (let j = 0; j < gameSumOptions.length; j++) {
            let gridRow = createElement('div');
            gridRow.classList.add('grid-row');
            gridRow.classList.add('grid-row__right');
            gridRow.dataset.right = j;
            gridRow.innerHTML = `<label class="yatzy-playboard_label"> ${gameSumOptions[j]} </label>
            <input class="yatzy-playboard__inputfields" name="${gameSumOptions[j]}" type="number" value="0" disabled />`;
            playboardcontainer.appendChild(gridRow);
        }
    }
    // stores each grid-row as an array
    // used to calculate total
    gridRows = Array.from(document.querySelectorAll('.grid-row'));
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

function addListner(i) {
    if (i == 0){
        return undefined
    }
    else {
        let a = i-1
        divs[a].addEventListener("click", function() {     
            thisRound.pickDie(a);
        })
        return addListner(a)
    }
}

function inputListner(i, arr){
    if (i == 0){
        return undefined
    }
    else {
        let a = i-1
        arr[a].addEventListener("click", function() {     
            thisRound.pickLable(a)
        })
        return inputListner(a, arr)
    }
}

function lablePicker(i){
    
    getInputFields()[i].style.border = "1px solid red";
    getInputFields()[i].disabled = true;

}




function diePicker(i, arr) {
    let picked = arr;
    if (picked[i] == true) {
        picked[i] = false
        divs[i].style.border = "3px solid black"
    }
    else{
        picked[i] = true
        divs[i].style.border = "3px solid red"
    } 
    return picked
}

function resetDies() {
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.border = "3px solid black"
        
    }
}

function sum(arr) {
    let sum = 0;
    
    for(let i = 0; i < arr.length; i++)
    {
        
        sum = sum + parseInt(arr[i], 10);
    }
    return sum;
}

function calculateSum() {
     // grabs inputfields
     let inputfields = getInputFields().slice(0,6);
     let valueFields = [];

    // iterate over each inputfield and creates an new array without null values
    inputfields.forEach((element, index) => {
        if (element != null) {
            if(element.disabled){
            
            valueFields.push(element.value);
            }
        }
    });
     const total = sum(valueFields);

     document.querySelector('[data-right="0"]').childNodes[2].value = total;

     if(total >= 63) {
        document.querySelector('[data-right="1"]').childNodes[2].value = 50;
     }


}




/*
/**
 * Function to calculate sum of all input fields
 * pre: Arr must an array of numbers
 * @param {*} arr to calculate sum from
 
function sum(arr) {
    let sum = 0;
    try {
        sum = parseInt(arr.reduce((sum, x) => sum + x));
    } catch(err) {
        console.log(err);
    }
    return sum;
}
*/
function calculateTotal() {
    // grabs inputfields
    let inputfields = Array.from(getInputFields()).splice(6);
    let valueFields = [];

    // iterate over each inputfield and creates an new array without null values
    inputfields.forEach((element, index) => {
        if (element != null) {
            if(element.disabled){
            valueFields.push(element.value);
            }
        }
    });

    

    // calculates the total sum of all input fields
    const total = sum(valueFields);
    
    // grabs total input field and sets it value to (total)
    const inputfieldTotal = document.querySelector('[data-right="2"]').childNodes[2];
    inputfieldTotal.value = total;
    return total
}


function updateSingles(i) {
    if (i==1) {
        if(!document.querySelector(`input[name='${gameOptions[i-1]}']`).disabled){
        document.querySelector(`input[name='${gameOptions[i-1]}']`).value=`${calculateSingle(i)}`
        }
    }
    else{
        if(!document.querySelector(`input[name='${gameOptions[i-1]}']`).disabled){
        document.querySelector(`input[name='${gameOptions[i-1]}']`).value=`${calculateSingle(i)}`
        
        }
        return updateSingles(i-1)
    }

}


function updateBoard(i) {
    
    if (i==7) {
        if(!document.querySelector(`input[name='${gameOptions[i-1]}']`).disabled){
        document.querySelector(`input[name='${gameOptions[i-1]}']`).value=`${calculations[i-7]()}`
        }
        return undefined
    }
    else{
        if(!document.querySelector(`input[name='${gameOptions[i-1]}']`).disabled){
        document.querySelector(`input[name='${gameOptions[i-1]}']`).value=`${calculations[i-7]()}`
        }
        return updateBoard(i-1)
    }

}

function disableRoll() {
   document.getElementById("rollBtn").disabled = true;
}

function enableRoll() {
    document.getElementById("rollBtn").disabled = false;
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

function updateDie(turn){
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

function done () {
    if(confirm(`You have got ${calculateTotal()} point \npress to play again`  )){
        location.reload();
    }

}