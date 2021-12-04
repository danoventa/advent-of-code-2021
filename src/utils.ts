import * as fs from 'fs';

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