class GameImage {
    constructor(src, objectsToFind) {
        this.image = new Image();
        this.image.src = "https://i.ibb.co/qMT7cqC/IMG-7205.jpg"; // Set the image URL here
        this.objectsToFind = objectsToFind; // Array of ObjectToFind instances
    }

    draw(ctx) {
        if (this.image.complete) {
            // Only draw the image if it is completely loaded
            ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
        }
        // Additional drawing logic if needed
    }

    isObjectClicked(mouseX, mouseY) {
        const clickedObject = this.objectsToFind.find(obj => obj.isClicked(mouseX, mouseY) && !obj.found);
        if (clickedObject) {
            clickedObject.found = true;
            return clickedObject;
        }
        return null;
    }
}
