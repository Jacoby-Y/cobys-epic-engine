import { clearCanvas, fillRect } from "cobys-epic-engine/draw";
import { startGame, runner } from "cobys-epic-engine/runner";


// Refer to /examples/runner.ts
startGame();


const player = {
    x: 100,
    y: 200,
    width: 50,
    height: 100,
    color: "#FF5722", // Dark orange
}

/** Draw the player */
function drawPlayer() {
    fillRect(
        player.x,
        player.y,
        player.width,
        player.height,
        player.color
    );
}

// Clear the canvas every frame (this should be set first!)
runner.add(clearCanvas);

// Draw the player every frame
runner.add(drawPlayer);