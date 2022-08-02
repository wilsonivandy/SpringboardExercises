"use strict";

let $guessInput = "";
const $guessSubmitBtn = $('#guessSubmitBtn');
const $guessForm = $('#guessForm');
let $respondStatus = $('#respond');
let $score = $('#score');
let $time = $('#time');
let $highScore = $('#highScore');
let score = 0;
let time = 30;
let highScore = 0;
let $playAgain = $('#play-again');
let $resetGame = $('#reset-game');
let numGame;

$guessForm.on("submit", async function(e){
    e.preventDefault();
    let $guessInput = $('#guess').val();
    let response = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/submit-guess",
        data: {"guess" : $guessInput}
    });
    let respond = response.data['result']
    if (respond == 'ok') {
        score += 1;
    }
    $score.html(`Score is: ${score}`)
    $respondStatus.html(`Response is: ${respond}`);
})

$guessForm.ready(function(){
    let timer = setInterval(function(){
        time -= 1;
        if (time <= 0) {
            clearInterval(timer);
            $guessForm.css('display', 'none');
            $time.html(`Time's Up!`);
            finishResponse();
            $playAgain.removeClass('hide');
            $resetGame.removeClass('hide');
        } else {
            $time.html(`Time Left: ${time}`);
        }
    }, 1000)
});

async function finishResponse(){
    let finishResponse = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/finish-guess",
        data: {"score" : `${score}`}
    });
    let scoreList = finishResponse.data['score'];
    highScore = Math.max(...scoreList);
    $highScore.html(`High score is: ${highScore} out of ${scoreList.length} games`);
}