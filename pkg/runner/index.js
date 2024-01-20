import { isCanvasSet } from "../draw";
import jobs from "../jobs";
export const runner = {
    funcs: [],
    /** Add one or more functions to run every frame */
    add(...fn) {
        this.funcs.push(...fn);
    },
    run() {
        for (let i = 0; i < this.funcs.length; i++) {
            const fn = this.funcs[i];
            // const now = performance.now();
            fn?.();
            // this.trackTime(fn.name, performance.now() - now);
        }
    },
    // trackTime(name: string, ms: number) {
    //     if (ticker_times.index[name] == undefined) {
    //         ticker_times.index[name] = 0;
    //         ticker_times.time[name] = [...Array(60)].fill(0);
    //     }
    //     const times = ticker_times.time[name];
    //     times[ticker_times.index[name]] = ms;
    //     ticker_times.index[name] = (ticker_times.index[name] + 1) % times.length;
    //     if (ticker_times.index[name] == 0) {
    //         ticker_times.means[name] = Math.round(times.reduce((p, c)=> p + c) / times.length * 100) / 100;
    //     }
    // }
};
let last_stamp = -1;
const deltas = [...Array(60)].fill(0);
let deltas_i = 0;
let paused = false;
let step = false;
let fps = 0;
let delta_time = 0;
/** Start the game */
function runGame(time_stamp = performance.now()) {
    if (paused && step) {
        step = false;
    }
    else if (paused) {
        last_stamp = time_stamp;
        return requestAnimationFrame(runGame);
    }
    if (last_stamp < 0)
        last_stamp = time_stamp;
    let delta = (time_stamp - last_stamp);
    last_stamp = time_stamp;
    delta_time = delta;
    runner.run();
    deltas[deltas_i] = delta;
    deltas_i = (deltas_i + 1) % deltas.length;
    if (deltas_i == 0)
        fps = Math.round(1000 / (deltas.reduce((p, c) => p + c) / deltas.length));
    jobs.runJobs(delta_time);
    // return FPS.set(420.69);
    requestAnimationFrame(runGame);
}
export function startGame() {
    if (!isCanvasSet())
        console.warn("startGame() is running when the canvas isn't set yet!");
    runGame();
}
export const time = {
    get fps() { return fps; },
    get delta() { return delta_time; },
};
