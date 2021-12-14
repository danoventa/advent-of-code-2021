import { readFileByLine } from "./utils";

interface Coordinate {
    x: number;
    y: number;
}

interface Fold {
    direction: string;
    location: number;
}

interface Instructions {
    coordinates: Coordinate[];
    folds: Fold[];
}

const getFold = (line: string): Fold => {
    const [_, __, instructions] = line.split(' ');
    const [direction, location] = instructions.split('=');
    return ({direction, location: parseInt(location)})
}
const getCoordinate = (line: string): Coordinate => {
    const [x, y] = line.split(',').map((val) => parseInt(val));
    return ({x, y});
}

const readInstructions = (srcFile: string) => {
    const instructions: Instructions = {
        coordinates: [],
        folds: []
    }

    for (let line of readFileByLine(`/inputs/${srcFile}`, 'txt')){
        if((line as string).includes('fold')){
            instructions.folds.push(getFold(line as string));
        } else if ((line as string).length > 0) {
            instructions.coordinates.push(getCoordinate(line as string));
        }
    }
    return instructions;
}

const calculateFold = (fold: Fold, instructions: Instructions) => {
    for (let coordinate in instructions.coordinates){
        if(fold.direction === "y"){
            instructions.coordinates[coordinate].y = 
                instructions.coordinates[coordinate].y > fold.location 
                    ? Math.abs(instructions.coordinates[coordinate].y - (fold.location * 2))
                    : instructions.coordinates[coordinate].y;
        } else {
            instructions.coordinates[coordinate].x = 
                instructions.coordinates[coordinate].x > fold.location 
                    ? Math.abs(instructions.coordinates[coordinate].x - (fold.location * 2))
                    : instructions.coordinates[coordinate].x;
        }
    }
}

const getUniqueCoords = (instructions: Instructions): Set<string> => {
    let uniqueCoordinates: Set<string> = new Set();
    for (let coordinate of instructions.coordinates){
        uniqueCoordinates.add([coordinate.x, coordinate.y].join(','));
    }
    return uniqueCoordinates;    
}

const solveDay13part1 = (srcFile: string) => {
    let instructions: Instructions = readInstructions(srcFile);
    for (let fold of instructions.folds){
        calculateFold(fold, instructions);
        const uniqueCoords = getUniqueCoords(instructions);
        console.log("Unique COordinates", uniqueCoords.size);
    }
}

describe('Day 13 part 1', () => {
    it.skip('Day 13 - Part 1  - sample', () => {
        solveDay13part1('day13sample.txt');
    })
    it.skip('Day 13 - Part 1  - input', () => {
        solveDay13part1('day13input.txt');
    })
});

const drawCode = (uniqueCodes: Set<string>) => {
    const coordinates = [...uniqueCodes].map((coord) => 
        coord.split(',')).map((coord) => [parseInt(coord[0]), parseInt(coord[1])]);

    const maxX = coordinates.reduce((maxX, [x, _]) => maxX > x ? maxX : x, 0);
    const maxY = coordinates.reduce((maxX, [_, y]) => maxX > y ? maxX : y, 0);

    let matrix = ''
    for (let y = 0; y <= maxY; y++){
        for (let x = 0; x <= maxX; x++){
            if(uniqueCodes.has([x, y].join(','))){
               matrix = matrix.concat('#');
            } else {
               matrix = matrix.concat('.');
            }
        }
        matrix = matrix.concat('\n');
    }
    console.log(matrix);
}

const solveDay13part2 = (srcFile) => {
    let instructions: Instructions = readInstructions(srcFile);
    for (let fold of instructions.folds){
        calculateFold(fold, instructions);
    }
    const uniqueCoords = getUniqueCoords(instructions);
    drawCode(uniqueCoords);
}

describe('Day 13 part 2', () => {
    it('Day 13 - Part 2 - Input', () => {
        solveDay13part2('day13input.txt');
    });
});