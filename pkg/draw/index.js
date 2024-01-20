import signal from "../signal";
export let ctx;
export let canvas;
export let canvas_size = {
    w: 0, h: 0,
    center: {
        x: 0, y: 0,
    }
};
let _enabled = true;
/** `enabled() = get value` || `enabled(true | false) = set value` */
export let enabled = (new_val) => {
    if (new_val != undefined)
        _enabled = new_val;
    return (_enabled && ctx) ?? false;
};
let scale = 1;
let background_color = "#263238";
let og_width = 0;
let og_height = 0;
export function setCanvas(_canvas) {
    if (_canvas == null) {
        unsetCanvas();
        return;
    }
    canvas = _canvas;
    ctx = _canvas.getContext("2d");
    ctx.lineCap = "round";
    og_width = canvas.width;
    og_height = canvas.height;
    canvas_size.w = og_width;
    canvas_size.h = og_height;
    canvas_size.center.x = og_width / 2;
    canvas_size.center.y = og_height / 2;
    setScale();
    signal.emit("SetCanvas", canvas);
}
export function unsetCanvas(remove_canvas_element = false) {
    if (remove_canvas_element)
        canvas?.parentElement.removeChild(canvas);
    ctx = null;
    canvas = null;
}
export function toggleEnabled(set) {
    // set && console.log("Set == true!");
    if (set == undefined)
        enabled(!enabled());
    enabled(set);
}
export function setScale(_scale = scale) {
    scale = _scale;
    canvas.width = og_width * _scale;
    canvas.height = og_height * _scale;
    signal.emit("SetScale", scale);
}
export function setBackgroundColor(color) {
    background_color = color;
}
export function isCanvasSet() {
    return canvas != null;
}
/** Create and bind canvas to project. Optionally provide parent to attach to. */
export function createCanvas(width = 1080, height = 1080, parent = document.body) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    parent.appendChild(canvas);
    setCanvas(canvas);
}
export function fillCircle(x, y, r, color, do_path = true) {
    if (r < 0)
        r = 0;
    if (!enabled())
        return;
    setFill(color);
    if (do_path)
        ctx.beginPath();
    ctx.arc(x * scale, y * scale, r * scale, 0, Math.PI * 2);
    if (do_path)
        ctx.fill();
}
export function strokeCircle(x, y, r, color, line_width, do_path = true, arc = Math.PI * 2) {
    if (r < 0)
        r = 0;
    if (!enabled())
        return;
    setStroke(color, line_width * scale);
    if (do_path)
        ctx.beginPath();
    ctx.arc(x * scale, y * scale, r * scale, 0, arc);
    if (do_path)
        ctx.stroke();
}
export function fillRect(x, y, w, h, color) {
    if (!enabled())
        return;
    setFill(color);
    ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
}
export function strokeRect(x, y, w, h, color, line_width) {
    if (!enabled())
        return;
    setStroke(color, line_width);
    ctx.strokeRect(x * scale, y * scale, w * scale, h * scale);
}
export function strokeLine(x1, y1, x2, y2, color, line_width) {
    if (!enabled())
        return;
    setStroke(color, line_width * scale);
    ctx.beginPath();
    ctx.moveTo(x1 * scale, y1 * scale);
    ctx.lineTo(x2 * scale, y2 * scale);
    ctx.stroke();
}
/** Fills the canvas with a color by default (it's faster... I think) */
export function clearCanvas(use_clear_function = false) {
    if (!enabled())
        return;
    if (use_clear_function)
        ctx.clearRect(0, 0, canvas_size.w, canvas_size.h);
    else
        fillRect(0, 0, canvas_size.w, canvas_size.h, background_color);
}
export function drawImage(img, x, y, w, h) {
    if (!enabled())
        return;
    if (typeof w == "number" && typeof h == "number") {
        ctx.drawImage(img, x * scale, y * scale, w * scale, h * scale);
    }
    else {
        ctx.drawImage(img, x * scale, y * scale);
    }
}
export function fillText(text, x, y, color = "white", fsize = 30, font = "Arial", center = true) {
    if (!enabled())
        return;
    setFill(color);
    setFont(`${Math.ceil(fsize * scale)}px ${font}`);
    if (center) {
        const text_width = ctx.measureText(text).width;
        x -= text_width / 2;
    }
    ctx.fillText(text, x * scale, y * scale);
}
export function gradient(x, y, r, color1, color2) {
    if (!enabled())
        return;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    // Add three color stops
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.9, color2);
    gradient.addColorStop(1, "#00000000");
    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect((x - r) * scale, (y - r) * scale, r * 2 * scale, r * 2 * scale);
}
/** Give it a function to run and it will begin a path, run the function, then fill the path. */
export function beginAndFill(fn) {
    ctx.beginPath();
    fn();
    ctx.fill();
}
/** Give it an array of points, divisible by two. `[x,y, x,y, x,y, etc...]` */
export function drawPath(points, color, line_width, fill) {
    if (!enabled())
        return;
    if (points.length < 4 || points.length % 2 != 0)
        throw "Amount of points must be even and >= 4";
    if (fill)
        setFill(color);
    else
        setStroke(color, line_width * scale);
    ctx.beginPath();
    ctx.moveTo(points[0] * scale, points[1] * scale);
    for (let i = 0; i < points.length; i += 2) {
        const [x, y] = [points[i], points[i + 1]];
        ctx.lineTo(x * scale, y * scale);
    }
    if (fill)
        ctx.fill();
    else
        ctx.stroke();
}
let $fill_style = "";
export function setFill(color) {
    if (!enabled())
        return;
    if ($fill_style != color) {
        $fill_style = color;
        ctx.fillStyle = color;
    }
}
let $stroke_style = "";
let $line_width = 2;
export function setStroke(color, width) {
    if (!enabled())
        return;
    if ($stroke_style != color) {
        $stroke_style = color;
        ctx.strokeStyle = color;
    }
    if ($line_width != width) {
        $line_width = width;
        ctx.lineWidth = width;
    }
}
export function setFont(font) {
    if (!enabled())
        return;
    if (ctx.font != font)
        ctx.font = font;
}
