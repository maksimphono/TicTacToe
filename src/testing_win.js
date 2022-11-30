export default function placeOnBoard(board, x, y, sign, fullRow){
    const directionsGroups = [ [0, 1, '|'], [1, 0, '-'], [1, 1, 'dr'], [-1, 1, 'dl'] ];
    let pivotCell = null;
    let oppositeCell = null;
    let pivotBefore = null;
    let oppositeBefore = null;
    const newSign = {
            groups : {'|' : null, '-' : null, 'dr' : null, 'dl' : null},
            sign : sign
        }
    board[x][y] = newSign;
    try {
    for (let [dx, dy, gr] of directionsGroups){
        newSign.groups[gr] = {0 : 1, pivotBefore : 0, oppositeBefore : 0};
        if (!board[x + dx] || !board[x + dx][y + dy] || board[x + dx][y + dy].sign !== newSign.sign)
            [dx, dy] = [-dx, -dy];
        pivotCell = board[x + dx] && board[x + dx][y + dy];
        oppositeCell = board[x - dx] && board[x - dx][y - dy];
        pivotBefore = 0;
        oppositeBefore = 0;
        
        if (pivotCell?.sign === newSign.sign && pivotCell.groups[gr]) {
            console.log("%c got pivot, set pivotBefore", "color : blue;");
            pivotBefore = pivotCell.groups[gr][0];
            console.log("Group : ", newSign.groups[gr]);
        }
        if (oppositeCell?.sign === newSign.sign && oppositeCell.groups[gr]) {
            oppositeBefore = oppositeCell.groups[gr][0];
        }
        
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
        newSign.groups[gr].pivotBefore = pivotBefore;
        newSign.groups[gr].oppositeBefore = oppositeBefore;
    }
    return false;
    }catch (TypeError) {;}
}
export function removeFromBoard(board, x, y){
    const directionsGroups = [ [0, 1, '|'], [1, 0, '-'], [1, 1, 'dr'], [-1, 1, 'dl'] ];
    let pivotCell = null;
    let oppositeCell = null;
    let self = board[x][y];
    console.log("remove from ", x, y);
    try {
    for (let [dx, dy, gr] of directionsGroups) {
        if (self.groups[gr].pivotBefore && board[x + dx] && board[x + dx][y + dy]) {
            board[x + dx][y + dy].groups[gr] = {0 : self.groups[gr].pivotBefore, pivotBefore : 0, oppositeBefore : 0};
            self.groups[gr].pivotBefore = 0;
            console.log(x + dx, y + dy, "group set to ", board[x + dx][y + dy].groups[gr][0]);
        }
        if (self.groups[gr].oppositeBefore && board[x - dx] && board[x - dx][y - dy]) {
            board[x - dx][y - dy].groups[gr] = {0 : self.groups[gr].oppositeBefore, pivotBefore : 0, oppositeBefore : 0};
            self.groups[gr].oppositeBefore = 0;
            console.log(x - dx, y - dy, "group set to ", board[x - dx][y - dy].groups[gr][0]);
        }
    }
    } catch(TypeError){;}
    delete board[x][y];
    board[x][y] = null;
}