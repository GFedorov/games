const EL_ROCK = 1;
const EL_PAPER = 2;
const EL_SCISSORS = 3;
const elements = [EL_ROCK, EL_PAPER, EL_SCISSORS];
const settings = {
    [EL_ROCK]: {
        className: 'rock',
        compare: function (otherClassName) {
            if (otherClassName == 'rock') {
                return 0
            }
            if (otherClassName == 'paper') {
                return 1
            }
            if (otherClassName == 'scissors') {
                return -1
            }
        }
    },
    [EL_PAPER]: {
        className: 'paper',
        compare: function (otherClassName) {
            if (otherClassName == 'rock') {
                return -1
            }
            if (otherClassName == 'paper') {
                return 0
            }
            if (otherClassName == 'scissors') {
                return 1
            }
        }
    },
    [EL_SCISSORS]: {
        className: 'scissors',
        compare: function (otherClassName) {
            if (otherClassName == 'rock') {
                return 1
            }
            if (otherClassName == 'paper') {
                return -1
            }
            if (otherClassName == 'scissors') {
                return 0
            }
        }
    }
};
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
function setActiveButton(btn) {
    var wrapper = btn.parent();
    wrapper.find('img').removeClass('active')
    btn.addClass('active')
}

function computerChoice() {
    var index = Math.floor(Math.random() * elements.length);
    var elId = elements[index];
    return settings[elId]
}

function startInfo(score){
    $('#display-text h2').text('Make your choice')
    $('#display-text p').text('current result: '+score)

}
function winDisp(){
    $('#display-text h2').text('You are total winner')

}
function loseDisp(){
    $('#display-text h2').text('You are total loser')

}

$('.buttons.player img').on('click', function () {
    var playerElementClass = $(this).attr('data-el')
    setActiveButton($(this))
    var computerElement = computerChoice()
    var computerBtn = $('.computer .' + computerElement.className);
    setActiveButton(computerBtn)
    var res = computerElement.compare(playerElementClass)
    resBtn.addClass('active')
    displayRes(res)
    score +=res;
    console.log(score)
    if (score === goal){
        winDisp();

    }else if(score === -goal){
        loseDisp();
    }
});

resBtn.on('click', function (){
    $('.buttons img').addClass('active')
    startInfo(score)
});