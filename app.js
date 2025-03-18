let gameSequence = [];
let userClickedSequence = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0; 

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#high-score"); 

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelUpgrade();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 1000);
}

function levelUpgrade() {
    userClickedSequence = [];
    level++;
    h2.innerText = `Level ${level}`;

    if (level > highScore) {
        highScore = level;
        highScoreDisplay.innerText = `High Score: ${highScore}`; 
    }

    let randomNum = Math.floor(Math.random() * 4);
    let randomColor = btns[randomNum];
    let randomButton = document.querySelector(`.${randomColor}`);
    gameSequence.push(randomColor);
    console.log(gameSequence);
    btnFlash(randomButton);
}

function checkAns(idx) {
    if (userClickedSequence[idx] == gameSequence[idx]) {
        if (userClickedSequence.length == gameSequence.length) {
            setTimeout(levelUpgrade, 950);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> </br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);
        reset();
    }
}

function btnPress() {
    let btn = this;

    
    btn.style.backgroundColor = "black";

    setTimeout(() => {
        btn.style.backgroundColor = ""; 
    }, 100);

    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userClickedSequence.push(userColor);

    checkAns(userClickedSequence.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSequence = [];
    userClickedSequence = [];
    level = 0;
}

highScoreDisplay.innerText = `High Score: ${highScore}`;

// let allBtn = document.querySelectorAll(".btn");
// for (let btn of allBtns) {
//     btn.addEventListener("click", function() {
//         // Change button color to black
//         this.style.backgroundColor = "gray";

//         // Revert back to original color after 100 milliseconds
//         setTimeout(() => {
//             this.style.backgroundColor = ""; // Reset to original color
//         }, 30);

//         // Call the existing button press logic
//         btnPress.call(this);
//     });
// }