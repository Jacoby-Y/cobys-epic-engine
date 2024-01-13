type RunnerType = {
    funcs: {
        (): void;
    }[];
    add(...fn: (() => void)[]): void;
    run(): void;
};
export declare const runner: RunnerType;
export declare function startGame(): void;
export declare const time: {
    readonly fps: number;
    readonly delta: number;
};
export {};
