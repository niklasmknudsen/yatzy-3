const dice = [new Die(), new Die(), new Die(), new Die(), new Die()];

let tempPicked = [false, false, false, false, false];
let picked = [false, false, false, false, false]
const thisRound = new gameRound();
let frequency = [0, 0, 0, 0, 0, 0, 0]
let turn = 0


/**
 * Function to hold gameround functions 
 */
function gameRound ()
{
    
    /**
    * checking if roound is donw
    */
    checkIfDone = function(){
        return (turn >= 3)
    }

    /**
    * Rolling the dies
    * @return array of all diesvalues
    */
    this.RollDies = function() {
        picked=[...tempPicked]

        for(var i = 0; i < dice.length; i++) {
            if(!picked[i] && turn != 0){
            frequency[dice[i].getValue()]--;
            }
        }
       
        turn++;
        for(var i = 0; i < dice.length; i++) {
            if(!picked[i]){
            dice[i].roll();
            frequency[dice[i].getValue()]++;
            }
        }
        
        updateDie(turn);
        
        //console.log(checkIfDone())
        if(checkIfDone()){
            disableRoll(); 
                       
        }
        updateSingles(6);
        updateBoard(15);
        return getValues();

    }


    /**
    * Picking a dies in game round
    * @param {int} i what die picked
    */
    this.pickDie = function(i){
        if (picked[i] == false && turn != 0) {
            tempPicked = diePicker(i, tempPicked);
        }
    }
    
     /**
    * Picking a lable in game round
    * @param {int} i what lable picked
    */
    this.pickLable = function(i){
        if (!dice[0].value == 0) {
        lablePicker(i);
        turn = 0;
        tempPicked = [false, false, false, false, false];
        picked = [false, false, false, false, false]
        frequency = [0, 0, 0, 0, 0, 0, 0]
        calculateSum();
        calculateTotal();        
        resetDies();
        
        if(checkDone()){
            done();
            disableRoll(); 
        }
        else{
        enableRoll();
        this.RollDies();
        }
    }
        

    }

}

    /**
    * checking if game is done
    */
function checkDone(){
    let done = true;
    getInputFields().slice(0,15).forEach((element, index) => {
        if (element != null) {
            if(!element.disabled){
                done = false;
            }
        }

    })
    return done
}
    /**
    * the dies and it's logic
    */
function Die() {

     /**
    * the dies value
    */
    this.value = 0;

     /**
    * roll dies 
    */
    this.roll = function(){
        this.value = Math.floor(Math.random() * 6) + 1;
    }

     /**
    * get dies value
    */
    this.getValue = function () {
    return this.value;
    }
}

    /**
    * get all dies values
    */
function getValues() {
    return [dice[0].getValue(), dice[1].getValue(), dice[2].getValue(), dice[3].getValue(), dice[4].getValue()];
}






    
    
