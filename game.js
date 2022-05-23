function $(str) {
    return document.querySelector(str);
}

let player = "X";

let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

const winningCombination = [
    [
        [0, 0],
        [0, 1],
        [0, 2],
    ],
    [
        [1, 0],
        [1, 1],
        [1, 2],
    ],
    [
        [2, 0],
        [2, 1],
        [2, 2],
    ],
    [
        [0, 0],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 1],
        [1, 1],
        [2, 1],
    ],
    [
        [0, 2],
        [1, 2],
        [2, 2],
    ],
    [
        [0, 0],
        [1, 1],
        [2, 2],
    ],
    [
        [0, 2],
        [1, 1],
        [2, 0],
    ],
];

function checkForWin(e) {
    for (let i = 0; i < winningCombination.length; i++) {
        const win = winningCombination[i];
        let count = 0;
        for (let j = 0; j < win.length; j++) {
            const r = win[j][0];
            const c = win[j][1];
            if (board[r][c] && board[r][c] === player) {
                count++;
            }
        }
        if (count > 2) {
            return true;
        }
    }
    return false;
}

function checkForDraw() {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j]) {
                count++;
            }
        }
    }
    return count === 9;
}

let disable = false;

function showRestart() {
    disable = true;
    $("#start").style.display = "block";
    $("#start").textContent = "Restart Game";
}

function handleClick(e) {
    if (disable) {
        return;
    }
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    if (board[row][col]) {
        return;
    }
    board[row][col] = player;
    if (checkForWin()) {
        $("#current").textContent = "Player " + player + " won!";
        showRestart();
    } else if (checkForDraw()) {
        $("#current").textContent = "Match Draw!";
        showRestart();
    }
    player = player === "X" ? "O" : "X";
    renderGame();
}

function renderGame() {
    const container = $(".board");
    if (!disable) {
        $("#current").textContent = "Player " + player + " turn!";
    }
    container.innerHTML = "";
    board.forEach((r, ri) => {
        const row = document.createElement("div");
        row.classList.add("row");
        r.forEach((c, ci) => {
            const place = document.createElement("div");
            place.classList.add("place");
            place.dataset.row = ri;
            place.dataset.col = ci;
            place.innerText = c;
            place.addEventListener("click", handleClick);
            row.appendChild(place);
        });
        container.appendChild(row);
    });
}

function startGame() {
    disable = false;
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    player = "X";
    renderGame();
}

$("#start").addEventListener("click", (e) => {
    $("#start").style.display = "none";
    startGame();
});
