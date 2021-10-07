//===================VARIABLES
//access elements needed to roll dice
let hTagTotal = document.getElementById("diceTotal");
let hTagResult = document.getElementById("diceResult");

let h_tag_dif = document.getElementById("difficultyMessage")

let hTagRoll4 = document.getElementById("rolld4");
let hTagRoll6 = document.getElementById("rolld6");
let hTagRoll12 = document.getElementById("rolld12");
let hTagRoll20 = document.getElementById("rolld20");

let easyMode = document.getElementById("easyMode")
let mediumMode = document.getElementById("mediumMode")
let hardMode = document.getElementById("hardMode")

let dice = [hTagRoll4, hTagRoll6, hTagRoll12, hTagRoll20] //the 'buttons' clicked
let Maxs = [4,6,12,20] //maximum rolls for each dice roll
let difficulties = [easyMode,mediumMode,hardMode]
let d_numbers = [20,30,40]

let rollTotal = 0;      // Total of dice rolls
let resultsArray = [];  //stores concurrent roles
let maxTarget = 20;     //max score to hit before winning


//===================FUNCTIONS
function bark(input)    //used to shorten the console.log statment
{
    console.log(input);
}

function diceRoll(min, max)
{
    let result = Math.floor(Math.random() * (max - min + 1) + min);
    hTagResult.innerHTML = String("You rolled a "+result);
    bark("Result of dice roll (between "+min+" and "+max+"): "+result);
    return result;
    
}

//===================EVENT LISTENERS

//this loop assigns listeners to each difficulty button
for (let i = 0; i < difficulties.length; i++) 
{
    difficulties[i].addEventListener('click', (event) =>{
        let newDifficulty = d_numbers[i];
        bark("Old difficulty was set to: " +maxTarget);
        maxTarget = newDifficulty;
        bark("New difficulty was set to: " +maxTarget);
        h_tag_dif.innerHTML = ("Roll above "+maxTarget+" in total, without rolling a 1");

    })
}

// this loop assigns click listeners to each dice roll button...
for (let i = 0; i < dice.length; i++)   
{
    
    dice[i].addEventListener('click', (event) =>
        {
            let currentResult = diceRoll(1,Maxs[i]);

            if(currentResult == 1)
            {  
                bark("The current roll was 1")
                hTagResult.innerHTML = ("You rolled a 1. You lose :(")
                rollTotal = 0;
                resultsArray.length=0;
                hTagTotal.innerHTML = (rollTotal);
            }

            else if((currentResult + rollTotal) > maxTarget)
            {
                bark("The roll total was over "+maxTarget)
                hTagResult.innerHTML = ("You rolled over "+maxTarget+"!!! WINNAR! :D")
                rollTotal = 0;
                hTagTotal.innerHTML = (rollTotal);
                resultsArray.length=0;
            }
           

            else
            {
                bark("The roll total was NOT over maxTarget and the roll was NOT 1")
                let checkRes = rollTotal + currentResult
                if(checkRes >= maxTarget)
                {
                    bark("Final check. Roll total WAS greater than 20...")
                    hTagTotal.innerHTML = ("Winnar! You rolled "+maxTarget+" or more in total!");
                    resultsArray.length=0;
                }
                else
                {
                    bark("Final check. Roll total was NOT greater than 20. Carrying on...")
                    hTagTotal.style.fontFamily = "Courier";
                    hTagTotal.style.fontSize = "14px";
                    rollTotal += currentResult
                    resultsArray.push(currentResult)
                    hTagTotal.innerHTML = (rollTotal+"<br/>Current run: "+resultsArray);
                    
                }
                
            }
        })
}


