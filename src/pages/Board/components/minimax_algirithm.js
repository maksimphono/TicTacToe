import placeOnBoard from "../../../testing_win";

//const placeOnBoard = (e) => null;
function copyCell(cell){
    return {
        groups : {
            "-" : [cell.groups["-"] && cell.groups["-"][0] || 0],
            "|" : [cell.groups["|"] && cell.groups["|"][0] || 0],
            "dl" : [cell.groups["dl"] && cell.groups["dl"][0] || 0],
            "dr" : [cell.groups["dr"] && cell.groups["dr"][0] || 0]
        },
        sign : cell.sign
    }
}

function copyBoard(board) {
    const newBoard = Array(board.length).fill().map(() => Array(board.length).fill());

    board.forEach((row, i) => 
        (board[i].forEach((cell, j) => 
            newBoard[i][j] = cell && copyCell(cell)
    )));
    return newBoard;
}

function isMovesLeft(board, signsNum) {
    return signsNum < (board.length ** 2);
}


function getNeighbours(board, i, j) {
    const directionsGroups = [ [0, 1], [1, 0], [1, 1], [-1, 1] ];
    let pivotCell = null;
    let oppositeCell = null;
    const neightbours = [];

    console.log("Check neightbour on ", i, j);
    for (let [di, dj] of directionsGroups) {
        pivotCell = board[i + di] && board[i + di][j + dj];
        oppositeCell = board[i - di] && board[i - di][j - dj];
        
        if (pivotCell === null) neightbours.push([i + di, j + dj]);
        if (oppositeCell === null) neightbours.push([i - di, j - dj]);
    }
    return neightbours;
}

function minimax(board, depth, isMax, signs, fullRow, signsNum, alpha = -1000, beta = 1000) {
    let score = null;
    const boardCopy = null;
    let moves = [];
    let move = {};
    let best = 0;
    let newBoard = null;

    if (!isMovesLeft(board, signsNum) || depth >= 6) return 0;

    if (isMax) {
        best = -Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++){
                //setTimeout(() => null, 500);
                if (board[i][j] == null){
                    newBoard = board;
                    if (placeOnBoard(board, i, j, signs[0], fullRow)){
                        return 10 / (depth + 1);
                    }
                    best = Math.max(
                        best,
                        minimax(board, depth + 1, !isMax, signs, fullRow, signsNum + 1, alpha, beta)
                    );
                    removeFromBoard(board, i, j);
                    alpha = Math.max(alpha, best);
                    if (beta <= alpha)
                        break
                }
            }
            if (beta <= alpha)
                break
        }
        if (score) return score;
        return best;
    } else {
        best = Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++){
                if (board[i][j] == null){
                    newBoard = board;
                    if (placeOnBoard(board, i, j, signs[1], fullRow)){
                        return -10 / (depth + 1);
                    }
                    best = Math.min(
                        best,
                        minimax(board, depth + 1, !isMax, signs, fullRow, signsNum + 1, alpha, beta)
                    );
                    removeFromBoard(board, i, j);
                    beta = Math.min(beta, best);
                    if (beta <= alpha)
                        break
                }
            }
            if (beta <= alpha)
                break
        }
        if (score) return score;
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
    let bestVal = -1000;
    let moveVal;
    let newBoard = null;
    let bestMove = [0, 0];
    const signs = [..._signs];
    let checkCellQueue = new Set();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++){
            if (board[i][j] != null) {
                getNeighbours(board, i, j).forEach((pair) => checkCellQueue.add(JSON.stringify(pair)));
            }
        }
    }
    console.log("Cell queue : ", checkCellQueue);
    for (let cell of checkCellQueue) {
        const [i, j] = JSON.parse(cell);
        newBoard = copyBoard(board);
        console.log("trying to place sign on ", i, j);
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
    /*
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++){
            newBoard = copyBoard(board);
            if (board[i][j] == null) {
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
        }
    }
    */
    console.log("Best value is ", bestVal, "for", ...bestMove);
    if (bestVal == -1000){
        do {
            bestMove = [Math.floor(Math.random() * board.length), Math.floor(Math.random() * board.length)];
        } while (board[bestMove[0]][bestMove[1]]);
    }
    return bestMove;
}