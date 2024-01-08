// Define a class for objects to be found
class ObjectToFind {
    constructor(name, x, y, width, height) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.found = false; // Flag to track if the object has been found
    }

    // Check if the object is clicked based on mouse coordinates
    isClicked(mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height
        );
    }
}

// Get the canvas and its 2D rendering context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the dimensions of the canvas
canvas.width = 400;
canvas.height = 300;

// Array of objects to be found in the scene
const objectsToFind = [
    new ObjectToFind("Key", 375, 560, 20, 30), // Replace with your image-specific objects
    // Add more objects for other images here
];

let currentObjectIndex = 0; // Index of the current object to find
let clicks = 0; // Number of clicks made
const maxClicks = 3; // Maximum allowed clicks

let timeLimit = 20; // Time limit for the game in seconds
let timeLeft = timeLimit;

//Set the source URL of the scene image
    const gameImage = new GameImage("https://i.ibb.co/qMT7cqC/IMG-7205.jpg", objectsToFind);

// Function to draw the scene
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameImage.draw(ctx);
    // Create an image element for the scene
    const sceneImage = gameImage;
    
    // Callback for when the scene image is loaded
    sceneImage.onload = function () {
        // Draw the scene image on the canvas
        ctx.drawImage(sceneImage, 0, 0, canvas.width, canvas.height);

        // Get the current object to find
        const currentObject = objectsToFind[currentObjectIndex];
        

        // Display the number of clicks
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(`Clicks: ${clicks}/${maxClicks}`, 10, 30);
    };

};

// Event handler for mouse clicks on the canvas
function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const clickedObject = gameImage.isObjectClicked(mouseX, mouseY);

    // Check if the clicked position overlaps with the current object
    if (clickedObject) {
        currentObject.found = true;
        clicks++;
        alert("Congratulations! You found the object.");
        canvas.removeEventListener("click", handleClick);
    } else {
        clicks++;
    }

    // Check if the maximum allowed clicks is reached
    if (clicks >= maxClicks) {
        alert("You've used all your clicks. Game over!");
        canvas.removeEventListener("click", handleClick);
    }

    // Redraw the scene after handling the click
    drawScene();
}


// Add a click event listener to the canvas
canvas.addEventListener("click", handleClick);

// Draw the initial scene
drawScene();


