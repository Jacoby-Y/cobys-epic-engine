## Coby's Epic Engine

Hey guys, I made an engine. I've been using this engine for a while and I'm getting sick and tired of constantly copying and pasting my engine code into new projects, so here I am. You guys can use my engine too, but you might not understand how to use it and I don't really care to make it user friendly at the moment.

#### Example, [Found Here](https://jacoby-y.github.io/cobys-epic-engine_example-1/)
```js
import { createCanvas, clearCanvas, canvas_size, fillRect, setBackgroundColor } from "cobys-epic-engine/draw";
import { runner, startGame } from "cobys-epic-engine/runner";

// Create canvas (with width and height) and append to document body by default
createCanvas(800, 400);

// Set background color to a dark gray (it's dark gray-blue by default)
setBackgroundColor("#333333");

// Create game variables
let box_x = 100,
    box_y = 100,
    box_vx = 1.411,
    box_vy = 2.235,
    box_w = 180, 
    box_h = 120, 
    box_color = "red";

// Add update function that runs every frame
runner.add(()=>{
    // Reset canvas
    clearCanvas();

    // Draw "player"
    fillRect(box_x, box_y, box_w, box_h, box_color);

    // Move player based off it's velocity
    box_x += box_vx;
    box_y += box_vy;

    // Check collisions
    if (box_x < 0) {
        box_x = 0;
        box_vx *= -1;
    }
    else if (box_x > canvas_size.w - box_w) {
        box_x = canvas_size.w - box_w;
        box_vx *= -1;
    }

    if (box_y < 0) {
        box_y = 0;
        box_vy *= -1;
    }
    else if (box_y > canvas_size.h - box_h) {
        box_y = canvas_size.h - box_h;
        box_vy *= -1;
    }
});

// Start game loop
startGame();


// A red square will now bounce around the canvas like that DvD logo (ya know what I mean?)
```