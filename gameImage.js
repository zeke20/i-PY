class GameImage {
    constructor(src, objectsToFind) {
        this.image = new Image();
        this.image.src = src;
        this.objectsToFind = objectsToFind; // Array of ObjectToFind instances
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
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
