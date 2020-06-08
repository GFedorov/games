const firstPlayerTurn = (index, gameEl) => {
    let success = true;
    let message = ''
    const newGameEl = [...gameEl]
    if (
        newGameEl[index] == '-'
    ) {
        newGameEl[index] = 'X'
    } else {
        success = false;
        message = 'Cell is not available';
    }
    return {
        success,
        message,
        data: newGameEl
    }
}
const secPlayerTurn = (gameEl) => {
    const newGameEl = [...gameEl]
    let freeCell = newGameEl.filter(el=>el=='-').length;
    let randCell = Math.floor(Math.random()*freeCell)

    for (let i = 0; i < newGameEl.length; i++) {
        if (
            newGameEl[i] == '-'
        ) { freeCell -= 1
            if(
                freeCell == randCell
            ){
                newGameEl[i] = '0'
                return newGameEl; 
            }
             }
    }
    return newGameEl;
}
module.exports = {
    firstPlayerTurn,
    secPlayerTurn

}