"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumArray = exports.countIncrementsCurry = exports.captureIncrement = exports.readFileByWindow = exports.readFileByLine = exports.translateCoordinatesFromLine = exports.calculateCoordinates = exports.calculateAim = void 0;
const fs = require("fs");
const calculateGammaRate = () => {
};
const calculateEpsilonRate = () => {
};
const calculateAim = (ans, change) => {
    const incrementFun = {
        'forward': (ans, amount) => {
            ans.horizontal += amount;
            ans.vertical += (ans.aim * amount);
        },
        'down': (ans, amount) => {
            ans.aim += amount;
        },
        'up': (ans, amount) => {
            ans.aim -= amount;
        },
    };
    incrementFun[change.direction](ans, change.amount);
};
exports.calculateAim = calculateAim;
const calculateCoordinates = (ans, change) => {
    const incrementFun = {
        'forward': (ans, amount) => {
            ans.horizontal += amount;
        },
        'down': (ans, amount) => {
            ans.vertical += amount;
        },
        'up': (ans, amount) => {
            ans.vertical -= amount;
        },
    };
    incrementFun[change.direction](ans, change.amount);
};
exports.calculateCoordinates = calculateCoordinates;
const translateCoordinatesFromLine = (line) => {
    let [direction, amount] = line.split(' ');
    return {
        direction,
        amount: parseInt(amount)
    };
};
exports.translateCoordinatesFromLine = translateCoordinatesFromLine;
function* readFileByLine(filePath, type) {
    const text = fs.readFileSync(__dirname + filePath, 'utf-8');
    const lines = text.split('\n');
    for (let line of lines) {
        if (type === 'int') {
            yield parseInt(line);
        }
        else if (type === 'binary') {
            yield parseInt(line, 2);
        }
        else {
            yield line;
        }
    }
}
exports.readFileByLine = readFileByLine;
const castLines = (lines, type) => {
    if (type === 'int') {
        return lines.map((val) => parseInt(val));
    }
    else {
        return lines;
    }
};
function* readFileByWindow(filePath, type, size) {
    const text = fs.readFileSync(__dirname + filePath, 'utf-8');
    const lines = text.split('\n');
    let response = lines.slice(0, size);
    let increment = 0;
    while (response[2]) {
        response = increment === 0 ? response : lines.slice(increment, increment + size);
        increment++;
        yield castLines(response, type);
    }
}
exports.readFileByWindow = readFileByWindow;
const captureIncrement = (line, last) => {
    return last && line > last ? 1 : 0;
};
exports.captureIncrement = captureIncrement;
const countIncrementsCurry = () => {
    let counter = 0;
    return (increment) => {
        counter = counter + increment;
        return counter;
    };
};
exports.countIncrementsCurry = countIncrementsCurry;
const sumArray = (arr) => arr.reduce((acc, val) => acc + val, 0);
exports.sumArray = sumArray;
//# sourceMappingURL=utils.js.map