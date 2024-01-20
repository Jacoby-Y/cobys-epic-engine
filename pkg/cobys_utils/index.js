/** Rounds a number to the nearest tenth. `tenth(2.35) == 2.4` */
export const tenth = (num) => Math.round(num * 10) / 10;
/** Rounds up a number to the tenth */
export const cTenth = (num) => Math.ceil(num * 10) / 10;
/** Rounds down a number to the tenth */
export const fTenth = (num) => Math.floor(num * 10) / 10;
/** I'm not even sure why it's called "floorRound" lol */
export function floorRound(num, place = 1) {
    const pow = (Math.pow(10, place));
    return Math.floor(num * pow) / pow;
}
const num_shorts = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'O', 'N', 'D', 'UD', 'DD', 'TD', 'QuD', 'QiD', 'SxD', 'SpD', 'OD', 'ND', 'V', 'UV', 'DV', 'TV', 'QaV', 'QiV', 'SxV', 'SpV', 'OV', 'NV', 'T', 'UT', 'DT', 'TT', 'QaT', 'QiT', 'SxT', 'SpT', 'OT', 'NT'];
/** Formats a number. `fNum(1234567) == "1.2M"` */
export function fNum(num, round_to = 1) {
    if (num < 1000)
        return floorRound(num, round_to).toString();
    const pwr3 = Math.floor(Math.log10(num) / 3);
    const post = num_shorts[pwr3];
    return floorRound(num / (10 ** (pwr3 * 3)), round_to) + (post ?? "");
}
/** Round a number to a specific place. `roundTo(40.1433, 2) == 40.14` */
export function roundTo(num, place) {
    const pow = Math.pow(10, place);
    return Math.round(num * pow) / pow;
}
/** Uh, here's an example: `title("hello mY FRIEND") == "Hello My Friend" */
export function title(str = "title") {
    return str.split(" ").map(s => s && (s[0].toUpperCase() + s.slice(1).toLowerCase())).join(" ");
}
/** Hm, hard to explain. If you input (0.33), then there is a 33% chance of returning 1, else 0 */
export function chances(number) {
    const fl = Math.floor(number);
    return fl + (Math.random() <= (number - fl) ? 1 : 0);
}
/** Clamps a number between a minimum and maximum value. */
export function clamp(min = 0, num = 1, max = 2) {
    if (num < min)
        return min;
    if (num > max)
        return max;
    return num;
}
/** Clamps and returns the floor value of a number between a minimum and maximum value. */
export function fClamp(min = 0, num = 1, max = 2) {
    return Math.floor(clamp(min, num, max));
}
/** Clamps and returns the ceiling value of a number between a minimum and maximum value. */
export function cClamp(min = 0, num = 1, max = 2) {
    return Math.ceil(clamp(min, num, max));
}
/** Clamps and returns the rounded value of a number between a minimum and maximum value. */
export function rClamp(min = 0, num = 1, max = 2) {
    return Math.round(clamp(min, num, max));
}
/** Converts a hex color string to RGB. */
export function hex2rgb(str = "#123123") {
    if (str[0] == "#")
        str = str.slice(1);
    return [
        parseInt(str.slice(0, 2), 16),
        parseInt(str.slice(2, 4), 16),
        parseInt(str.slice(4, 6), 16),
    ];
}
/** Converts a hex color string to RGBA. */
export function hex2rgba(str = "#12312399") {
    if (str[0] == "#")
        str = str.slice(1);
    return [
        parseInt(str.slice(0, 2), 16),
        parseInt(str.slice(2, 4), 16),
        parseInt(str.slice(4, 6), 16),
        parseInt(str.slice(6, 8), 16),
    ];
}
/** Adjusts the brightness of a hex color by a specified amount. */
export function hexBrightness(hex, amount) {
    if (hex[0] == "#")
        hex = hex.slice(1);
    let r = parseInt(hex.slice(0, 2), 16) || 0;
    let g = parseInt(hex.slice(2, 4), 16) || 0;
    let b = parseInt(hex.slice(4, 6), 16) || 0;
    const a = hex.slice(6, 8);
    r = clamp(0, r + amount, 0xff);
    g = clamp(0, g + amount, 0xff);
    b = clamp(0, b + amount, 0xff);
    let rc = r.toString(16);
    let gc = g.toString(16);
    let bc = b.toString(16);
    rc = rc.length == 1 ? "0" + rc : rc;
    gc = gc.length == 1 ? "0" + gc : gc;
    bc = bc.length == 1 ? "0" + bc : bc;
    return ("#" + rc + gc + bc + a).toUpperCase();
}
/** Generates a random integer between the specified minimum (inclusive) and maximum (exclusive) values. */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
/** Generates a random number between the specified minimum (inclusive) and maximum (exclusive) values. */
export function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}
/** Returns a random item from the given array. */
export function randomListItem(list) {
    return list[randomInt(0, list.length)];
}
/** Randomly selects an item based on the provided weights in a tuple array. */
export function randomWeight(entries) {
    const total = entries.map(([k, v]) => v).reduce((p, c) => p + c);
    const rand = Math.random() * total;
    let prog = 0;
    for (let i = 0; i < entries.length; i++) {
        const [key, weight] = entries[i];
        if (weight <= 0)
            continue;
        prog += weight;
        if (rand <= prog)
            return key;
    }
    // This line should never be reached, indicates an issue with weights or randomness.
    throw `Unexpected state in <randomWeight()>: Total(${total}), Rand(${rand}), Progress(${prog})`;
}
/** Randomly selects a key from an object based on the provided weights. */
export function randomWeightObject(obj) {
    return randomWeight(Object.entries(obj));
}
/** Shuffles the elements of an array in-place. */
export function shuffleList(list) {
    let currentIndex = list.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [list[currentIndex], list[randomIndex]] = [
            list[randomIndex], list[currentIndex]
        ];
    }
    return list;
}
/** Swaps the keys and values in an object. Returns a new object. */
export function swapKeyValue(obj) {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
}
/** Calculates the distance between two points in a 2D plane. */
export function pointDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
/** Calculates the distance between two positions in a 2D plane. */
export function pointDistance2(pos1, pos2) {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    return Math.sqrt(dx * dx + dy * dy);
}
/** Calculates the distance from the origin to a point in a 2D plane. */
export function originDistance(x, y) {
    return Math.sqrt(x * x + y * y);
}
/** Linearly interpolates between two values. */
export function lerp(start, end, t) {
    t = Math.max(0, Math.min(1, t));
    return start + (end - start) * t;
}
/** Converts a string to snake_case. */
export function toSnakeCase(str) {
    return str.toLowerCase().replaceAll(" ", "_");
}
/** Converts a snake_case string to Title Case. */
export function snakeToTitleCase(str) {
    return str.split("_").map(sub => sub && sub[0].toUpperCase() + sub.slice(1).toLowerCase()).join(" ");
}
/** Formats milliseconds into [hours, minutes, seconds]. */
export function formatMsToTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds];
}
/** Checks if a point is within a rectangular region. */
export function pointInRect(x, y, rx, ry, rw, rh) {
    return x >= rx && y >= ry && x <= rx + rw && y <= ry + rh;
}
/** Maps keys of an object using the provided function. */
export function mapKeys(object, fn) {
    return Object.fromEntries(Object.entries(object).map(([k]) => [k, fn(k)]));
}
/** Calculates the sum of an array of numbers, treating undefined values as 0. */
export function sum(nums) {
    return nums.reduce((p, c) => p + (c ?? 0));
}
/** Combines multiple functions into a single function that executes them sequentially. */
export function sequence(...funcs) {
    return function () {
        funcs.forEach(fn => fn());
    };
}
/** Composes the given functions. Not sure how to describe it really. */
export function compose(...funcs) {
    return (input) => {
        return funcs.reduce((result, func) => func(result), input);
    };
}
