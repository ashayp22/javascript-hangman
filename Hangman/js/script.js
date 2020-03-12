
var miss = 0; //for guesses that weren't right
var answer = ""; //the answer that the guesses are compared, answer needs to have a value because if it doesn't, comparing it would return undefined
var user; //user guesses
var found = false; //boolean for double for loop
var guessList = ""; //guesses that user made
var letter; //letter for double for loop
var won = 0; //times user won
var lost = 0; //times user lost
var difficulty = 0; //difficulty of game
var correct = 0; //for guesses that were right
var score = [0, 0, 0, 0]; //scores of players 1-4
var gameOver = false;
var pictArray = ["File_001.png", "File_002.png", "File_003.png", "File_004.png", "File_005.png", "File_006.png", "File_007.png" ];
var spongeArray = ["Sponge1.png", "Sponge2.png", "Sponge3.png", "Sponge4.png", "Sponge5.png", "Sponge6.png", "Sponge7.png"];
var pokeArray = ["Poke1.png", "Poke2.png", "Poke3.png", "Poke4.png", "Poke5.png", "Poke6.png", "Poke7.png"];
var bugsArray = ["Bugs1.png", "Bugs2.png", "Bugs3.png", "Bugs4.png", "Bugs5.png", "Bugs6.png", "Bugs7.png"];

var currentPict = pictArray;
var multi = 1; //amount of players playing
var playerTurn = 0; //current players turn
var impossibleArray = []; //array of impossible category words
var impossibleString = ""; //string of impossible category words
var answersArray = [""];//this array consists of all answers chosen by the computer, and starts equaling to ["] because it needs to have answer in it, which is also "

function onLoad() {
    $.get("resources/text1.txt", function (contents) {

           impossibleString = contents;


    });
}


function chooseImage(x) { //choose theme ot set of image(all pictures are original)
    if(x === 1) {
        currentPict = pictArray; //regular
    } else if(x === 2) {
        currentPict = spongeArray; //spongebob
    } else if(x === 3) {
        currentPict = pokeArray; //pokemon
    } else {
        currentPict = bugsArray; //bugs bunny
    }
}

function chooseGameMode(x) {
    document.getElementById("type").style.visibility = "hidden"; //sets difficulty dropdown to hidden
    document.getElementById("image").style.visibility = "hidden"; //sets set of image dropdown to hidden
    document.getElementById("ins").style.visibility = "hidden"; //sets instructions button to hidden
    multi = x; //amount of players is set
    if(x === 1) {
        document.getElementById("dif").style.visibility = "visible"; //this allows the player to choose the difficulty
    } else {
        startMulti(); //this starts the game right away for multiplayer
    }
}




function Dif(x) { //gets difficulty
    difficulty = x;
    changeColor("a" + String.fromCharCode(difficulty+96));
    startSingle(); //now the single player game starts
}


function changeColor(x) { //change color of button

    document.getElementById(x).style.background = "#d9d57b";
}




function setUpDisplay() { //set up the display into "_ _ _ " format
    for(var i = 0; i < answer.length; i++) {
        if(i === answer.length-1) {
            document.getElementById("text").innerHTML += " _";
        } else {
            document.getElementById("text").innerHTML += "_ ";
        }
    }
}

function lowerDisplayVisible() { //makes the menu with Start and Reset Button visible, and
    document.getElementById("menu").style.visibility = "visible";
    document.getElementById("info").style.visibility = "visible";
    document.getElementById("guesses").style.visibility = "visible";



        for(var i = 0; i < multi; i++ ) {
            document.getElementById("score" + (i+1)).style.visibility = "visible";

        }
    if(multi > 1) {
        document.getElementById("won").style.visibility = "hidden";
        document.getElementById("lost").style.visibility = "hidden";
    }

}


function startSingle() { //starts game only for single player

    lowerDisplayVisible();
    if(difficulty === 4) {


        setUpImpossible();


        document.getElementById("category").innerHTML = "Category: Impossible";

    } else {

        setUpDifficulties(); //from easy-hard

        setUpDisplay();


    }

}

function startMulti() {
    //type = true;

    document.getElementById("reset").value = "Next Players Turn";
    if(playerTurn === multi) {
        playerTurn = 0;

    }


    while(checkUser(answer) < 4) {
        answer = prompt("Choose a real word that player #" + (playerTurn + 1) + " has to guess(no peeking)?");
        answer = answer.toLowerCase();
    }

    var category = prompt("What is the category of the word?");
    lowerDisplayVisible();
    setUpDisplay();
    difficulty = 1;
    document.getElementById("category").innerHTML = "Category: " + category;
}

