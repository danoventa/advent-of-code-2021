import * as fs from 'fs';

/**
 * Day 9
 */
const findLocalMins = (matrix: number[][]): number[][] => {
    let localMins = []
    for (let rowIndex=0; rowIndex < matrix.length; rowIndex++){
        for (let colIndex=0; colIndex < matrix[0].length; colIndex++){
            let count = 0;
            if(matrix[rowIndex-1] && matrix[rowIndex-1][colIndex] !== undefined){
                count += matrix[rowIndex][colIndex] < matrix[rowIndex-1][colIndex] ? 1 : 0;
            } else {
                count += 1;
            }

            if(matrix[rowIndex+1] && matrix[rowIndex+1][colIndex] !== undefined){
                count += matrix[rowIndex][colIndex] < matrix[rowIndex+1][colIndex] ? 1 : 0;
            } else {

                count += 1;
            }

            if(matrix[rowIndex][colIndex - 1] !== undefined){
                count += matrix[rowIndex][colIndex] < matrix[rowIndex][colIndex - 1] ? 1 : 0;
            } else {
                count += 1;
            }

            if(matrix[rowIndex][colIndex + 1] !== undefined){
                count += matrix[rowIndex][colIndex] < matrix[rowIndex][colIndex + 1] ? 1 : 0;
            } else {
                count += 1;
            }

            if (count === 4) {
                localMins.push([rowIndex, colIndex]);
            }
        }
    }
    return localMins;
}

const nextCoordinates = ([row, col]: number[], matrix: number[][]) => {
    const traversalPoints = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    const nextAvail: number[][] = [];
    for (let [r, c] of traversalPoints){
        if(matrix[row+r] && matrix[row+r][col+c] !== undefined && matrix[row+r][col+c] !== 9 && matrix[row][col] < matrix[row+r][col+c]){
            nextAvail.push([row+r, col+c]);
        }
    }
    return nextAvail;
}

interface BasinTracker {
    [coordinates: string]: number;
}

const traverseCoordinates = (nextAvail: number[], matrix: number[][], basin: BasinTracker) => {
    const [row, col] = nextAvail;
    const key = nextAvail.join(',');
    basin = {
        ...basin,
        [key]: 1
    }

    const nextCoords = nextCoordinates(nextAvail, matrix);

    if (nextCoords.length === 0) return basin;


    matrix[row][col] = 9;
    for (let nextCoord of nextCoords){
        basin = {
            ...basin,
            ...traverseCoordinates(nextCoord, matrix, basin)
        };
    }
    return basin;
}

export const multiplicate3MaxBasins = (matrix: number[][]) => {
    const localMins = findLocalMins(matrix);
    let basins: BasinTracker[] = [];
    for (let localMin of localMins){
        basins.push(traverseCoordinates(localMin, matrix, {}));
    }
    return basins.map((basin) => Object.values(basin).reduce((acc, val) => acc + val), 0)
                .sort((a, b) => b-a)
                .slice(0, 3)
                .reduce((acc, val) => acc * val, 1);
}

export const findLocalMinimum = (matrix: number[][]) => {
    let localMins = []
    for (let rowIndex=0; rowIndex < matrix.length; rowIndex++){
        for (let colIndex=0; colIndex < matrix[0].length; colIndex++){
            let count = 0;
            if(matrix[rowIndex-1] && matrix[rowIndex-1][colIndex] !== undefined){
                count += matrix[rowIndex][colIndex] < matrix[rowIndex-1][colIndex] ? 1 : 0;
            } else {
                count += 1;
            }

            if(matrix[rowIndex+1] && matrix[rowIndex+1][colIndex] !== undefined){
                count += matrix[rowIndex][colIndex] < matrix[rowIndex+1][colIndex] ? 1 : 0;
            } else {

                count += 1;
            }

            if(matrix[rowIndex][colIndex - 1] !== undefined){
                count += matrix[rowIndex][colIndex] < matrix[rowIndex][colIndex - 1] ? 1 : 0;
            } else {
                count += 1;
            }

            if(matrix[rowIndex][colIndex + 1] !== undefined){
                count += matrix[rowIndex][colIndex] < matrix[rowIndex][colIndex + 1] ? 1 : 0;
            } else {
                count += 1;
            }

            if (count === 4) {
                localMins.push(matrix[rowIndex][colIndex]);
            }
        }
    }
    return localMins.reduce((acc, val) => acc + (val + 1), 0)
}

