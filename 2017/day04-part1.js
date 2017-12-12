const fs = require('fs');
const path = require('path');
const validator = require('./validator');


const passphraseCheckerGenerator = (predicate) => {

    return (passphrase) => {

        return passphrase
            .split(' ')
            .reduce((valid, wordA, i, words) => {

                if (!valid) return false;

                words.forEach((wordB, j) => {

                    if (i === j) return;

                    if (predicate(wordA, wordB)) {
                        valid = false;
                    }
                });

                return valid;
            }, true);
    };
};


const validations = {};

const isEqual = (wordX, wordY) => wordX === wordY;

validations.part1 = new Map([
    ['aa bb cc dd ee', true],
    ['aa bb cc dd aa', false],
    ['aa bb cc dd aaa', true]
])

validator(passphraseCheckerGenerator(isEqual), validations.part1);


const isAnagram = (wordX, wordY) => {

    if (wordX.length !== wordY.length) return false;

    const xArr = wordX.split('');
    const yArr = wordY.split('');

    let i = 0
    while (xArr.length) {

        const yPos = yArr.indexOf(xArr[i]);

        if (yPos === -1) return false;

        xArr.splice(i, 1);
        yArr.splice(yPos, 1);
    }

    return true;
};

validations.part2 = new Map([
    ['abcde fghij', true],
    ['abcde xyz ecdab', false],
    ['a ab abc abd abf abj', true],
    ['iiii oiii ooii oooi oooo', true],
    ['oiii ioii iioi iiio', false]
]);

validator(passphraseCheckerGenerator(isAnagram), validations.part2);


const calculateTotalValid = (string, predicate) => {

    const passphraseChecker = passphraseCheckerGenerator(predicate);

    return string
        .split('\n')
        .reduce((totalValid, row) => {

            if (passphraseChecker(row)) {
                totalValid++;
            }
            return totalValid;
        }, 0);
}

fs.readFile(path.resolve(__dirname, './day04-input'), 'utf8', (err, string) => {

    if (err) throw err;
    console.log(calculateTotalValid(string, isEqual));
    console.log(calculateTotalValid(string, isAnagram));
});
