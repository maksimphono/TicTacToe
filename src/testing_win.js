const [SIZE, FULL_ROW] = [4, 4];

export default function placeOnBoard(board, x, y, sign){
    const directionsGroups = [ [0, 1, '|'], [1, 0, '-'], [1, 1, 'dr'], [-1, 1, 'dl'] ];
    let pivotCell = null;
    let oppositeCell = null;
    const newSign = {
            groups : {'-' : null, '|' : null, 'dr' : null, 'dl' : null},
            sign : sign
        }
    board[x][y] = newSign;

    console.log("Place ", newSign.sign, x, y);
    for (let [dx, dy, gr] of directionsGroups){
        newSign.groups[gr] = [1];
        console.log("Check on ", dx, dy);
        if (!board[x + dx] || !board[x + dx][y + dy] || board[x + dx][y + dy].sign !== newSign.sign)
            [dx, dy] = [-dx, -dy];
        pivotCell = board[x + dx] && board[x + dx][y + dy];
        oppositeCell = board[x - dx] && board[x - dx][y - dy];
    
        if (pivotCell && pivotCell.sign === newSign.sign){
            console.log("Got neighbour on ", x + dx, y + dy, gr);
            if (oppositeCell && newSign.sign === oppositeCell.sign){
                pivotCell.groups[gr][0] += oppositeCell.groups[gr][0];
                oppositeCell.groups[gr] = pivotCell.groups[gr];
            }
            pivotCell.groups[gr][0]++;
            newSign.groups[gr] = pivotCell.groups[gr];
            console.log("newSign Group set up to ", newSign.groups[gr][0]);
            if (newSign.groups[gr][0] >= FULL_ROW){
                return true;
            }
        }
    }
    return false;
}