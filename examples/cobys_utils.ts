import {
    sequence,
    sum,
    compose,
    tenth,
    cTenth,
    fNum,
    chances,
    clamp,
    randomInt,
    hexBrightness,
    randomListItem,
    randomWeightObject,
    pointDistance,
    pointDistance2
} from "cobys-epic-engine/cobys_utils";


// Not sure what exactly to show here. There's A LOT of util functions...
// But, these are some of my favorite


sum([1, 2, 3]); //> 6


// Returns a function that runs all functions given to sequence()
const greeting = sequence(
    ()=> console.log("Hello,"),
    ()=> console.log("my friend."),
    ()=> console.log("How"),
    ()=> console.log("are you today?"),
);

// Runs all those logs on after another
greeting();


// Functions to use in compose()
const addFive = x => x + 5;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

const doMath = compose<number>(
    addFive,
    multiplyByTwo,
    square,
);

doMath(10); //> 900
doMath(5); //> 400


// Easy rounding to a tenth
tenth(10.123) //> 10.1
cTenth(10.123) //> 10.2

// Number formatting stuff that I use ALL the time
fNum(100); //> "100"
fNum(12345, 2); //> "12.34K";
fNum(12345, 0); //> "12K";


// 80% chance to return 1 AND 20% change to return 2
chances(1.2);

// 50-50 change to return 0 or 1
chances(0.5);


// Keeps number between 0 and 0.5
clamp(
    0, // Min
    Math.random(), // Given value
    0.5 // Max
);


hexBrightness("#123456", 0x11); //> "#234567";
hexBrightness("#E0E0E0", 0x1F); //> "#FFFFFF";


// Return an integer between 0 and 99 (doesn't include max)
randomInt(0, 100);

// Return a float between 0 and 1.999¯ (doesn't include max)
randomInt(0, 2);


// Randomly returns one of these numbers
randomListItem([1, 2, 3, 4, 5]);


// 50% chance of returning "Yorai"
// Otherwise, 10% chance to return another name
randomWeightObject({
    "Yorai": 5,
    "Omer": 1,
    "Andrew": 1,
    "Spinks": 1,
    "Chris": 1,
    "Bednarz": 1,
});


// Get distance from (2, 3) to (5, 5)
pointDistance(2, 3,  5, 5);

// Same as previous function
// Can be used on any objects with an x and y property
pointDistance2({ x: 2, y: 3}, { x: 5, y: 5});