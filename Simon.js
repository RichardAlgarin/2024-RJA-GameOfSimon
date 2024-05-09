'use strict'; // Strict mode 
// Stores the sequence and the user's inputs
const sequence = [];
let userClicks = 0;
let score = 0;
let isPlayingSequence = false; // Sees if the sequence is being played
let isUserTurn = false; // Sees if its users turn to input

// Colors, start button, and canvas
const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');
const startButton = document.getElementById('start');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d'); // 2D rendering

// New image object
const img = new Image();

// Setting the image source - Logo of Simon
img.src = 'https://www.scientificgames.com/media/itzltogn/simon-logo.png'; // Replace with your image URL

// Waiting for the image to load
img.onload = function() {
    // Draw the image onto the canvas - 0s are x/y cords
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};
// Fetch the image from the API link
fetch("https://picsum.photos/seed/picsum/1920/1080")  // Cool photo of mountain is being pulled from this url
    .then(response => {    // Uses a promis to display the image 
        // Checks if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');  // Error messages that appear in the console if there was an error
        }
        // Return the response as blob (binary large object) (Concentrated data from database)
        return response.blob();
    })
    .then(blob => {
        // Convert the blob to a data URL
        const imageUrl = URL.createObjectURL(blob);
        // Set the background image of the webpage
        document.body.style.backgroundImage = `url(${imageUrl})`;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);  // If error caught play this message
    });

// All attempts to try and get the api to work in the alert response

//function fetchData() {
    //fetch("https://genr8rs.com/api/Content/Fun/GameTauntGenerator?genr8rsUserId=1715215226.9464663c1b7ae70b0&_sInsultLevel=funny")
    //    .then(response => {
    //        if (!response.ok) {
   //             throw new Error('Network response was not ok');
   //         }
  //          return response.json();
  //      })
  //      .then(responseData => {
 //           data = responseData; // Assign fetched data to the data variable
  //      })
  //      .catch(error => {
  //          console.error('There was a problem with the fetch operation:', error);
  //      });
//}

// Generate a random color and add it to the sequence
function addToSequence() {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];   // Math.floor rounds up to nears whole #. Math.random generates a random value between 0 and 1 but never 1. Allows for all answers to be 1 of the 4 colors
    sequence.push(randomColor); // What ever color went with the number is pushed to the sequence
}

// Play the sequence (light up buttons)
function playSequence() {
    isPlayingSequence = true;
    let i = 0;
    const intervalId = setInterval(() => {
        const color = sequence[i];    // Gets current color
        const button = document.getElementById(color);  // Matches color to button
        button.classList.add('active');  // Adds active class
        setTimeout(() => {
            button.classList.remove('active');  // Removes active class 500 milisecond delay
        }, 500);
        i++;  // Next color
        if (i >= sequence.length) {
            clearInterval(intervalId);  // Stops the sequence 
            isPlayingSequence = false;
            isUserTurn = true; // Allow user to click after the sequence is played
        }
    }, 1000);
}

// Handles user's inputs
function handleClick(color) {
    // Check if game is still running
    if (isPlayingSequence || !isUserTurn) return;

    // Adds glowing effect to the clicked button
    const button = document.getElementById(color);
    button.classList.add('active');  // Added to active class
    setTimeout(() => {
        button.classList.remove('active');  // Removed from active
    }, 300);

    // Checks the input if it is correct
    if (color === sequence[userClicks]) {
        userClicks++;   // Moves to the next color
        // Checks if the sequence is complete
        if (userClicks === sequence.length) {
            // Reset user's clicks
            userClicks = 0;
            // Adds 1 to the score
            score++;
            // Adds a new color to the sequence
            addToSequence();
            // Plays the new sequence
            setTimeout(() => {
                playSequence();
            }, 1000);
            isUserTurn = false; // Disable user clicks while sequence is playing
        }
    } else {
        // Game Over
        alert('Game Over! Your Score Is: ' + score); //Tried adding data.message but it keeps coming in as undefined
        // Reset the game
        resetGame();
    }
}

// Resets the game and sets everything back to 0/default
function resetGame() {
    sequence.length = 0;
    userClicks = 0;
    score = 0;
    isPlayingSequence = false;
    isUserTurn = false;
    startButton.style.display = 'block';  // Allows for start button to reappear after disappearing 
}

// Event listener for the "Start" button
startButton.addEventListener('click', () => {
    // Hides start button
    startButton.style.display = 'none';
    addToSequence();  // Creates the first value
    playSequence();  // Plays that first value
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

