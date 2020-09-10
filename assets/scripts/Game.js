

const dice = [new Die(), new Die(), new Die(), new Die(), new Die()];
const thisRound = new gameRound();
const picked = [false, false, false, false, false]

let frequency = [0, 0, 0, 0, 0, 0, 0]
let turn = 0

document.getElementById("rollBtn").addEventListener('click', function(){
    thisRound.RollDies(picked)
});



function gameRound ()
{
    checkIfDone = function(){
        return (turn >= 3)
    }

    this.RollDies = function(arr) {
        for(var i = 0; i < dice.length; i++) {
            if(!arr[i]){
            dice[i].roll();
            frequency[dice[i].getValue()]++;
            }
        }
        console.log()
        turn++;
        update(turn);
        console.log(turn);
        //console.log(checkIfDone())
        if(checkIfDone()){
            disableRoll();
        }
        return getValues();
    }

}

function Die() {
    this.value = 0;

    this.roll = function(){
        this.value = Math.floor(Math.random() * 6) + 1;
    }

    this.getValue = function () {
    return this.value;
    }
}


function getValues() {
    return [dice[0].getValue(), dice[1].getValue(), dice[2].getValue(), dice[3].getValue(), dice[4].getValue()];
}






    
    
