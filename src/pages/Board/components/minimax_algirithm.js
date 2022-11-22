import placeOnBoard from "../../../testing_win";
import {removeFromBoard} from "../../../testing_win";

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

function minimax(board, depth, isMax, signs, fullRow, signsNum, alpha = -1000, beta = 1000) {
    let score = null;
    const boardCopy = null;
    let moves = [];
    let move = {};
    let best = 0;
    let newBoard = null;

    if (!isMovesLeft(board, signsNum) || depth >= 5) return 0;

    if (isMax) {
        best = -1000;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++){
                newBoard = copyBoard(board);
                if (board[i][j] == null){
                    if (placeOnBoard(newBoard, i, j, signs[0], fullRow)){
                        return 10 / (depth + 1);
                    }
                    
                    best = Math.max(
                        best,
                        minimax(newBoard, depth + 1, !isMax, signs, fullRow, signsNum + 1, alpha, beta)
                    );
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
        best = 1000;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++){
                newBoard = copyBoard(board);
                if (board[i][j] == null){
                    if (placeOnBoard(newBoard, i, j, signs[1], fullRow)) {
                        return -10 / (depth + 1);
                    }
                    
                    best = Math.min(
                        best,
                        minimax(newBoard, depth + 1, !isMax, signs, fullRow, signsNum + 1, alpha, beta)
                    );
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

export default function findBestMove(board, placeOnBoard, winCallback, _signs, signsNum, fullRow){
    /*
    placeOnBoard(newB, 1, 1, _signs[0], fullRow);
    console.table(newB);
    console.table(board);
    return [Math.floor(Math.random() * board.length), Math.floor(Math.random() * board.length)];
    */
    let bestVal = -1000;
    let moveVal;
    let newBoard = null;
    let bestMove = [-1, -1];
    const signs = [..._signs];

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
    console.log("Best value is ", bestVal, "for", ...bestMove);
    return bestMove;
}