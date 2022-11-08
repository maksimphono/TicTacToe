const [SIZE, FULL_ROW] = [4, 4];

export class SignNode {
    static get directionsGroups() { return [ [0, 1, '|'], [1, 0, '-'], [1, 1, 'dr'], [-1, 1, 'dl'] ]};
    
    constructor (mat, x, y, sign) {
        this.groups = {'-' : null, '|' : null, 'dr' : null, 'dl' : null};
        this.sign = sign;
        mat[x][y] = this;
        this.placeOnBoard(mat, x, y);
    }
    placeOnBoard = function (mat, x, y){
        let pivotCell = null;
        let oppositeCell = null;

        console.log("Place ", this.sign, x, y);
        for (let [dx, dy, gr] of SignNode.directionsGroups){
            this.groups[gr] = [1];
            console.log("Check on ", dx, dy);
            
            if (!mat[x + dx] || !mat[x + dx][y + dy] || mat[x + dx][y + dy].sign !== this.sign)
                [dx, dy] = [-dx, -dy]; 
            pivotCell = mat[x + dx] && mat[x + dx][y + dy];
            oppositeCell = mat[x - dx] && mat[x - dx][y - dy];
            
            if (pivotCell && pivotCell.sign === this.sign){
                console.log("Got neighbour on ", x + dx, y + dy, gr);
                if (oppositeCell && this.sign === oppositeCell.sign){
                    pivotCell.groups[gr][0] += oppositeCell.groups[gr][0];
                    oppositeCell.groups[gr] = pivotCell.groups[gr];
                }
                pivotCell.groups[gr][0]++;
                this.groups[gr] = pivotCell.groups[gr];
                console.log("This Group set up to ", this.groups[gr][0]);
                if (this.groups[gr][0] >= FULL_ROW){
                    return true;
                }
            }
        }
        return false;
    }
}
/*
const mat = [
    [],
    [],
    [],
    []
]
let [dx, dy] = [0, 0]
let node1 = new SignNode(mat, 1, 2, "X");
new SignNode(mat, 1, 3, "X");
new SignNode(mat, 1, 1, "X");
new SignNode(mat, 2, 2, "X");
new SignNode(mat, 0, 0, "X");
new SignNode(mat, 3, 2, "X");
new SignNode(mat, 3, 3, "X");
new SignNode(mat, 3, 1, "X");
*/