/**
 * Day 8
 */
interface Decoded {
    [code: string]: number;
}
/**

0:      1:      2:      3:      4:
aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
gggg    ....    gggg    gggg    ....

 5:      6:      7:      8:      9:
aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
gggg    gggg    ....    gggg    gggg

 */

// stirng arr
// 0 -> top
// 1 -> topLeft
// 2 -> topRight
// 3

enum positionsEnum {
    top,
    topLeft,
    topRight,
    middle,
    bottomLeft,
    bottomRight,
    bottom
}

const mapCodes = (decoders: string[]) => {
    const codedMap = decoders.reduce((acc, decoder) => ({
        ...acc,
        [decoder]: decoder.length
    }), {});

    return codedMap;
}

const simpleCodes = (codeMaps) => {
    // 2 -> 1
    // 4 -> 4
    // 3 -> 7
    // 7 -> 8

    return ({
        [Object.entries(codeMaps).filter(([_, len]) => len === 2)[0][0]]: 1,
        [Object.entries(codeMaps).filter(([_, len]) => len === 4)[0][0]]: 4,
        [Object.entries(codeMaps).filter(([_, len]) => len === 3)[0][0]]: 7,
        [Object.entries(codeMaps).filter(([_, len]) => len === 7)[0][0]]: 8
    })
}

const decodeItemsOfACertainLength = (simpleDecoded, codeMaps) => {
    const decoderMap = {
        5: {
            5: 9,
            3: 7,
            2: 10
        },
        6: {
            9: 9,
            6: 12,
            0: 10,
        },
    }
    // const simpleCodes = [2, 4, 3]

    const decoded = Object.entries(codeMaps).reduce((acc, [key, val]) => {
        if (![5, 6].includes(key.length)) return acc;
        let diffVal = 0;

        for (let [code, num] of Object.entries(simpleDecoded)){
            let tempKey = key;

            if (num === '8') continue;

            for (let letter of (code as string).split('')){
                tempKey = tempKey.replace(letter, '');
            }
            diffVal += tempKey.length
        }
    

        let num: number;
        for(let [nume, val] of Object.entries(decoderMap[key.length])){
            if (val === diffVal) {
                num = parseInt(nume);
            }
        }
        
        return {
            ...acc,
            [key]: num
        }
    }, {})

    return decoded;
}


export const deccodeForReal = (decoders: string[], digits: string[]): number => {
    const codeMaps = mapCodes(decoders);
    const knownUniverse = simpleCodes(codeMaps);

    const allDecoded = {
        ...knownUniverse,
        ...decodeItemsOfACertainLength(knownUniverse, codeMaps)
    }

    const decodedDigits = [];
    for(let digit of digits){
        decodedDigits.push(allDecoded[digit])
    }

    return parseInt(decodedDigits.join(''));
}

export const decode = (decoders: string[]): number => {
    return decodeSimpleCases(decoders);
}

const decodeSimpleCases = (decoders: string[]) => {
    const simpleCodes = [2, 4, 3, 7]
    const decoded: Decoded = simpleCodes.reduce((acc, code) => ({...acc, [code]: 0}), {});

    for (let decoder of decoders){
        if(simpleCodes.includes(decoder.length)) {
            decoded[decoder.length] += 1;
        }
    }

    return Object.entries(decoded).reduce((acc, [_, val]) => acc + val, 0);
}

/**
 * Day 7 -> lost in the ether of gitpod.io ( not their fault, I signed in to a work account when I did it and couldn't push back the changes, not commited enough to save them. Probably the best, most efficient solution. We'll never know)
 */


/** ######################
 *  Day 6
 *  ######################
 */

export const calculateFishies = (fishies: number[], days: number): number => {
    const fishyPod: Fishy = fishies.reduce((acc: Fishy, initSpawn: number) => {
        if (!acc[initSpawn]) {
            return {
                ...acc,
                [initSpawn]: 1
            }
        } else {
            acc[initSpawn] += 1;
        }
        return acc;
    }, {});

    return Object.entries(fishyPod).reduce((acc: number, [spawnKey, spawnCount]: [string, number]) => {
        return acc += (spawnCount * calculateFishieGeneration(parseInt(spawnKey), days));
    }, 0);
}