function setUpDifficulties() { //for difficulties from easy to hard
    var Sports = ["football", "basketball", "soccer", "baseball", "wrestling", "cricket", "swimming", "badminton", "hockey", "polo", "curling", "gymnastics", "bossaball", "unicycling", "weightlifting", "chess"];
    var Cities = ["chicago", "houston", "tokyo", "london", "paris", "beijing", "istanbul", "amsterdam", "bangkok", "berlin", "moscow", "mumbai", "pyongyang", "durban", "timbuktu"];
    var Animals = ["cat", "dog", "lion", "fish", "snake", "rhinoceros", "stingray", "elephant", "turtle", "parrot","coati", "hog", "chipmunk", "chimpanzee", "bighorn"];
    var Careers = ["doctor", "teacher", "engineer", "salesman", "custodian", "actor", "accountant", "nurse", "athlete", "technician", "biologist", "chiropractor", "composer", "coroner", "economist"];
    var NBA = ["bulls", "cavaliers", "thunder", "warriors", "celtics", "knicks", "pacers", "heat", "mavericks", "lakers", "rockets", "raptors", "clippers", "nets", "suns"];

    while(differentWord() !== false) {


        var randNum = getRandomInt(1, 5);

        var upperBound = (5 * difficulty) - 1;
        var lowerBound = upperBound - 4;
        //for random category
        if (randNum === 1) {
            answer = Sports[getRandomInt(lowerBound, upperBound)];

            document.getElementById("category").innerHTML = "Category: Sports";
        } else if (randNum === 2) {
            answer = Cities[getRandomInt(lowerBound, upperBound)];

            document.getElementById("category").innerHTML = "Category: Cities";
        } else if (randNum === 3) {
            answer = Animals[getRandomInt(lowerBound, upperBound)];

            document.getElementById("category").innerHTML = "Category: Animals";
        } else if (randNum === 4) {
            answer = Careers[getRandomInt(lowerBound, upperBound)];

            document.getElementById("category").innerHTML = "Category: Careers";
        } else {
            answer = NBA[getRandomInt(lowerBound, upperBound)];

            document.getElementById("category").innerHTML = "Category: NBA Teams";
        }
        //alert(answer);
    }
    answersArray.push(answer);

}


function setUpImpossible() { //for impossible difficulty
    impossibleArray = impossibleString.split(","); //adds all words into array, separating by comma
    while (differentWord() !== false) {
        var randInt = getRandomInt(0, 120); //gets rand int between 0-120
        answer = impossibleArray[randInt]; //picks random word
        //alert(answer);
    }
    setUpDisplay(); //sets up lower display
    answersArray.push(answer);

}


function differentWord() { //makes sure that word chosen by the computer wasn't already guessed
    var boolean = false;
    for(var z = 0; z < answersArray.length; z++) {
        if (answersArray[z] === answer) {
            boolean = true; //word that computer generates was generated previously
        }
    }
    return boolean;
}


function Guess() { //make a guess
    var display = "";
    correct = 0;


    found = false;

    user = document.getElementById("user").value;
    user = user.toLowerCase();

    if (checkUser(user) === 4) {

        guessList += user;
        for (var i = 0; i < answer.length; i++) {
            if (user === answer[i]) { //if the users letter is found somewhere in the answer
                found = true;

            }
        }

        if (found === false) { //if wasn't found then don't change anything and add a letter to missed letters
            miss += 1;
            document.getElementById("lives").innerHTML = "Lives: " + (7 - miss);
            document.getElementById("misses").innerHTML += user + ",";
            document.getElementById("picture").src = "resources/" + currentPict[miss - 1];

            Score("lose", user);
        } else if (found === true) { //if a letter was found then you would rewrite the entire display

            Score("win", user);
            rewriteDisplay(display);
        }

    } else {
        alert("invalid response, please try again");
    }
    checkWinLose();
}


function checkUser(x) { //checks what the user typed for single and multi player
    var format = 0;
    var boolean = true;
    var num = 0;
    if(x.length === 1 && x === user) { //if the word has one letter, for single player
        format += 1;
    }
    for(var j = 0; j < x.length; j++) { //if the characters are lowercase letters
        if(x.charCodeAt(j) >= 97 && x.charCodeAt(j) <= 122) {
            num += 1;
        }
    }
    if(num === x.length) {
        format += 1;
    }
    for(var i = 0; i < guessList.length; i++) { //if the word isn't already in the array for guesses
        if(guessList.substring(i, i+1) === x) {
            boolean = false;
        }
    }
    if(boolean === true) {
        format += 1;
    }
    if(gameOver === false) { //if the game is over and the player clicks enter again
        format += 1;
    }
    if(x.length > 2 && multi > 1 && x === answer) { //this is for multiplayer to check if the word is longer than 2 letters
        format += 1;
    }
    return format;
}

function rewriteDisplay(display) {//resets the display with double for loop
    document.getElementById("text").innerHTML = "";

    for (var j = 0; j < answer.length; j++) {

        found = false; //sets is found to false
        for (var k = 0; k < guessList.length; k++) {

            if (answer.substring(j, j + 1) === guessList.substring(k, k + 1)) { //compares the string of guesses to each of the answers letters
                found = true;
                letter = guessList[k];

            }
        }
        if (found === true) { //if a letter was found for one of the correct answers letters


            display += " " + letter;
            correct += 1;
        } else if (found === false) { //if a letter wasn't found for one of the correct answers letters

            display += "_ "
        }
    }
    document.getElementById("text").innerHTML = display;




}



