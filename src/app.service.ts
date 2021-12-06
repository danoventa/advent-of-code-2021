import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { BingoCard, BingoGame, BingoWinners, calculateAim, calculateBingoSum, calculateCoordinates, captureIncrement, checkCard, CloudCoordinatesReadout, CloudCoordinateTracking, countDangerZones, countIncrementsCurry, generateBingoGame, generateCloudCoordinates, readBingos, readFileByLine, readFileByWindow, sumArray, trackCloudCoordinates, translateCoordinatesFromLine } from './utils';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
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

      return dangerZones;    }

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