"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("./utils");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    getDay5Part1() {
        let cloudCoordinatesReadout = { cloudCoordinatesSet: [] };
        for (let line of (0, utils_1.readFileByLine)('/inputs/day5Sample.txt', 'txt')) {
            cloudCoordinatesReadout.cloudCoordinatesSet.push((0, utils_1.generateCloudCoordinates)(line));
        }
        let cloudCoordinateTracking = {};
        for (let coord of cloudCoordinatesReadout.cloudCoordinatesSet) {
            cloudCoordinateTracking = (0, utils_1.trackCloudCoordinates)(coord, cloudCoordinateTracking);
        }
        const dangerZones = (0, utils_1.countDangerZones)(cloudCoordinateTracking);
        return dangerZones;
    }
    getDay5Part2() {
        let cloudCoordinatesReadout = { cloudCoordinatesSet: [] };
        for (let line of (0, utils_1.readFileByLine)('/inputs/day5Input1.txt', 'txt')) {
            cloudCoordinatesReadout.cloudCoordinatesSet.push((0, utils_1.generateCloudCoordinates)(line));
        }
        let cloudCoordinateTracking = {};
        for (let coord of cloudCoordinatesReadout.cloudCoordinatesSet) {
            cloudCoordinateTracking = (0, utils_1.trackCloudCoordinates)(coord, cloudCoordinateTracking);
        }
        const dangerZones = (0, utils_1.countDangerZones)(cloudCoordinateTracking);
        return dangerZones;
    }
    getDay4Part1() {
        const bingoGame = (0, utils_1.generateBingoGame)();
        let winner;
        let winningCall;
        for (let call of bingoGame.calls) {
            for (let index in bingoGame.cards) {
                const reportCard = (0, utils_1.checkCard)(call, bingoGame.cards[index]);
                bingoGame.cards[index] = reportCard.card;
                if (reportCard.status) {
                    winner = bingoGame.cards[index];
                    winningCall = call;
                    break;
                }
                ;
            }
            if (winner) {
                break;
            }
        }
        const winningSum = (0, utils_1.calculateBingoSum)(winner);
        return winningSum * winningCall;
    }
    getDay4Part2() {
        const bingoGame = (0, utils_1.generateBingoGame)();
        const winners = { winners: [] };
        const winnersIndex = [];
        for (let call of bingoGame.calls) {
            for (let index in bingoGame.cards) {
                if (winnersIndex.includes(index))
                    continue;
                const reportCard = (0, utils_1.checkCard)(call, bingoGame.cards[index]);
                bingoGame.cards[index] = reportCard.card;
                if (reportCard.status) {
                    winnersIndex.push(index);
                    winners.winners.push({
                        winningCard: bingoGame.cards[index],
                        winningCall: call
                    });
                }
                ;
            }
        }
        const lastWinner = winners.winners.pop();
        const lastWinningSum = (0, utils_1.calculateBingoSum)(lastWinner.winningCard);
        return lastWinner.winningCall * lastWinningSum;
    }
    getDay3Part1() {
        let count = 0;
        let cursor;
        for (let line of (0, utils_1.readFileByLine)('/inputs/day3Input1.txt', 'text')) {
            if (cursor) {
                const binaryLineList = line.split('');
                cursor = cursor.map((val, index) => val + parseInt(binaryLineList[index]));
            }
            else {
                cursor = line.split('').map(val => parseInt(val));
            }
            count += 1;
        }
        const binGamma = cursor.map((val) => Math.round(val / count).toString()).join('');
        const gammaVal = parseInt(binGamma, 2);
        const epsilonVal = parseInt(binGamma.split('').map(val => val ^ 1).join(''), 2);
        return gammaVal * epsilonVal;
    }
    getDay3Part2() {
        let cursor;
        let count = 0;
        let lineTracker = [];
        for (let line of (0, utils_1.readFileByLine)('/inputs/day3Input1.txt', 'text')) {
            if (cursor) {
                const binaryLineList = line.split('');
                lineTracker.push(binaryLineList.map(val => parseInt(val)));
            }
            else {
                cursor = line.split('').map(val => parseInt(val));
            }
            count += 1;
        }
        const getCommonItem = (items, target) => {
            let reductionList = items;
            for (let cursor = 0; cursor < reductionList[0].length; cursor++) {
                let sum = 0;
                for (let item of reductionList) {
                    sum += item[cursor];
                }
                const meanCalc = sum / reductionList.length;
                const common = Math.round(meanCalc) ^ (target ^ 1);
                if (reductionList.length === 1)
                    break;
                let nextReductionList = [];
                for (let item of reductionList) {
                    if (item[cursor] === common) {
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
    getDay2Part1() {
        const ans = {
            horizontal: 0,
            vertical: 0,
        };
        for (let line of (0, utils_1.readFileByLine)('/inputs/day2Input1.txt', 'text')) {
            (0, utils_1.calculateCoordinates)(ans, (0, utils_1.translateCoordinatesFromLine)(line));
        }
        return ans.horizontal * ans.vertical;
    }
    getDay2Part2() {
        const ans = {
            horizontal: 0,
            vertical: 0,
            aim: 0
        };
        for (let line of (0, utils_1.readFileByLine)('/inputs/day2Input1.txt', 'text')) {
            (0, utils_1.calculateAim)(ans, (0, utils_1.translateCoordinatesFromLine)(line));
        }
        return ans.horizontal * ans.vertical;
    }
    getDay1Part1() {
        let last;
        const countIncrementer = (0, utils_1.countIncrementsCurry)();
        let ans;
        for (let line of (0, utils_1.readFileByLine)('/inputs/day1Input1.txt', 'int')) {
            ans = countIncrementer((0, utils_1.captureIncrement)(line, last));
            last = line;
        }
        return ans;
    }
    getDay1Part2() {
        let lastSum;
        let ans;
        const captureIncrementerr = (0, utils_1.countIncrementsCurry)();
        for (let window of (0, utils_1.readFileByWindow)('/inputs/day1Input1.txt', 'int', 3)) {
            const currentSum = (0, utils_1.sumArray)(window);
            ans = captureIncrementerr((0, utils_1.captureIncrement)(currentSum, lastSum));
            lastSum = currentSum;
        }
        return ans;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map