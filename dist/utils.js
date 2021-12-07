"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumArray = exports.countIncrementsCurry = exports.captureIncrement = exports.readFileByWindow = exports.readFileByLine = exports.translateCoordinatesFromLine = exports.calculateCoordinates = exports.calculateAim = exports.readBingos = exports.generateBingoGame = exports.checkCard = exports.calculateBingoSum = exports.generateCloudCoordinates = exports.trackCloudCoordinates = exports.countDangerZones = void 0;
const fs = require("fs");
const countDangerZones = (trackedClouds) => {
    let dangerZones = 0;
    for (let yCoord of Object.keys(trackedClouds)) {
        for (let xCoord of Object.keys(trackedClouds[yCoord])) {
            if (trackedClouds[yCoord][xCoord] > 1) {
                dangerZones += 1;
            }
        }
    }
    return dangerZones;
};
exports.countDangerZones = countDangerZones;
var CoordinateBoard;
(function (CoordinateBoard) {
    CoordinateBoard["TBD"] = "TBD";
    CoordinateBoard["ONE_POINT"] = "ONE_POINT";
    CoordinateBoard["VERTICAL_LINE"] = "VERTICAL_LINE";
    CoordinateBoard["HORIZONTAL_LINE"] = "HORIZONTAL_LINE";
    CoordinateBoard["DIAGONAL_LINE"] = "DIAGONAL_LINE";
})(CoordinateBoard || (CoordinateBoard = {}));
const logicBoard = (x1, y1, x2, y2) => {
    if (x1 !== x2 && y1 === y2)
        return CoordinateBoard.HORIZONTAL_LINE;
    if (x1 === x2 && y1 !== y2)
        return CoordinateBoard.VERTICAL_LINE;
    if (x1 === x2 && y1 === y2)
        return CoordinateBoard.ONE_POINT;
    if (x1 !== x2 && y1 !== y2)
        return CoordinateBoard.DIAGONAL_LINE;
    return CoordinateBoard.TBD;
};
const calculateRowsAffected = (coord, routing) => {
    if (routing === CoordinateBoard.HORIZONTAL_LINE || routing === CoordinateBoard.ONE_POINT) {
        return [coord.y1];
    }
    else if (routing === CoordinateBoard.VERTICAL_LINE || routing === CoordinateBoard.DIAGONAL_LINE) {
        const targetRows = [];
        const [startY, endY] = coord.y1 > coord.y2
            ? [coord.y2, coord.y1]
            : [coord.y1, coord.y2];
        for (let i = startY; i <= endY; i++) {
            targetRows.push(i);
        }
        return coord.y1 > coord.y2 ? targetRows.reverse() : targetRows;
    }
    return [];
};
const trackCloudCoordinates = (coord, rows) => {
    const [x1, y1, x2, y2] = Object.values(coord);
    const routing = logicBoard(x1, y1, x2, y2);
    const targetRows = calculateRowsAffected(coord, routing);
    const iterNum = coord.x1 <= coord.x2 ? 1 : 0;
    for (let yCoord of targetRows) {
        for (let i = coord.x1; i <= coord.x2; i + iterNum) {
            if (!rows[yCoord]) {
                rows = Object.assign(Object.assign({}, rows), { [yCoord]: {} });
            }
            if (rows[yCoord][i]) {
                rows[yCoord][i] += 1;
            }
            else {
                rows[yCoord] = Object.assign(Object.assign({}, rows[yCoord]), { [i]: 1 });
            }
        }
    }
    return rows;
};
exports.trackCloudCoordinates = trackCloudCoordinates;
const generateCloudCoordinates = (instructions) => {
    const [x1, y1, x2, y2] = instructions
        .split(' -> ')
        .reduce((coors, ins) => [
        ...coors,
        ...ins.split(',').map((coor) => parseInt(coor))
    ], []);
    return ({
        x1,
        y1,
        x2,
        y2
    });
};
exports.generateCloudCoordinates = generateCloudCoordinates;
const calculateBingoSum = (card) => {
    return card ? card.rows.reduce((rowsSum, row) => {
        let cursorSum = row.reduce((colSum, colVal) => {
            return colVal ? colSum + colVal : colSum;
        }, 0);
        return cursorSum ? rowsSum + cursorSum : rowsSum;
    }, 0) : 0;
};
exports.calculateBingoSum = calculateBingoSum;
const checkCard = (call, card) => {
    let hits = card.rows[0].map((_) => 0);
    let rowHits = card.rows.map((_) => 0);
    const resCard = card.rows.map((row, index) => {
        rowHits[index] = row.filter((val) => val === null).length;
        return row.map((col, colIndex) => {
            if (col === call) {
                col = null;
            }
            if (col === null) {
                hits[colIndex] += 1;
            }
            return col;
        });
    });
    hits = hits.concat(rowHits);
    const max = Math.max(...hits);
    return {
        card: { rows: resCard },
        status: max >= 5
    };
};
exports.checkCard = checkCard;
const populateCard = (line) => {
    const rows = line.split('\n');
    const bingoCard = {
        rows: rows.map((row) => row
            .trim()
            .replace('  ', ' ')
            .split(' ')
            .map((val) => parseInt(val))
            .filter((val) => !Number.isNaN(val)))
    };
    return bingoCard;
};
const generateBingoGame = () => {
    const bingoGame = {
        calls: null,
        cards: []
    };
    for (let line of readBingos('/inputs/day4Input1.txt')) {
        if (!bingoGame.calls) {
            bingoGame.calls = line.split(',').map((val) => parseInt(val));
        }
        else {
            bingoGame.cards.push(populateCard(line));
        }
    }
    return bingoGame;
};
exports.generateBingoGame = generateBingoGame;
function* readBingos(filePath) {
    const text = fs.readFileSync(__dirname + filePath, 'utf-8');
    const lines = text.split('\n\n');
    for (let line of lines) {
        yield line;
    }
}
exports.readBingos = readBingos;
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