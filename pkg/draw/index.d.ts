declare type num = number;
declare type float = number;
declare type str = string;
export declare let ctx: CanvasRenderingContext2D;
export declare let canvas: HTMLCanvasElement;
export declare let canvas_size: {
    readonly w: number;
    readonly h: number;
    center: {
        readonly x: number;
        readonly y: number;
    };
};
/** `enabled() = get value` || `enabled(true | false) = set value` */
export declare let enabled: (new_val?: boolean) => false | CanvasRenderingContext2D;
export declare function setCanvas(_canvas: HTMLCanvasElement): void;
export declare function unsetCanvas(remove_canvas_element?: boolean): void;
export declare function toggleEnabled(set?: boolean): void;
export declare function setScale(_scale?: float): void;
export declare function setBackgroundColor(color: string): void;
/** Create and bind canvas to project. Optionally provide parent to attach to. */
export declare function createCanvas(width?: num, height?: num, parent?: HTMLElement): void;
export declare function fillCircle(x: num, y: num, r: num, color: str, do_path?: boolean): void;
export declare function strokeCircle(x: num, y: num, r: num, color: str, line_width: num, do_path?: boolean, arc?: number): void;
export declare function fillRect(x: num, y: num, w: num, h: num, color: str): void;
export declare function strokeRect(x: num, y: num, w: num, h: num, color: str, line_width: num): void;
export declare function strokeLine(x1: num, y1: num, x2: num, y2: num, color: str, line_width: num): void;
/** Fills the canvas with a color by default (it's faster... I think) */
export declare function clearCanvas(use_clear_function?: boolean): void;
export declare function drawImage(img: HTMLImageElement, x: num, y: num, w?: num, h?: num): void;
export declare function fillText(text: str, x: num, y: num, color?: string, fsize?: number, font?: string, center?: boolean): void;
export declare function gradient(x: num, y: num, r: num, color1: str, color2: str): void;
/** Give it a function to run and it will begin a path, run the function, then fill the path. */
export declare function beginAndFill(fn: () => void): void;
/** Give it an array of points, divisible by two. `[x,y, x,y, x,y, etc...]` */
export declare function drawPath(points: num[], color: str, line_width: num, fill: boolean): void;
export declare function setFill(color: str): void;
export declare function setStroke(color: str, width: num): void;
export declare function setFont(font: str): void;
export {};
