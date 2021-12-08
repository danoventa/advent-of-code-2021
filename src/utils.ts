import { spawn } from 'child_process';
import * as fs from 'fs';
import { mergeMap } from 'rxjs';

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
 * Day 7
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