## Coby's Epic Engine

A barebones engine I've developed and used to publish multiple of my games [on Itch.io](https://jacoby-y.itch.io/) (and my unreleased Idle Orbs 4)

And, when I say "barebones" I mean it. There's only functions for:
- Drawing basic shapes and text
- Adding and running update functions (that run every frame)
- Emitting and listening to signals

Let's just say... I wouldn't make a game with JUST this (I use Svelte for everything else). But, if you do, GUI and all, then that's awesome

___

#### Roadmap:
- [x] Fix up the intellisense for importing (IT WORKS NOW, YAY)
- [ ] Make documentation website (How do others do this? Wait! Don't tell me... do they- nah, I don't know lol)
- [ ] Make it a some-batteries-included [ESC](https://en.wikipedia.org/wiki/Entity_component_system)? (Just an idea, but probably not; it's hard, I've tried)
- [ ] Fix up and add better/more draw functions
- [ ] Add default signals such as: key, mouse and window events. (Probably make it an "opt-in" feature with a `setupDefaultSignals()`)
- [ ] Examples:
    - [x] Basic square-moving-around example (see below)
    - [ ] Idle Orbs: Remastered (I'm planning on making this anyway, but it'll also be a good example)
    - [ ] Some platformer or something, idk

___

#### Example, [Found Here](https://github.com/jacoby-y/cobys-epic-engine_example-1/)
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

___

#### Add To Project
```bash
# Just install it using npm (or pnpm, of course)

npm i cobys-epic-engine@latest

# That's it, right?
```

___

#### Building The Engine
```bash
git clone https://github.com/Jacoby-Y/cobys-epic-engine.git
cd cobys-epic-engine
npm i

# Will compile and build package in /pkg
npm run build

# If you want to use your local version...
cd pkg
npm link
cd ~/path/to/other/project
npm link cobys-epic-engine
# Sometimes, to get this to work, I have to:
# - delete node_modules
# - link to package again
# - then do npm i after
# - maybe even remove it from package.json so it doesn't download it from npm

# (but, also I use pnpm, so who knows)
```