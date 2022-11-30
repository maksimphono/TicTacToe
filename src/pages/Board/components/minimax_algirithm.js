//import placeOnBoard from "../../../testing_win";

function getCellsFromMatrix(board){
    const cells = {};

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++){
            if (board[i][j] != null) {
                cells[`${i}${j}`] = board[i][j];
            }
        }
    }

    return cells;
}

function evaluate(cellsList, fullRow) {
    let pivot = null;
    let rowLen = 0;
    const directions = [[1, 0], [0, 1], [1, 1], [-1, 1]];
    let cellsToCheck = null;
    console.log("Start eval func, List : ");
    //console.table(cellsToCheck);
    
    for (let [dx, dy] of directions) {
        cellsToCheck = {...cellsList};
        //console.table(cellsToCheck);
        for (let current in cellsToCheck) {
            if (!cellsToCheck[current]) continue;
            pivot = cellsToCheck[current];
            rowLen = 1;
            for (let step of [1, -1]){
                for (let i = step; rowLen < fullRow && cellsToCheck[`${pivot.x + dx * i}${pivot.y + dy * i}`]?.sign === pivot.sign; i += step){
                    rowLen++;
                    //console.log("checkout ", `${pivot.x + dx * i}${pivot.y + dy * i}` , "row len : ", rowLen);
                    delete cellsToCheck[`${pivot.x + dx * i}${pivot.y + dy * i}`];
                }
            }
            if (rowLen >= fullRow) return true;
        }
    }
    return false;
}

function placeInList(cellsToCheck, i, j, sign, fullRow) {
    cellsToCheck[`${i}${j}`] = {sign: sign, groups: {0 : 0}, x : i, y : j};

    return evaluate(cellsToCheck, fullRow);
}

function minimax(cellsToCheck, boardLen, depth, isMax, signs, fullRow, signsNum, alpha = -1000, beta = 1000) {
    let score = null;
    let best = 0;

    if (signsNum >= boardLen ** 2 || depth >= 6) return 0;

    if (isMax) {
        best = -Infinity;
        for (let i = 0; i < boardLen; i++) {
            for (let j = 0; j < boardLen; j++){
                if (cellsToCheck[`${i}${j}`] == null){
                    if (placeInList(cellsToCheck, i, j, signs[0], fullRow)){
                        delete cellsToCheck[`${i}${j}`];
                        return 10 / (depth + 1);
                    }
                    best = Math.max(
                        best,
                        minimax(cellsToCheck, boardLen, depth + 1, !isMax, signs, fullRow, signsNum + 1, alpha, beta)
                    );
                    delete cellsToCheck[`${i}${j}`];
                    //removeFromBoard(board, i, j);
                    alpha = Math.max(alpha, best);
                    if (beta <= alpha)
                        break
                }
            }
            if (beta <= alpha)
                break
        }
        return best;
    } else {
        best = Infinity;
        for (let i = 0; i < boardLen; i++) {
            for (let j = 0; j < boardLen; j++){
                if (cellsToCheck[`${i}${j}`] == null){
                    if (placeInList(cellsToCheck, i, j, signs[1], fullRow)){
                        delete cellsToCheck[`${i}${j}`];
                        return -10 / (depth + 1);
                    }
                    best = Math.min(
                        best,
                        minimax(cellsToCheck, boardLen, depth + 1, !isMax, signs, fullRow, signsNum + 1, alpha, beta)
                    );
                    delete cellsToCheck[`${i}${j}`];
                    //removeFromBoard(board, i, j);
                    beta = Math.min(beta, best);
                    if (beta <= alpha)
                        break
                }
            }
            if (beta <= alpha)
                break
        }
        return best;
    }
}

export default async function findBestMove(board, placeOnBoard, winCallback, _signs, signsNum, fullRow){
    //return [Math.floor(Math.random() * board.length), Math.floor(Math.random() * board.length)];
    /*
    placeOnBoard(newB, 1, 1, _signs[0], fullRow);
    console.table(newB);
    console.table(board);
    return [Math.floor(Math.random() * board.length), Math.floor(Math.random() * board.length)];
    */
    let bestVal = -Infinity;
    let moveVal;
    let newBoard = null;
    let bestMove = [0, 0];
    const signs = [..._signs];
    let cellsToCheck = {};

    cellsToCheck = getCellsFromMatrix(board);
    console.log("Cells dict :");
    console.table(cellsToCheck);
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++){
            if (board[i][j] == null) {
                if (placeInList(cellsToCheck, i, j, signs[0], fullRow)){
                    bestMove = [i, j];
                    bestVal = 10;

                    console.log("Found value immediatly Best value is ", bestVal, "for", ...bestMove);
                    return bestMove;
                }

                moveVal = minimax(cellsToCheck, board.length, 0, false, signs, fullRow, signsNum);
                delete cellsToCheck[`${i}${j}`];
                console.log("counted value ", moveVal, "for", i, j);
                if (moveVal > bestVal){
                    bestMove = [i, j];
                    bestVal = moveVal;
                }
            }
        }
    }
    
    console.log("Best value is ", bestVal, "for", ...bestMove);
    /*
    if (bestVal == -1000){
        do {
            bestMove = [Math.floor(Math.random() * board.length), Math.floor(Math.random() * board.length)];
        } while (board[bestMove[0]][bestMove[1]]);
    }
    */
    return bestMove;
    
    //if (evaluate(cellsToCheck, 4)) console.log("Evaluate returns true");

    /*
    console.log("Cell queue : ", checkCellQueue);
    for (let cell of cellsToCheck) {
        if (placeOnBoard(newBoard, i, j, signs[0], fullRow)){
            bestMove = [i, j];
            bestVal = 10;
        }
    
        moveVal = minimax(newBoard, 0, false, signs, fullRow, signsNum);
        console.log("counted value ", moveVal, "for", i, j);
        if (moveVal > bestVal){
            bestMove = [i, j];
            bestVal = moveVal;
        }
    }
    */
    
    
}