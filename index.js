'use strict';

const N = 3;
const BOARD = [];
let turn = 'O';

const checkWinner = () => {
    let result;
    for (let i = 0; i < N; i++) {
        const row = BOARD[i];
        const result = row.every(item => item === turn);
        if (result) return true;
    }

    for (let j = 0; j < N; j++) {
        result = true;
        for (let i = 0; i < N; i++) {
            if (BOARD[i][j] !== turn) {
                result = false;
                break;
            } 
        }
        if (result) return true;
    }

    result = true;
    for (let i = 0; i < N; i++) {
        if (BOARD[i][i] !== turn) {
            result = false;
            break;
        }
    }
    if (result === true) return true;

    result = true;
    for (let i = 0; i < N; i++) {
        if (BOARD[i][N - i - 1] !== turn) {
            result = false;
            break;
        }
    }
    if (result === true) return true;

    return false;
}

const handleClick = (row, col) => {

    console.log("clicked", row, col, BOARD);
    BOARD[row][col] = turn;
    render();
    const result = checkWinner();
    console.log("AK: RESULT:", result)

    turn = turn === 'O' ? 'X' : 'O';

}

const render = () => {
    const elem = document.getElementById('js-board');
 
    let boardHtml = '';
    for (let i = 0; i < N; i++) {
        boardHtml += `<div class='row'>`;
        for (let j = 0; j < N; j++) {
            const cell = BOARD[i][j];
            // console.log("cell", cell)
            const onClickHtml = cell === '' ? `onClick='handleClick(${i}, ${j})` : '';
            boardHtml += `<div class='cell' ${onClickHtml}'>${cell}</div>`;           
        }
        boardHtml += `</div>`;
    }
    elem.innerHTML = boardHtml;
}

const main = () => {
    for (let i = 0; i < N; i++) {
        BOARD.push(new Array(N).fill(''));
    }
    render();
}

main();




