import signal from "cobys-epic-engine/signal";


window.onkeydown = ({ key })=>{
    signal.emit("KeyDown", key);
}


// Listen to "KeyDown" event
// Also, returns an unlisten function
const unlisten = signal.listen("KeyDown", key => {
    console.log("Key pressed: " + key);
});


signal.emit("KeyDown", "a"); //> "Key pressed: a"


// Run to remove listener and prevent memory leak
// Not always needed, though
unlisten();


signal.emit("KeyDown", "a"); // No output
