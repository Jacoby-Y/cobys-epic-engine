declare type int = number;
declare type uint = number;
declare type float = number;
declare type Pos = {
    x: number;
    y: number;
};
/** Rounds a number to the nearest tenth. `tenth(2.35) == 2.4` */
export declare const tenth: (num: float) => number;
/** Rounds up a number to the tenth */
export declare const cTenth: (num: float) => number;
/** Rounds down a number to the tenth */
export declare const fTenth: (num: float) => number;
/** I'm not even sure why it's called "floorRound" lol */
export declare function floorRound(num: float, place?: uint): int;
/** Formats a number. `fNum(1234567) == "1.2M"` */
export declare function fNum(num: float, round_to?: number): string;
/** Round a number to a specific place. `roundTo(40.1433, 2) == 40.14` */
export declare function roundTo(num: float, place: uint): int;
/** Uh, here's an example: `title("hello mY FRIEND") == "Hello My Friend" */
export declare function title(str?: string): string;
/** Hm, hard to explain. If you input (0.33), then there is a 33% chance of returning 1, else 0 */
export declare function chances(number: float): float;
/** Clamps a number between a minimum and maximum value. */
export declare function clamp(min?: number, num?: number, max?: number): number;
/** Clamps and returns the floor value of a number between a minimum and maximum value. */
export declare function fClamp(min?: number, num?: number, max?: number): number;
/** Clamps and returns the ceiling value of a number between a minimum and maximum value. */
export declare function cClamp(min?: number, num?: number, max?: number): number;
/** Clamps and returns the rounded value of a number between a minimum and maximum value. */
export declare function rClamp(min?: number, num?: number, max?: number): number;
/** Converts a hex color string to RGB. */
export declare function hex2rgb(str?: string): [number, number, number];
/** Converts a hex color string to RGBA. */
export declare function hex2rgba(str?: string): [number, number, number, number];
/** Adjusts the brightness of a hex color by a specified amount. */
export declare function hexBrightness(hex: string, amount: number): string;
/** Generates a random integer between the specified minimum (inclusive) and maximum (exclusive) values. */
export declare function randomInt(min: number, max: number): number;
/** Generates a random number between the specified minimum (inclusive) and maximum (exclusive) values. */
export declare function randomNum(min: number, max: number): number;
/** Returns a random item from the given array. */
export declare function randomListItem<T>(list: T[]): T;
/** Randomly selects an item based on the provided weights in a tuple array. */
export declare function randomWeight<T>(entries: [T, number][]): T;
/** Randomly selects a key from an object based on the provided weights. */
export declare function randomWeightObject<T extends string | number | symbol>(obj: {
    [x in T]: number;
}): T;
/** Shuffles the elements of an array in-place. */
export declare function shuffleList(list: any[]): any[];
/** Swaps the keys and values in an object. Returns a new object. */
export declare function swapKeyValue(obj: {
    [key: string]: any;
}): any;
/** Calculates the distance between two points in a 2D plane. */
export declare function pointDistance(x1: number, y1: number, x2: number, y2: number): number;
/** Calculates the distance between two positions in a 2D plane. */
export declare function pointDistance2(pos1: Pos, pos2: Pos): number;
/** Calculates the distance from the origin to a point in a 2D plane. */
export declare function originDistance(x: number, y: number): number;
/** Linearly interpolates between two values. */
export declare function lerp(start: number, end: number, t: number): number;
/** Converts a string to snake_case. */
export declare function toSnakeCase(str: string): string;
/** Converts a snake_case string to Title Case. */
export declare function snakeToTitleCase(str: string): string;
/** Formats milliseconds into [hours, minutes, seconds]. */
export declare function formatMsToTime(ms: number): [number, number, number];
/** Checks if a point is within a rectangular region. */
export declare function pointInRect(x: number, y: number, rx: number, ry: number, rw: number, rh: number): boolean;
/** Maps keys of an object using the provided function. */
export declare function mapKeys<T>(object: Object, fn: (key: string) => T): {
    [k: string]: T;
};
/** Calculates the sum of an array of numbers, treating undefined values as 0. */
export declare function sum(nums: float[]): float;
/** Combines multiple functions into a single function that executes them sequentially. */
export declare function compose(...funcs: Function[]): () => void;
export {};
