const choice = () => {
    return Math.floor(Math.random() * 6) + 1;
}

const compare = (playerDice, computerDice) => {
    if (playerDice > computerDice) return 1;
    if (playerDice == computerDice) return 0;
    if (playerDice < computerDice) return -1;
}

const getResText = (res) => {
    if (res == 1) {
        return "You won!"
    } else if (res == 0) {
        return "Spare!"
    } else if (res == -1) {
        return "Wasted!"
    }

}
module.exports = {
    choice,
    getResText,
    compare
}