let roll_btn = document.getElementById("rollBtn");

const dice = [new Die(), new Die(), new Die(), new Die(), new Die()];
const thisRound = new gameRound();

let frequency = [0, 0, 0, 0, 0, 0, 0]


roll_btn.onclick = thisRound.RollDies;

function gameRound ()
{
    this.frequency = [0, 0, 0, 0, 0, 0, 0]

    this.turn = 0
    
    this.RollDies = function() {
        for(var i = 0; i < dice.length; i++) {
            dice[i].roll();
            frequency[dice[i].getValue()]++;
        }
        console.log()
        this.turn++
        update(this.turn);
        return getValues();
    }
}

/*
function RollDies () {
        for(var i = 0; i < dice.length; i++) {
            dice[i].roll();
            frequency[dice[i].getValue()]++;
            console.log(frequency);
        }
        console.log()
        update();
        return getValues();
    }

*/

function Die() {
    this.value = 0;

    this.roll = function(){
        this.value = Math.floor(Math.random() * 6) + 1;
    }

    this.getValue = function () {
    return this.value;
    }
}

function RollDie () {
    for(var i = 0; i < dice.length; i++) {
        dice[i].roll();
        console.log(dice[i])
    }
    console.log()
    update();
    return getValues();
}



function getValues() {
    return [dice[0].getValue(), dice[1].getValue(), dice[2].getValue(), dice[3].getValue(), dice[4].getValue()];
}






    
    
