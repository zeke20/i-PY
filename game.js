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
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Set the dimensions of the canvas
canvas.width = 800;
canvas.height = 600;

// Array of objects to be found in the scene
const objectsToFind = [
    new ObjectToFind("Key", 375, 560, 20, 30), // Replace with your image-specific objects
    // Add more objects for other images here
];

let currentObjectIndex = 0; // Index of the current object to find
let clicks = 0; // Number of clicks made
const maxClicks = 3; // Maximum allowed clicks

// Function to draw the scene
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create an image element for the scene
    const sceneImage = new Image();
    
    // Callback for when the scene image is loaded
    sceneImage.onload = function () {
        // Draw the scene image on the canvas
        ctx.drawImage(sceneImage, 0, 0, canvas.width, canvas.height);

        // Get the current object to find
        const currentObject = objectsToFind[currentObjectIndex];
        
        /*
        // Draw a red rectangle around the current object if not found
        if (!currentObject.found) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.strokeRect(
                currentObject.x,
                currentObject.y,
                currentObject.width,
                currentObject.height
            );
        }
        */  

        // Display the number of clicks
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(`Clicks: ${clicks}/${maxClicks}`, 10, 30);
    };

    // Set the source URL of the scene image
    sceneImage.src = "https://i.ibb.co/qMT7cqC/IMG-7205.jpg"; // Replace with your image URL
}

// Event handler for mouse clicks on the canvas
function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const currentObject = objectsToFind[currentObjectIndex];

    // Check if the clicked position overlaps with the current object
    if (!currentObject.found && currentObject.isClicked(mouseX, mouseY)) {
        currentObject.found = true;
        clicks++;
        alert("Congratulations! You found the object.");
        canvas.removeEventListener("click", handleClick);
    } else if (!currentObject.found) {
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

let timeLimit = 20; // Time limit for the game in seconds
let timeLeft = timeLimit;

// Function to update the timer and handle time-based events
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        drawScene(); // Redraw the scene to update the time left
        setTimeout(updateTimer, 1000);
    } else {
        timeLeft = 0;
        drawScene();
        alert("Time's up! Game over.");
        canvas.removeEventListener("click", handleClick);
    }
}

// Add a click event listener to the canvas
canvas.addEventListener("click", handleClick);

// Draw the initial scene
drawScene();

// Uncomment the following line to start the timer (if needed)
// updateTimer();
