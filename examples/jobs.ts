import { startGame } from "cobys-epic-engine/runner";
import jobs from "cobys-epic-engine/jobs";

// Start the game (which also checks all jobs every frame)
startGame();

// Add a job which will log "Hello!" after 100 milliseconds
jobs.add(100, ()=>{
    console.log("Hello!");

    // If you return a number, it will set the job's time to that number
    // This essentially makes a loop that logs "Hello!" every 100 milliseconds
    return 100;
});


// Run this job after a second (1000 milliseconds)
jobs.add(1000, ()=>{
    console.log("It's been a second...");

    // This next job runs when the initial job runs
    jobs.add(1000, ()=>{
        console.log("It's been another second!");
    });
});
