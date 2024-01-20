import signal from "cobys-epic-engine/signal";


// Listen to key presses
// Also, returns an "un-listen" function
const keyPressUnlisten = signal.listen("KeyPress", (key)=>{
    console.log("Key: " + key);
});

// Listen to whenever the key press passes SPECIFICALLY the "a" key value
const aKeyUnlisten = signal.listenOn("KeyPress", "a", ()=>{
    console.log("Press 'a' key!");
});


/// Emit key presses "b", "c" and "a"
signal.emit("KeyPress", "c"); // Log: "Key: c"
signal.emit("KeyPress", "b"); // Log: "Key: b"
signal.emit("KeyPress", "a"); // Log: "Key: a" AND "Press 'a' key!"

// Unlisten to listener that only runs when the user presses the "a" key
aKeyUnlisten(); 

signal.emit("KeyPress", "a"); // Only logs: "Key: a" NOT the other log from before

// Unlisten to previously created "KeyPress" listener
keyPressUnlisten();

signal.emit("KeyPress", "a"); // Logs nothing