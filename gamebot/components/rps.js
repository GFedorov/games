const EL_ROCK = 'rock';
const EL_PAPER = 'paper';
const EL_SCISSORS = 'scissors';
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

const computerChoice = () => {
    var index = Math.floor(Math.random() * elements.length);
    var elId = elements[index];
    return settings[elId]
}

const checkCommand = (command) => elements.indexOf(command) !== -1

function getResText(res) {
    if (res == 1) {
        return "You won!"
    } else if (res == 0) {
        return "Spare!"
    } else if (res == -1) {
        return "Wasted!"
    }

}

module.exports = {
    checkCommand,
    computerChoice,
    getResText
}
