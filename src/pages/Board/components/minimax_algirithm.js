import placeOnBoard from "../../../testing_win";
import {removeFromBoard} from "../../../testing_win";

function isMovesLeft(board, signsNum) {
    return signsNum === (board.length ** 2);
}

function minimax(board, depth, isMax, signs, fullRow, signsNum) {
    let score = 0;
    let best = 0;

    if (!isMovesLeft(board, signsNum) || depth >= 7) return 0;

    if (isMax) {
        best = -1000;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++){
                if (!board[i][j]){
                    if (placeOnBoard(board, i, j, signs[0], fullRow)){
                        return 10;
                    }
                    
                    best = Math.max(
                        best,
                        minimax(board, depth + 1, !isMax, signs, fullRow, signsNum)
                    );
                    
                    removeFromBoard(board, i, j);
                }
            }
        }
        return best;
    } else {
        best = 1000;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++){
                if (board[i][j] == null){
                    if (placeOnBoard(board, i, j, signs[1], fullRow)) {
                        return -10;
                    }
                    
                    best = Math.min(
                        best,
                        minimax(board, depth + 1, !isMax, signs, fullRow, signsNum)
                    );
                    
                    removeFromBoard(board, i, j);
                }
            }
        }
        return best;
    }
}

export default function findBestMove(board, placeOnBoard, winCallback, _signs, signsNum, fullRow){
    //return [Math.floor(Math.random() * board.length), Math.floor(Math.random() * board.length)];
    let bestVal = -1000;
    let moveVal;
    let bestMove = [-1, -1];
    const signs = [..._signs];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++){
            if (board[i][j] == null) {
                placeOnBoard(board, i, j, signs[0], fullRow);

                moveVal = minimax(board, 0, true, signs, fullRow, signsNum);

                removeFromBoard(board, i, j);

                if (moveVal > bestVal){
                    bestMove = [i, j];
                    bestVal = moveVal;
                }
            }
        }
    }
    return bestMove;
}