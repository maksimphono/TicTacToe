const [size, fullRow, currSign] = [4, 4, "X"];

class SignNode {
    static get directionsGroups() { return [ [0, 1, '|'], [1, 0, '-'], [1, 1, 'dr'], [-1, 1, 'dl'] ]};
    
    constructor () {
        this.sign = '';
        this.groups = {'-' : null, '|' : null, 'dr' : null, 'dl' : null};
    }
    opposite = (mat, dx, dy) => (mat[-x] && mat[-x][-y]);

    setUp = function (mat, x, y, sign){
        this.sign = sign;
        this.placeOnBoard(mat, x, y);
    }
    win = function (){
        console.log(`${this.sign} Won!!`);
    }
    placeOnBoard = function (mat, x, y){
        let pivotCell = null;
        let oppositeCell = null;
        let xy = [];
        console.log("Place ", this.sign, x, y);
        for (let [dx, dy, gr] of SignNode.directionsGroups){
            this.groups[gr] = [1];
            console.log("Check on ", dx, dy);
            
            if (!mat[x + dx] || !mat[x + dx][y + dy] || mat[x + dx][y + dy].sign !== this.sign)
                [dx, dy] = [-dx, -dy]; 
            pivotCell = mat[x + dx] && mat[x + dx][y + dy] || undefined;
            oppositeCell = mat[x - dx] && mat[x - dx][y - dy] || undefined;
            
            if (pivotCell && pivotCell.sign === this.sign){
                console.log("Got neighbour on ", x + dx, y + dy, gr);
                if (oppositeCell && this.sign === oppositeCell.sign){
                    pivotCell.groups[gr][0] += oppositeCell.groups[gr][0];
                    oppositeCell.groups[gr] = pivotCell.groups[gr];
                }
                pivotCell.groups[gr][0]++;
                this.groups[gr] = pivotCell.groups[gr];
                console.log("This Group set up to ", this.groups[gr][0]);
                if (this.groups[gr][0] >= fullRow){
                    this.win();
                }
            }
        }
    }
}

const mat = [
    [new SignNode(), new SignNode(), new SignNode(), new SignNode()], 
    [new SignNode(), new SignNode(), new SignNode(), new SignNode()], 
    [new SignNode(), new SignNode(), new SignNode(), new SignNode()],
    [new SignNode(), new SignNode(), new SignNode(), new SignNode()]
]
let [dx, dy] = [0, 0]
mat[1 + dx][1 + dy].setUp(mat, 1 + dx, 1 + dy, "X");
//console.log(mat[1][1].groups);
mat[1][2].setUp(mat, 1, 2, "X");
mat[1][3].setUp(mat, 1, 3, "X");
mat[2][2].setUp(mat, 2, 2, "X");
mat[0][2].setUp(mat, 0, 2, "X");


mat[0][3].setUp(mat, 0, 3, "X");
mat[3][0].setUp(mat, 3, 0, "X");
mat[2][1].setUp(mat, 2, 1, "X");