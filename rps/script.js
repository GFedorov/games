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

$('.buttons.player img').on('click', function () {
    var playerElementClass = $(this).attr('data-el')
    setActiveButton($(this))
    var computerElement = computerChoice()
    var computerBtn = $('.computer .' + computerElement.className);
    setActiveButton(computerBtn)
    var res = computerElement.compare(playerElementClass)
    displayRes(res)
});