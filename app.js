window.onload = function () {
    setGame();
}
let board = []
let score = 0;
let rows = 4;
let colums = 4;
function setGame() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ]


    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < colums; j++) {
            let tile = document.createElement("div")
            tile.id = i.toString() + "-" + j.toString()
            console.log(tile.id)
            let num = board[i][j]
            updatetile(tile, num)
            document.getElementById("board").append(tile)
        }
    }
    setTwo();
    setTwo();

}
function updatetile(tile, num) {
    tile.innerText = ""; //Removes any number/text inside the tile
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 8192) {
            tile.classList.add("x" + num.toString())

        }
        else {
            tile.classList.add("x16384")
        }
    }
}
document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideleft()
        setTwo()
    }
    else if (e.code == "ArrowRight") {
        slideright()
        setTwo()
    }
    else if(e.code=="ArrowUp"){
        slideUp()
        setTwo()
    }
    else if(e.code=="ArrowDown"){
        slidedown()
        setTwo()
    }
})
function filterzeros(row) {
    return row.filter(num => num != 0)
}
function slide(row) {
    row = filterzeros(row)
    for (i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterzeros(row)
    while (row.length < colums) {
        row.push(0)
    }
    return row;
}
function slideleft() {
    for (let i = 0; i < rows; i++) {
        let row = board[i];
        row = slide(row);
        board[i] = row
        for (let j = 0; j < colums; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = board[i][j]
            updatetile(tile, num)
        }
    }

}

function slideright() {
    for (let i = 0; i < rows; i++) {
        let row = board[i];
        row.reverse()
        row = slide(row)
        row.reverse()
        board[i] = row;
        for (let j = 0; j < colums; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = board[i][j]
            updatetile(tile, num)
        }
    }

}
function slideUp(){
    for(let j=0;j<colums;j++){
        let row=[board[0][j],board[1][j],board[2][j],board[3][j]]
        row=slide(row)
        board[0][j]=row[0]
        board[1][j]=row[1]
        board[2][j]=row[2]
        board[3][j]=row[3]
        for (let i = 0; i < colums; i++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = board[i][j]
            updatetile(tile, num)

        }
    }
}
function slidedown(){
    for(let j=0;j<colums;j++){
        let row=[board[0][j],board[1][j],board[2][j],board[3][j]]
        row.reverse()
        row=slide(row)
        row.reverse()
        for (let i = 0; i < rows; i++) {
            board[i][j] = row[i];
        }

        // board[0][j]=row[0]
        // board[1][j]=row[1]
        // board[2][j]=row[2]
        // board[3][j]=row[3]
        for (let i = 0; i < colums; i++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = board[i][j]
            updatetile(tile, num)

        }
    }
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < colums; c++) {  
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}
function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let i = Math.floor(Math.random() * rows);
        let j = Math.floor(Math.random() * colums); 
        if (board[i][j] == 0) {
            board[i][j] = 2;
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}