export const calculateFishieGeneration = (spawn: number, days: number): number => {
    const generations = [0,0,0,0,0,0,0,0,0];
    generations[spawn] = 1;
    for (let i = 0; i < days; i++){
        let first = generations.shift();
        generations.push(first);
        generations[6] += first;
    }
    return generations.reduce((acc, val) => acc + val, 0);
}

interface Fishy {
    [fishyStart: string]: number;
}

export interface FishCapture {
    fishes: number[];
}

export const loadFirstFish = (fishesList: string[]) => {
    const fishCapture: FishCapture = {
        fishes: []
    }
    for (let fishDays of fishesList){
        fishCapture.fishes.push(parseInt(fishDays))
    }
    return fishCapture;
}

/**
 * Day 5
 */
export interface CloudCoordinates {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface CloudCoordinatesReadout {
    cloudCoordinatesSet: CloudCoordinates[];
}

export interface CloudCoordinateCol {
    [colIndex: number]: number;
}

export interface CloudCoordinateTracking {
    [rowIndex: number]: CloudCoordinateCol;
}

export const countDangerZones = (trackedClouds: CloudCoordinateTracking): number => {
    let dangerZones = 0;
    for (let yCoord of Object.keys(trackedClouds)){
        for(let xCoord of Object.keys(trackedClouds[yCoord])){
            if(trackedClouds[yCoord][xCoord] > 1){
                dangerZones += 1;
            }
        }
    }
    return dangerZones;
}

enum CoordinateBoard {
    TBD = 'TBD',
    ONE_POINT = 'ONE_POINT',
    VERTICAL_LINE = 'VERTICAL_LINE',
    HORIZONTAL_LINE = 'HORIZONTAL_LINE',
    DIAGONAL_LINE = 'DIAGONAL_LINE',
}


const logicBoard = (x1: number, y1: number, x2: number, y2: number): CoordinateBoard => {
    if (x1 !== x2 && y1 === y2) return CoordinateBoard.HORIZONTAL_LINE;
    if (x1 === x2 && y1 !== y2) return CoordinateBoard.VERTICAL_LINE;
    if (x1 === x2 && y1 === y2) return CoordinateBoard.ONE_POINT;
    if (x1 !== x2 && y1 !== y2) return CoordinateBoard.DIAGONAL_LINE;
    return CoordinateBoard.TBD;
};

const calculateRowsAffected = (coord: CloudCoordinates, routing: CoordinateBoard): number[] => {
    if (routing === CoordinateBoard.HORIZONTAL_LINE || routing === CoordinateBoard.ONE_POINT){
        return [coord.y1];
    } else if (routing === CoordinateBoard.VERTICAL_LINE || routing === CoordinateBoard.DIAGONAL_LINE) {
        const targetRows = [];
        const [startY, endY] = coord.y1 > coord.y2 
        ? [coord.y2, coord.y1]
        : [coord.y1, coord.y2];

        for(let i = startY; i <= endY; i++){
            targetRows.push(i);
        }
        return coord.y1 > coord.y2 ? targetRows.reverse() : targetRows 
    }
    return  [];
}

export const trackCloudCoordinates = (coord: CloudCoordinates, rows: CloudCoordinateTracking): CloudCoordinateTracking => {
    const [x1, y1, x2, y2] = Object.values(coord);

    const routing = logicBoard(x1, y1, x2, y2);
    const targetRows = calculateRowsAffected(coord, routing);

    if (routing !== CoordinateBoard.DIAGONAL_LINE){
        const [startX, endX] = coord.x1 > coord.x2 
        ? [coord.x2, coord.x1]
        : [coord.x1, coord.x2];

        for (let yCoord of targetRows) {
            for (let i = startX; i <= endX; i++){
                if(!rows[yCoord]){
                    rows = {
                        ...rows,
                        [yCoord]: {}
                    }
                }
                if(rows[yCoord][i]){
                    rows[yCoord][i] += 1;
                } else {
                    rows[yCoord] = {
                        ...rows[yCoord],
                        [i]: 1,
                    }
                }
            }
        }
    } else {
        let i = coord.x1;
        const iterNum = coord.x1 > coord.x2 ? -1 : 1;

        for (let yCoord of targetRows) {
            if(!rows[yCoord]){
                rows = {
                    ...rows,
                    [yCoord]: {}
                }
            }
            if(rows[yCoord][i]){
                rows[yCoord][i] += 1;
            } else {
                rows[yCoord] = {
                    ...rows[yCoord],
                    [i]: 1,
                }
            }
            i += iterNum;
        }
    }

    return rows;
}

export const generateCloudCoordinates = (instructions: string): CloudCoordinates => {
    const [x1, y1, x2, y2] = instructions
        .split(' -> ')
        .reduce((coors: number[], ins: string): number[] => [
            ...coors,
            ...ins.split(',').map((coor: string) => parseInt(coor))
        ], []);

    return ({
        x1,
        y1,
        x2,
        y2
    });
}


/** 
 * Day 4 & Below
 */
export interface BingoCard {
    rows: number[][]
}

export interface BingoGame {
    calls: number[],
    cards: BingoCard[]
}

interface BingoWinner {
    winningCard: BingoCard;
    winningCall: number;
}

export interface BingoWinners {
    winners: BingoWinner[];
  }

export const calculateBingoSum = (card: BingoCard) => {
    return card ? card.rows.reduce((rowsSum, row) => {
      let cursorSum = row.reduce((colSum, colVal) => {
        return colVal ? colSum + colVal : colSum;
      }, 0);

      return cursorSum ? rowsSum + cursorSum : rowsSum;
    }, 0) : 0;
  }


export const checkCard = (call: number, card: BingoCard) => {
    let hits = card.rows[0].map((_) => 0);
    let rowHits = card.rows.map((_) => 0);

    const resCard = card.rows.map((row, index) => {
        rowHits[index] = row.filter((val) => val === null).length;
        return row.map((col, colIndex) => {
            if(col === call){
                col = null;
            }
            if(col === null){
                hits[colIndex] += 1;
            }
            return col
        })
    });
    hits = hits.concat(rowHits)
    const max = Math.max(...hits);
    return {
        card: {rows: resCard},
        status: max >= 5
    }
}

const populateCard = (line): BingoCard => {
    const rows = line.split('\n');
    const bingoCard: BingoCard = {
        rows: rows.map((row: string) => row
            .trim()
            .replace('  ', ' ')
            .split(' ')
            .map((val: string) => parseInt(val))
            .filter((val: number) => !Number.isNaN(val))
        )
    };
    return bingoCard
}

export const generateBingoGame = (): BingoGame => {
    const bingoGame: BingoGame = {
      calls: null,
      cards: []
    }
    for(let line of readBingos('/inputs/day4Input1.txt')){
      if (!bingoGame.calls){
        bingoGame.calls = line.split(',').map((val: string) => parseInt(val));
      } else {
        bingoGame.cards.push(populateCard(line));
      }
    }
    return bingoGame;
  }

export function *readBingos (filePath: string) {
    const text = fs.readFileSync(__dirname + filePath, 'utf-8');
    const lines = text.split('\n\n');
    for (let line of lines){
        yield line;
    }
}


export const calculateAim = (ans, change) =>  {
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
    }

