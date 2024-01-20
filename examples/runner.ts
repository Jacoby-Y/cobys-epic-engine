import { runner, startGame } from "cobys-epic-engine/runner";

runner.add(()=>{
    // Logs every frame
    console.log("Hello world!");
});

runner.add(()=>{
    // Logs every frame (after logging "Hello world!" because these functions run every frame in order that they've been added)
    console.log("Goodbye world!");
});

// Starts game and runs all functions added to the runner every frame
startGame();