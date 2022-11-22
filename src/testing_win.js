export default function placeOnBoard(board, x, y, sign, fullRow){
    const directionsGroups = [ [0, 1, '|'], [1, 0, '-'], [1, 1, 'dr'], [-1, 1, 'dl'] ];
    let pivotCell = null;
    let oppositeCell = null;
    const newSign = {
            groups : {'-' : null, '|' : null, 'dr' : null, 'dl' : null},
            sign : sign
        }
    board[x][y] = newSign;

    for (let [dx, dy, gr] of directionsGroups){
        newSign.groups[gr] = [1];
        if (!board[x + dx] || !board[x + dx][y + dy] || board[x + dx][y + dy].sign !== newSign.sign)
            [dx, dy] = [-dx, -dy];
        pivotCell = board[x + dx] && board[x + dx][y + dy];
        oppositeCell = board[x - dx] && board[x - dx][y - dy];
    
        if (pivotCell && pivotCell.sign === newSign.sign){
            if (oppositeCell && newSign.sign === oppositeCell.sign){
                pivotCell.groups[gr][0] += oppositeCell.groups[gr][0];
                oppositeCell.groups[gr] = pivotCell.groups[gr];
            }
            try {
                pivotCell.groups[gr][0]++;
                newSign.groups[gr] = pivotCell.groups[gr];
                //console.log("newSign Group set up to ", newSign.groups[gr][0]);
                if (newSign.groups[gr][0] >= fullRow){
                    return true;
                }
            } catch (TypeError){
                console.log("type err");
            }
            
        }
    }
    return false;
}
export function removeFromBoard(board, x, y){
    for (let gr in board[x][y].groups){
        board[x][y].groups[gr] && board[x][y].groups[gr][0]--;
    }
    
    board[x][y] = null;
}