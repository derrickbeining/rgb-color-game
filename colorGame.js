function generateRandomRGB() {
    "use strict";
    var rgb = [],
        i;
    for (i = 0; i < 3; i++) {
        rgb.push(Math.floor(Math.random() * (256)));
    }
    return "rgb(" + rgb.join(', ') + ")";
}

function generateRandomRGBColors(n) {
    "use strict";
    var arr = [],
        i;
    for (i = 0; i < n; i++) {
        arr.push(generateRandomRGB());
    }
    return arr;
}

var colors = generateRandomRGBColors(6);


function pickColor() {
    "use strict";
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

var h1 = document.querySelector("h1");
var messageDisplay = document.getElementById("message");
var pickedColor = pickColor();
var pickedColorDisplay = document.querySelector("#pickedColorDisplay");
var resetButton = document.getElementById("reset");
var squares = document.querySelectorAll(".square");
var easyButton = document.getElementById("easyButton");
var hardButton = document.getElementById("hardButton");
pickedColorDisplay.textContent = pickedColor;


function applyColorsToSquares() {
    "use strict";
    var i;
    for (i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style.background;
            if (clickedColor === pickedColor) {
                winResponse(pickedColor);
            } else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function toggleHardSquares () {
    var i = 3;
    for (i; i < squares.length; i++) {
        squares[i].classList.toggle("hide");
    }
}

function resetGame (difficulty) {
    if (difficulty === "hard") {
        colors = generateRandomRGBColors(6);
    } else if (difficulty === "easy") {
        colors = generateRandomRGBColors(3);
    }
    pickedColor = pickColor();
    pickedColorDisplay.textContent = pickedColor;
    applyColorsToSquares();
    h1.style.background = null;
    messageDisplay.textContent = null;
    resetButton.textContent = "New Colors";
}


easyButton.addEventListener("click", function () {
    if (!easyButton.classList.contains("selected")) {
        resetGame("easy");
        toggleHardSquares();
    }
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
});

hardButton.addEventListener("click", function () {
    if (!hardButton.classList.contains("selected")) {
        resetGame("hard");
        toggleHardSquares();
    }
    easyButton.classList.remove("selected");
    hardButton.classList.add("selected");
});


function winResponse(color) {
    "use strict";
    var i;
    messageDisplay.textContent = "Correct!";
    resetButton.textContent = "Play Again?";
    h1.style.background = pickedColor;
    for (i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

resetButton.addEventListener("click", function () {
    "use strict";
    if (hardButton.classList.contains("selected")) {
        resetGame("hard");
    } else if (easyButton.classList.contains("selected")) {
        resetGame("easy");
    }
});


applyColorsToSquares();