import signal from "cobys-epic-engine/signal";

// Listen to key presses
// Also, returns an "un-listen" function
signal.listen("Greet", (name)=>{
    console.log("Hello " + name);
});

// Listen to whenever the greet even SPECIFICALLY has the "Tom" emit data
const greetTomUnlisten = signal.listenFor("Greet", "Tom", ()=>{
    console.log("Hey, what's up Tom?");

    // Prevent normal listener from running
    // In this case: only runs this function when emitting data of "Tom" for the "Greet" event
    return true;
});


signal.emit("Greet", "Joe"); //> "Hello Joe"
signal.emit("Greet", "Tom"); //> "Hey, what's up Tom?"

greetTomUnlisten();

signal.emit("Greet", "Tom"); //> "Hello Tom"