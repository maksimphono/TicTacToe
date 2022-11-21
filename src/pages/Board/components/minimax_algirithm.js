export default function findBestMove(board, placeOnBoard, winCallback){
    return [Math.floor(Math.random() * board.length), Math.floor(Math.random() * board.length)]
}