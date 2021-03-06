import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { BingoCard, BingoGame, BingoWinners, calculateAim, calculateBingoSum, calculateCoordinates, calculateFishies, captureIncrement, checkCard, CloudCoordinatesReadout, CloudCoordinateTracking, countDangerZones, countIncrementsCurry, deccodeForReal, decode, findLocalMinimum, generateBingoGame, generateCloudCoordinates, loadFirstFish, multiplicate3MaxBasins, readBingos, readFileByLine, readFileByWindow, scoreIllegalSyntax, scoreRemainingSyntax, solveProblem11P1, solveProblem11P2, sumArray, trackCloudCoordinates, translateCoordinatesFromLine } from './utils';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  /**
   * Day 11
   */
   getDay11Part1(): number {
    let lines: string[] = [];
    for (let line of readFileByLine('/inputs/day11inputs.txt', 'txt')){
      lines.push(line as string);
    }

    return solveProblem11P1(lines, 100);
  }


  getDay11Part2(): number {
    let lines: string[] = [];
    for (let line of readFileByLine('/inputs/day11inputs.txt', 'txt')){
      lines.push(line as string);
    }

    return solveProblem11P2(lines, Infinity);
  }

   /**
   * 
   * Day 10 
   */
    getDay10Part1(): number {
      let lines: string[] = [];
      for (let line of readFileByLine('/inputs/day10inputs.txt', 'txt')){
        lines.push(line as string);
      }
  
      return scoreIllegalSyntax(lines);
    }
  
  
    getDay10Part2(): number {
      let lines: string[] = [];
      for (let line of readFileByLine('/inputs/day10inputs.txt', 'txt')){
        lines.push(line as string);
      }
  
      return scoreRemainingSyntax(lines);
    }
  

  /**
   * 
   * Day 9 
   */


  getDay9Part1(): number {
    let matrix: number[][] = [];
    for (let line of readFileByLine('/inputs/day9inputs.txt', 'txt')){
      const row: number[]  = (line as string).split('').map((val) => parseInt(val));
      matrix.push(row);
    }

    return findLocalMinimum(matrix);
  }


  getDay9Part2(): number {
    let matrix: number[][] = [];
    for (let line of readFileByLine('/inputs/day9inputs.txt', 'txt')){
      const row: number[]  = (line as string).split('').map((val) => parseInt(val));
      matrix.push(row);
    }

    return multiplicate3MaxBasins(matrix);
  }


   /**
   * 
   * Day 8
   */
    getDay8Part1(): number {
      let sumCursor = 0;
      for (let line of readFileByLine('/inputs/day8Inputs.txt', 'txt')){
        const [_, digitsLine] = (line as string).split(' | ');
        const digits = digitsLine.split(' ').map((val) => val.split('').sort().join(''));
        sumCursor += decode(digits);
      }

      return sumCursor;
    }
  
    getDay8Part2(): number {
      let sumCursor = 0;
      for (let line of readFileByLine('/inputs/day8Inputs.txt', 'txt')){
        const [decoderLine, digitsLine] = (line as string).split(' | ');
        const decoders = decoderLine.split(' ').map((val) => val.split('').sort().join(''));
        const digits = digitsLine.split(' ').map((val) => val.split('').sort().join(''));
        sumCursor += deccodeForReal(decoders, digits);
      }

      return sumCursor;
    }

  /**
   * 
   * Day 7
   */
  getDay7Part1(): number {
    let things: number[];
    for (let line of readFileByLine('/inputs/day7Input.txt', 'txt')){
      things = (line as string).split(',').map((val: string) => parseInt(val));
    }

    return 0;
  }

  getDay7Part2(): number {
    return 0;
  }

  /** ######################
   *  Day 6
   *  ######################
   */

  getDay6Part1(): number {
    let fishCapture;
    for (let line of readFileByLine('/inputs/day6Input.txt', 'txt')){
      const fishes = (line as string).split(',');
      fishCapture = loadFirstFish(fishes); 
    }

    return calculateFishies(fishCapture.fishes, 80);
  }

  getDay6Part2(): number {
    let fishCapture;
    for (let line of readFileByLine('/inputs/day6Input.txt', 'txt')){
      const fishes = (line as string).split(',');
      fishCapture = loadFirstFish(fishes); 
    }

    return calculateFishies(fishCapture.fishes, 256); 
  }

  /** ######################
   *  Day 5
   *  ######################
   */
    getDay5Part1(): number {
      let cloudCoordinatesReadout: CloudCoordinatesReadout = {cloudCoordinatesSet: []};
      for (let line of readFileByLine('/inputs/day5Sample.txt', 'txt')){
        cloudCoordinatesReadout.cloudCoordinatesSet.push(generateCloudCoordinates(line as string));
      }

      let cloudCoordinateTracking: CloudCoordinateTracking = {};
      for (let coord of cloudCoordinatesReadout.cloudCoordinatesSet){
        cloudCoordinateTracking = trackCloudCoordinates(coord, cloudCoordinateTracking);
      }
      const dangerZones = countDangerZones(cloudCoordinateTracking);

      return dangerZones;
    }

    getDay5Part2(): number {
      let cloudCoordinatesReadout: CloudCoordinatesReadout = {cloudCoordinatesSet: []};
      for (let line of readFileByLine('/inputs/day5Input1.txt', 'txt')){
        cloudCoordinatesReadout.cloudCoordinatesSet.push(generateCloudCoordinates(line as string));
      }

      let cloudCoordinateTracking: CloudCoordinateTracking = {};
      for (let coord of cloudCoordinatesReadout.cloudCoordinatesSet){
        cloudCoordinateTracking = trackCloudCoordinates(coord, cloudCoordinateTracking);
      }
      const dangerZones = countDangerZones(cloudCoordinateTracking);

      return dangerZones;    
    }

    /** ######################
   *  Day 4
   *  ######################
   */
  getDay4Part1(): number {
    const bingoGame: BingoGame = generateBingoGame();

    let winner: BingoCard;
    let winningCall: number;
    for(let call of bingoGame.calls){
      for(let index in bingoGame.cards){
        const reportCard = checkCard(call, bingoGame.cards[index]);
        bingoGame.cards[index] = reportCard.card;
        if(reportCard.status){
          winner = bingoGame.cards[index];
          winningCall = call;
          break;
        };
      }
      if(winner){
        break;
      }
    }

    const winningSum = calculateBingoSum(winner);
    return winningSum * winningCall;
  }

  getDay4Part2(): number {
    const bingoGame: BingoGame = generateBingoGame();

    const winners: BingoWinners = {winners: []};
    const winnersIndex: string[] = [];
    for(let call of bingoGame.calls){
      for(let index in bingoGame.cards){
        if (winnersIndex.includes(index)) continue;

        const reportCard = checkCard(call, bingoGame.cards[index]);
        bingoGame.cards[index] = reportCard.card;
        if(reportCard.status){
          winnersIndex.push(index);
          winners.winners.push({
            winningCard: bingoGame.cards[index],
            winningCall: call
          })
        };
      }
    }

    const lastWinner = winners.winners.pop();
    const lastWinningSum = calculateBingoSum(lastWinner.winningCard);

    return lastWinner.winningCall * lastWinningSum;
  }

  /** ######################
   *  Day 3
   *  ######################
   */
  getDay3Part1(): number {
    let count = 0;
    let cursor;
    for(let line of readFileByLine('/inputs/day3Input1.txt', 'text')){
      if (cursor) {
        const binaryLineList = (line as string).split('');
        cursor = cursor.map((val, index) => val + parseInt(binaryLineList[index]));
      } else {
        cursor = (line as string).split('').map(val => parseInt(val));
      }
      count += 1;
    }

    const binGamma = cursor.map((val) => Math.round(val / count).toString()).join('');
    const gammaVal = parseInt(binGamma, 2);
    const epsilonVal = parseInt(binGamma.split('').map(val => val ^ 1).join(''), 2);

    return gammaVal * epsilonVal;
  }

  getDay3Part2(): number {
    let cursor;
    let count = 0;
    let lineTracker = [];
    for(let line of readFileByLine('/inputs/day3Input1.txt', 'text')){
      if (cursor) {
        const binaryLineList = (line as string).split('');
        lineTracker.push(binaryLineList.map(val => parseInt(val)));
      } else {
        cursor = (line as string).split('').map(val => parseInt(val));
      }
      count += 1;
    }

    const getCommonItem = (items, target) => {
      let reductionList = items;
      for(let cursor = 0; cursor < reductionList[0].length; cursor++){
        // get common target
        let sum = 0;
        for(let item of reductionList){
          sum += item[cursor]
        }

        const meanCalc = sum/reductionList.length;
        const common = Math.round(meanCalc) ^ (target ^ 1);

        if(reductionList.length === 1) break;

        let nextReductionList = []
        for(let item of reductionList){
          if(item[cursor] === common){
            nextReductionList.push(item);
          }
        }
        reductionList = nextReductionList;
      }
      return reductionList[0].join('');
    };

    const getOxyLine = (items) => getCommonItem(items, 1);
    const getCo2Line = (items) => getCommonItem(items, 0);

    const co2Line = getOxyLine(lineTracker);
    const oxyLine = getCo2Line(lineTracker);

    const oxy = parseInt(oxyLine, 2);
    const co2 = parseInt(co2Line, 2);

    return oxy * co2;
  }

  /** ######################
   *  Day 2
   *  ######################
   */
  
  getDay2Part1(): number {
    const ans = {
      horizontal: 0,
      vertical: 0,
    }

    for (let line of readFileByLine('/inputs/day2Input1.txt', 'text')){
      calculateCoordinates(ans, translateCoordinatesFromLine(line as string));
    }
    return ans.horizontal * ans.vertical;
  }

    
  getDay2Part2(): number {
      const ans = {
        horizontal: 0,
        vertical: 0,
        aim: 0
      }
  
      for (let line of readFileByLine('/inputs/day2Input1.txt', 'text')){
        calculateAim(ans, translateCoordinatesFromLine(line as string));
      }
      return ans.horizontal * ans.vertical;
  }
   
  /** ######################
   *  Day 1
   *  ######################
   */

  getDay1Part1(): number {
    let last;
    // Curried function to store the counter reference.
    const countIncrementer = countIncrementsCurry();

    let ans;
    for (let line of readFileByLine('/inputs/day1Input1.txt', 'int')){
      // increase count by count captured.
      ans = countIncrementer(captureIncrement(line as number, last))
      last = line;
    }

    return ans;
  }
  
  getDay1Part2(): number {
    let lastSum; 
    let ans;

    const captureIncrementerr = countIncrementsCurry();
    for (let window of readFileByWindow('/inputs/day1Input1.txt', 'int', 3)){
      const currentSum = sumArray(window as number[]);
      ans = captureIncrementerr(captureIncrement(currentSum, lastSum));
      lastSum =  currentSum;
    }
    return ans;
  }
}