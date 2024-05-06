/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/

function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X'; 
    winner = false;
    tie = false; 
    render();
}

window.onload = init;

function updateBoard() {
    board.forEach((value, index) => {
        const squareEl = squareEls[index];
        squareEl.textContent = value;
    });
}

function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn`;
    } else if (tie) {
        messageEl.textContent = "It's a tie!";
    } else {
        messageEl.textContent = `${winner} wins!`;
    }
}


function render() {
    
    updateBoard();

    
    updateMessage();
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(event) {
    const squareIndex = parseInt(event.target.id);
    if (board[squareIndex] === '' && !winner && !tie) {
        placePiece(squareIndex);
        checkForWinner();
        checkForTie();
        turn = turn === 'X' ? 'O' : 'X';
        render();
    }
}


function placePiece(index) {
    board[index] = turn;
}

function checkForWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a]; 
            return; 
        }
    }
}

function checkForTie() {
    if (winner) {
        return;
    }
    if (!board.includes('')) {
        tie = true; 
    }
}

function switchPlayerTurn() {
    
    if (winner) {
        return;
    }
    turn = turn === 'X' ? 'O' : 'X';
}

function switchPlayerTurn() {
    if (winner) {
        return;
    }
    turn = turn === 'X' ? 'O' : 'X';
    render();
}




/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);


