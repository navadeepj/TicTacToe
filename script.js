const grid = document.getElementById("grid");

const status = document.getElementById("status");

const resetBtn = document.getElementById("resetBtn");

const cardO = document.getElementById("cardO");

const cardX = document.getElementById("cardX");

let board = Array(9).fill("");

let current = "O";

let gameOver = false;

let winningLine = [];

const wins = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

function updatePlayer(){

    cardO.classList.toggle("active",current==="O");

    cardX.classList.toggle("active",current==="X");

}

function render() {

    grid.innerHTML = "";

    board.forEach((value, index) => {

        const cell = document.createElement("div");

        cell.classList.add("cell");

        if (value) {
            cell.classList.add(value.toLowerCase());
        }

        if (winningLine && winningLine.includes(index)) {
            cell.classList.add("win");
        }

        cell.textContent = value;

        cell.addEventListener("click", () => move(index));

        grid.appendChild(cell);

    });

    updatePlayer();
}

function move(index){

    if(gameOver || board[index]!="") return;

    board[index]=current;

    winningLine=checkWinner(current);

    if(winningLine){

        gameOver=true;

        status.textContent=`Player ${current} Wins!`;

        render();

        return;

    }

    if(board.every(cell=>cell!="")){

        gameOver=true;

        status.textContent="Match Draw";

        render();

        return;

    }

    current=current==="O"?"X":"O";

    status.textContent=`Player ${current}'s Turn`;

    render();

}

function checkWinner(player){

    for(let line of wins){

        if(line.every(index=>board[index]===player)){

            return line;

        }

    }

    return null;

}

resetBtn.addEventListener("click",()=>{

    board=Array(9).fill("");

    current="O";

    gameOver=false;

    winningLine=[];

    status.textContent="Player O's Turn";

    render();

});

render();