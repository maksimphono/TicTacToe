const mat = [
    [..."____"], 
    [..."____"], 
    [..."____"],
    [..."____"]
]

const [size, fullRow, currSign] = [4, 4, "X"];

class SignNode {
    constructor(x, y, sign){
        [this.x, this.y, this.sign, this.neighbours, this.neighboursNum] = [x, y, sign, {}, 0];
    }
    set newNeighbour(newNode) {
        console.log("Node : ", [this.x, this.y]);
        console.log("Set neightbour on ", [this.x - newNode.x, this.y - newNode.y]);
        this.neighbours[[this.x - newNode.x, this.y - newNode.y]] = newNode;
        this.neighboursNum++;
    };
    get friend(){
        return this.neighbours;
    };
    repl = function (){
        console.table([this.x, this.y]);
    }
}

const chechQueue = [];

const sign11 = new SignNode(1, 1, "X");
const sign21 = new SignNode(2, 1, "X");
const sign31 = new SignNode(3, 1, "X");
const sign32 = new SignNode(3, 2, "X");

sign11.newNeighbour = new SignNode(0, 1, 'X');
sign11.newNeighbour = sign21;
sign21.newNeighbour = sign31;
sign31.newNeighbour = sign32;
sign31.newNeighbour = new SignNode(3, 0, "X");

function checkSide(node, side){
    let length = 0;
    if (node.friend[side] && node.friend[side].sign === node.sign){
        length += 1 + checkSide(node.friend[side], side);
    }
    if (node.neighboursNum > 1){
        checkQueue.push(node);
    }
    //if (length == fullRow) return "Row " + node.sign;
    return length;
}

function checkBySides(node){
    if (!node) return 0;
    let length = 1;
    for (let side in ["1,0", "-1,0", "0,1", "0,-1"]){
        length = 1;
        length += checkSide(node, side);
        length += checkSide(node, side);
        console.log(`Found row ${length}, by side ${side}`);
        if (length == fullRow) return "Row " + node.sign;
    }
    return length;
}


chechQueue = [sign11]
for (let node of checkQueue){
    checkHorizontal(sign);
}
