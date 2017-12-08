const fs = require('fs');
const path = require('path');
const validator = require('./validator');


const passphraseChecker = (passphrase) => {

    return passphrase
        .split(' ')
        .reduce((valid, wordA, i, words) => {

            if (!valid) return false;

            words.forEach((wordB, j) => {

                if (i === j) return;

                if (wordA === wordB) {
                    valid = false;
                }
            });

            return valid;
        }, true);
};

const validations = new Map([
    ['aa bb cc dd ee', true],
    ['aa bb cc dd aa', false],
    ['aa bb cc dd aaa', true]
])

validator(passphraseChecker, validations);


const calculateTotalValid = (string) => {

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
    console.log(calculateTotalValid(string));
});