function Reset() { //resets all global variables and arrays, along with clearing the text
    //resets display
    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("header").innerHTML = "";
    document.getElementById("lives").innerHTML = "Lives: 7";
    document.getElementById("text").innerHTML = "";
    document.getElementById("misses").innerHTML = "";
    document.getElementById("user").value = "";
    //resets hangman picture
    document.getElementById("picture").src = "resources/File_000.png";
    //resets all global variables except win, lose and multiplayer
    miss = 0; //for guesses that weren't right
    answer = ""; //the answer that the guesses are compared
    user = ""; //user guesses
    found = false; //boolean for double for loop
    guessList = ""; //guesses that user made
    letter = ""; //letter for double for loop
    difficulty = 0; //difficulty of game
    correct = 0; //for guesses that were right
    gameOver = false;
    //color for difficulty buttons
    document.getElementById("aa").style.backgroundColor = "#d9ce12";
    document.getElementById("ab").style.backgroundColor = "#d9ce12";
    document.getElementById("ac").style.backgroundColor = "#d9ce12";
    document.getElementById("ad").style.backgroundColor = "#d9ce12";


    //document.getElementById("allScores").style.visibility = "hidden";
    if(multi > 1) { //if the game is multiplayer
        playerTurn += 1;
        startMulti();
    }
}

function resetAll() {//resets all, including what type of game it is, single or double player
    //type = false;
    multi = 1;
    Reset();
    //displays
    document.getElementById("user").value = "";
    document.getElementById("reset").value = "RESTART";
    document.getElementById("won").innerHTML = "Games won:";
    document.getElementById("lost").innerHTML = "Games lost:";
    document.getElementById("score1").innerHTML = "Player 1 Score: ";
    document.getElementById("score2").innerHTML = "Player 2 Score: ";
    document.getElementById("score3").innerHTML = "Player 3 Score: ";
    document.getElementById("score4").innerHTML = "Player 4 Score: ";
    //visibility
    document.getElementById("type").style.visibility = "visible";
    document.getElementById("image").style.visibility = "visible";
    document.getElementById("ins").style.visibility = "visible";
    //hidden
    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("dif").style.visibility = "hidden";
    document.getElementById("info").style.visibility = "hidden";
    document.getElementById("guesses").style.visibility = "hidden";
    document.getElementById("score1").style.visibility = "hidden";
    document.getElementById("score2").style.visibility = "hidden";
    document.getElementById("score3").style.visibility = "hidden";
    document.getElementById("score4").style.visibility = "hidden";
    //variables for win, lose and multiplayer
    won = 0;
    lost = 0;
    answersArray = [""];

    //document.getElementById("single").style.backgroundColor = "#f64f38";
    //document.getElementById("double").style.backgroundColor = "#f64f38";
    //resets the scores for all players
    score = [];
    score = [0, 0, 0, 0];
    playerTurn = 0;


}






function keyDown(e) {//for restart, guess and restart all
    if(e.keyCode === 13) { //enter
        Guess();
    }
    if(e.keyCode === 16) { //shift
        Reset();
    }
    if(e.keyCode === 18) { //alt
        resetAll();
    }
}





function checkWinLose() { // check if player won or lost
    if (correct === answer.length) { //if you won the game
        document.getElementById("header").innerHTML = "You Won!";
        won += 1;
        document.getElementById("won").innerHTML = "Games won: " + won;
        gameOver = true;
    }



    if (miss === 7) { //if you lost the game
        document.getElementById("header").innerHTML = "You Lost!";
        lost += 1;
        document.getElementById("lost").innerHTML = "Games lost: " + lost;
        gameOver = true;
        document.getElementById("text").innerHTML = answer;

    }

}



function Score(x, y) { //update score of player
    var time = 0;

    if(x === "lose") {
        score[playerTurn] -= 5*difficulty;
    } else if(x === "win") {
        for(var i = 0; i < guessList.length; i++) {
            if(y === guessList.substring(i, i+1)) {
                time += 1;
            }
        }
        if(time === 1) {
            score[playerTurn] += 10*difficulty;
        }
    }
    document.getElementById("score"+(playerTurn+1)).innerHTML = "Player " + (playerTurn+1) + " Score: " + score[playerTurn];

}


function getRandomInt(min, max) { //return random int
    return Math.floor(Math.random() * (max - min)) + min;
}

function help() {
    alert("You are playing hangman, a game where you try to guess the word with a limited amount of lives. First, select one of the four themes. Next, choose the amount of players playing, from 1-4. There are 4 game modes, which affect your score based on how hard it is. Type a letter in the text box and click 'Make Guess' or press the enter button to make a guess. Also, click 'RESET' or press the shift button to restart the round. Finally, click 'RESET ALL' or press the alt button to choose a different amount of players. The tips for winning this game is to never type the whole word, choose vowels first, and never doubt yourself.");
}