    incrementFun[change.direction](ans, change.amount)
}

export const calculateCoordinates = (ans, change) => {
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
      }
  
    incrementFun[change.direction](ans, change.amount);
}

export const translateCoordinatesFromLine = (line: string) => {
    let [direction, amount] = line.split(' ');
    return {
        direction, 
        amount: parseInt(amount)
    };
}

export function *readFileByLine (filePath: string, type: string) {
    const text = fs.readFileSync(__dirname + filePath, 'utf-8');
    const lines = text.split('\n');
    for (let line of lines){
        if (type === 'int') {
            yield parseInt(line);
        } else if (type === 'binary') {
            yield parseInt(line, 2);
        } else {
            yield line;
        }
    }
}

const castLines = (lines: string[], type: string) => {
    if(type === 'int'){
        return lines.map((val) => parseInt(val));
    } else {
        return lines;
    }
}

export function *readFileByWindow (filePath: string, type: string, size: number) {
    const text = fs.readFileSync(__dirname + filePath, 'utf-8');
    const lines = text.split('\n');
    let response = lines.slice(0, size);
    let increment = 0
    while (response[2]) {
        response = increment === 0 ? response : lines.slice(increment, increment + size);
        increment++;
        yield castLines(response, type);
    }
}

export const captureIncrement = (line: number, last: number) => {
    return last && line > last ? 1 : 0;
};

// Memoize the counter, which increments by a number passed.
export const countIncrementsCurry = () => {
    let counter = 0;
    return (increment) => {
        counter = counter + increment;
        return counter;
    }
};

export const sumArray = (arr: number[]) => arr.reduce((acc: number, val: number) => acc + val, 0);