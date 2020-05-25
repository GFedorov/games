// добавить функцию compare
// получает на вход два числа, возвращает число (-1 | 0 | 1)

function compare(playerDice, computerDice) {
    if (playerDice > computerDice) return 1;
    if (playerDice == computerDice) return 0;
    if (playerDice < computerDice) return -1;
}

var score = 0;
var goal = 2;

const resBtn = $('.reset')
function displayRes(res) {
    var text = " "
    if (res == 1) {
        text = "You won!"
    } else if (res == 0) {
        text = "Spare!"
    } else if (res == -1) {
        text = "Wasted!"
    }
    $('#display-text h2').text(text)
}

// заменить на rollDice
function rollDice() {
    var userDiceValue = getRandomDiceValue();
    userEl = $('.player.buttons img');
    displayDiceResult(userEl, userDiceValue);
    var computerDiceValue = getRandomDiceValue();
    computerEl = $('.computer.buttons img');
    displayDiceResult(computerEl, computerDiceValue);
    var res = compare(userDiceValue, computerDiceValue);
    displayRes(res)
    return res;
}

function displayDiceResult(targetEl, diceValue) {
    targetEl.attr('src', 'img/dice-' + diceValue + '.png');
}

// function setActiveButton(btn) {
//     var wrapper = btn.parent();
//     wrapper.find('img').removeClass('active')
//     btn.addClass('active')
// }

// заменить на getRandomDiceValue
function getRandomDiceValue() {
    return Math.floor(Math.random() * 6) + 1;
}

// оставить
function startInfo(score) {
    $('#display-text h2').text('Roll your dice')
    $('#display-text p').text('current result: ' + score)

}
function winDisp() {
    $('#display-text h2').text('You are total winner')

}
function loseDisp() {
    $('#display-text h2').text('You are total loser')
}

// переписать
$('.buttons.player img').on('click', function () {
    // var playerElementClass = $(this).attr('data-el')
    // setActiveButton($(this))
    // var computerElement = computerChoice()
    // var computerBtn = $('.computer .' + computerElement.className);
    // setActiveButton(computerBtn)
    // var res = computerElement.compare(playerElementClass)
    // resBtn.addClass('active')
    // displayRes(res)
    score += rollDice();
    if (score === goal) {
        winDisp();
        alert('Finish')
    } else if (score === -goal) {
        loseDisp();
        alert('Finish')
    }
});

startInfo(score)
// заменить на "Кинуть снова"
// resBtn.on('click', function () {
//     $('.buttons img').addClass('active')
//     startInfo(score)
// });