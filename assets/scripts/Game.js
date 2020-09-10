let roll_btn = document.getElementById("rollBtn");

roll_btn.onclick = RollDie;

const dice = [new Die(), new Die(), new Die(), new Die(), new Die()];
 

function Die() {
    this.value = 0;

    this.roll = function(){
        this.value = Math.floor(Math.random() * 6) + 1;
        console.log("rolling")
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






    
    
