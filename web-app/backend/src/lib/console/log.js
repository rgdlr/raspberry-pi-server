const { COLOR } = require('./color');

const reset = COLOR.PROPERTY.RESET;
const clg = (text, color = reset) => console.log(`${color}${text}${reset}`);

const black = (text) => clg(text, COLOR.FOREGROUND.BLACK);
const blue = (text) => clg(text, COLOR.FOREGROUND.BLUE);
const cyan = (text) => clg(text, COLOR.FOREGROUND.CYAN);
const green = (text) => clg(text, COLOR.FOREGROUND.GREEN);
const magenta = (text) => clg(text, COLOR.FOREGROUND.MAGENTA);
const red = (text) => clg(text, COLOR.FOREGROUND.RED);
const white = (text) => clg(text, COLOR.FOREGROUND.WHITE);
const yellow = (text) => clg(text, COLOR.FOREGROUND.YELLOW);

const log = { black, blue, cyan, magenta, green, red, white, yellow };

module.exports = Object.freeze({ log });
