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
const matr = [
    [1,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,1,1],
    [1,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,1,0],
    [0,0,1,0,0,1,0,0,1],
    [1,0,0,0,1,0,0,0,1],
    [0,0,1,0,1,0,1,0,0]
]
const isWinner = (gameEl, playerSign = 'X')=>{
    for(let variant of matr){
        let count = 0;
        for(let i = 0; i<variant.length; i++){
            if(variant[i]&&gameEl[i]== playerSign){
                count+=1
            }
            
        }
        if(count == 3){
            return true;
        }
    } 
    return false;
}
module.exports = {
    firstPlayerTurn,
    secPlayerTurn,
    isWinner

}