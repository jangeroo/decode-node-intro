const inquirer = require('inquirer')

let hiddenNumber = Math.floor(Math.random()*99) + 1
console.log(hiddenNumber);

let guesses = 5;

function play() {
    
    inquirer.prompt({
        type: 'input',
        name: 'guess',
        message: 'Guess a number between 1-100'
    })
    .then(answers => {

        // Check if the player won
        if (answers.guess == hiddenNumber) {
            guesses = 0;
            console.log('You WON! :D')
        }
        else {

            guesses = guesses -1
            // console.log('you have', guesses, 'guesses left')

            // If the player hasn't lost yet, play again
            if (guesses > 0) {
                // Give the user a hint
                if (answers.guess > hiddenNumber)
                    console.log('Too high. Guess something lower.')
                else
                    console.log('Too low. Guess something higher')
                play()
            } else {
                // The player has lost
                console.log('You LOST! :(')
            }
        }
    });
}

play()