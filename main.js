'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * 
 * @param {string} guess 4 letters in a string 
 * @returns correctLetterLocation - correctletter... 
 */
const generateHint = (guess) =>  {
  // your code here
  let solutionArray = solution.split("");
  let guessArray = guess.split("");
  let correctLetterLocations = 0;
  let correctLetters = 0;
  
  for (let i = 0; i < solutionArray.length; i++){
    if (solutionArray[i] === guessArray[i]){
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }

  for (let i = 0; i < solutionArray.length; i++) {
     let targetIndex = solutionArray.indexOf(guessArray[i])
     if (targetIndex > -1){
      correctLetters++
      solutionArray[targetIndex] = null;
     }

  }
  let hint = correctLetterLocations.toString() + "-" + correctLetters.toString();
  return hint;

  
}

const mastermind = (guess , solution) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here

  if (guess == solution){ 
    board = []
    console.log("you won")
    return "You guessed it!";
   
  } else {
    let hint = generateHint(guess)
    board.push(guess + " " + hint)
    
    if (board.length > 10) {
       console.log("no more guesses")
       return "You ran out of turns! The solution was " + solution  
    } else {
      console.log("play again")
      return "Guess Again"
    }
  }




}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}