import { readFileByLine } from "./utils";

const solveDay14part1 = (srcFile: string, steps: number = 4) => {
    let nav = {
        poly: '',
        ins: []
    }

    // Populate instructions from file
    for (let line of readFileByLine(`/inputs/${srcFile}`, 'txt')){
        if((line as string).includes('->')){
            nav.ins.push((line as string).split(' -> '))
        } else if ((line as string).length > 0){
            nav.poly = line as string;
        }
    }

    // Increment word size based on instructions.
    for (let i = 0; i < steps; i++){
        let cursor = {};

        // tract the injection point of letters and track the letters. 
        for (let instruction of nav.ins){
            let indexOf = nav.poly.indexOf(instruction[0]);
            while(indexOf >= 0){
                if (cursor[indexOf + 1] && cursor[indexOf + 1] !== undefined){
                    cursor[indexOf + 1] = cursor[indexOf + 1].concat(instruction[1]);
                } else {
                    cursor = {
                        ...cursor,
                        [indexOf + 1]: instruction[1]
                    };
                }
                indexOf = nav.poly.indexOf(instruction[0], indexOf + 1);
            }
        }

        let tempStr = nav.poly;
        let lastIndex = 0;
        let parts = [];
        let trackLast;

        // deconstruct the letters by the breaking points defined earlier.
        for (let index of Object.keys(cursor)){
            const [front, rest] = [tempStr.slice(0, parseInt(index) - lastIndex), tempStr.slice(parseInt(index) - lastIndex)];
            lastIndex = parseInt(index);
            parts.push(front);
            trackLast = rest;
            tempStr = rest;
        }
        parts.push(trackLast);
        let index = 0;
        tempStr = '';

        // Restructure the string with new letter values from earlier tracking.
        for (let letters of Object.values(cursor)){
            tempStr += parts[index].concat(letters);
            index++;
        }
        tempStr += parts[index];
        nav.poly = tempStr;
    }   

    let counter = {}
    // Count the distinct values form the string
    for (let letter of nav.poly){
        if(counter[letter]){
            counter[letter] += 1;
        } else {
            counter = {
                ...counter,
                [letter]: 1
            }
        }
    }

    // sort the counted values. 
    const vals: number[] = Object.values(counter).sort((a: number, b: number) => a-b) as number[];

    // subtract the greated value by the smallest value.
    return vals.pop() - vals[0];
}

describe.skip('Day 14 part 1', () => {
    it('Day 14 - Part 1  - sample', () => {
        console.log(solveDay14part1('day14sample.txt', 10));
    })
    it('Day 14 - Part 1  - input', () => {
        console.log(solveDay14part1('day14input.txt', 10));
    })
});

interface PolyTrack1000 {
    [pair: string]: number;
}

interface UniqueLetterCount {
    [letter: string]: number;
}

interface PolyTrackReference{
    [key: string]: string[]
}

const initializePolyTrackRefference = (instructions: number[][]): PolyTrackReference => {
    let polyTrackMap = {};

    for (let instruction of instructions) {
        let [target, injection] = instruction;
        polyTrackMap = {
            ...polyTrackMap,
            [target]: [target[0]+injection, injection+target[1]]
        }
    }
    return polyTrackMap;
}

const initializePolyTrack = (instructions: number[][], poly: string): PolyTrack1000 => {
    let polyTracker = {};

    for (let instruction of instructions) {
        let [target, injection] = instruction;
        polyTracker = {
            ...polyTracker,
            [target[0] + injection]: 0,
            [injection + target[1]]: 0
        }
    }

    for (let index = 0; index < poly.length-1; index++){
        if(polyTracker[poly.slice(index, index+2)]){
            polyTracker[poly.slice(index, index+2)] += 1;
        } else {
            polyTracker = {
                ...polyTracker,
                [poly.slice(index, index+2)]: 1
            }
        }
    }
    return polyTracker;
}

const iterateStep = (currentPoly: PolyTrack1000, referencePoly: PolyTrackReference): PolyTrack1000 => {
    let nextPolyTrack = {};

    for (let key of Object.keys(currentPoly)){
        if(currentPoly[key] && currentPoly[key] > 0){
            for(let ins of referencePoly[key]){
                if(nextPolyTrack[ins]){
                    nextPolyTrack[ins] +=  currentPoly[key];
                } else {
                    nextPolyTrack = {
                        ...nextPolyTrack,
                        [ins]: currentPoly[key]
                    }
                }
            }
        }
    }

    return nextPolyTrack;
}

const setupInstructions = (srcFile: string) => {
    let nav = {
        poly: '',
        ins: []
    }

    // Populate instructions from file
    for (let line of readFileByLine(`/inputs/${srcFile}`, 'txt')){
        if((line as string).includes('->')){
            nav.ins.push((line as string).split(' -> '))
        } else if ((line as string).length > 0){
            nav.poly = line as string;
        }
    }

    return nav;
}

const getUniqueLetters = (polyTracker: PolyTrack1000): Set<string> => {
    let uniqueLetters: Set<string> = new Set();
    for (let key of Object.keys(polyTracker)){
        uniqueLetters.add(key[0]);
        uniqueLetters.add(key[1]);
    }
    return uniqueLetters;
}

const getUniqueLetterCount = (polyTracker: PolyTrack1000, uniqueLetters: Set<string>): UniqueLetterCount => {
    let uniqueLetterCount = {};

    uniqueLetterCount = Object.entries(polyTracker).reduce((uniqueLetterCounter, [key, count]) => {
        if(count > 0){
            for(let letter of key.split('')){
                if(uniqueLetters.has(letter)){
                    if(uniqueLetterCounter[letter]){
                        uniqueLetterCounter[letter] += count;
                    } else {
                        uniqueLetterCounter = {
                            ...uniqueLetterCounter,
                            [letter]: count,
                        }
                    }
                }
            }
        }

        return uniqueLetterCounter;
    }, uniqueLetterCount);

    uniqueLetterCount = Object.entries(uniqueLetterCount).reduce((uniqueLetterCounter, [letter, count] : [string, number]) => ({
        ...uniqueLetterCounter,
        [letter]: count
    }), {})
    
    return uniqueLetterCount;
}

const solveDay14part2 = (srcFile, steps) => {
    const nav = setupInstructions(srcFile);

    let initialPolyTrack = initializePolyTrack(nav.ins, nav.poly);

    let polyTrackMap = initializePolyTrackRefference(nav.ins);

    let trackingPolyTrack = initialPolyTrack;
    for (let step = 0; step < steps; step++){
        trackingPolyTrack = iterateStep(trackingPolyTrack, polyTrackMap);
    }
    let uniqueLetters = getUniqueLetters(trackingPolyTrack);
    let uniqueLetterCount = getUniqueLetterCount(trackingPolyTrack, uniqueLetters);
    uniqueLetterCount[nav.poly[0]]++;
    uniqueLetterCount[nav.poly.slice(-1)]++;
    let sortedValues = Object.values(uniqueLetterCount)
        .map((val) => val/2)
        .sort((a, b) => a-b);
    const min = Math.min(...sortedValues);
    const max = Math.max(...sortedValues);

    return max - min;
}

describe.skip('Day 14 part 2', () => {
    it('Day 14 - Part 2  - sample', () => {
        console.log(solveDay14part2('day14sample.txt', 40));
    })
    it('Day 14 - Part 2  - input', () => {
        console.log(solveDay14part2('day14input.txt', 40));
    })
});