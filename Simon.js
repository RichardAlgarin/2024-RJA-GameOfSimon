// Stores collor sequence and user inputs
const sequence = [];
let userClicks = 0;

// References to the color buttons
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');
const startButton = document.getElementById('start');

// Generate a random color and adds it to the sequence
function addToSequence() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
}

// Play the sequence (light up buttons)
function playSequence() {
    let i = 0;
    const intervalId = setInterval(() => {
        const color = sequence[i];
        const button = document.getElementById(color);
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 500);
        i++;
        if (i >= sequence.length) {
            clearInterval(intervalId);
        }
    }, 1000);
}

// Handle user inputs
function handleClick(color) {
    // Sees if game is still running
    if (userClicks >= sequence.length) return;

    // Sees if input is right
    if (color === sequence[userClicks]) {
        // Adds glowing effect to the clicked button
        const button = document.getElementById(color);
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 300);
        // Moves to the next color
        userClicks++;
        // Checks if the sequence is right
        if (userClicks === sequence.length) {
            // Reset user clicks
            userClicks = 0;
            // Adds a new color to the sequence
            addToSequence();
            // Plays the new sequence
            setTimeout(() => {
                playSequence();
            }, 1000);
        }
    } else {
        // Wrong color
        alert('Game Over!');
        // Reset the game
        resetGame();
    }
}

// Resets the game
function resetGame() {
    sequence.length = 0;
    userClicks = 0;
    startButton.style.display = 'block'; 
}

// Event listener for the "Start" button
startButton.addEventListener('click', () => {
    // Hides start button
    startButton.style.display = 'none';
    addToSequence();
    playSequence();
});

// Event listeners for color buttons
greenButton.addEventListener('click', () => {
    handleClick('green');
});
yellowButton.addEventListener('click', () => {
    handleClick('yellow');
});
blueButton.addEventListener('click', () => {
    handleClick('blue');
});
redButton.addEventListener('click', () => {
    handleClick('red');
});
