//Get a random integer between range of [min & max]
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//generate a tetromino sequence
//tetromino = shapes of blocks in tetris
function generateSequence() {
    const sequence = ['C', 'S', 'I', 'E', 'L', 'O', 'T', 'Z']

    while (sequence.length) {
        const rand = getrandomInt(0, sequence.length -1);
        const name = sequence.splice(rand, 1)[0];
        tetrominoSequence.push(name);
    }
}

//New tetromino sequence
function getNextTetromino() {
    if (tetrominoSequence.length === 0) {
        generateSequence();
    }

    const name = tetrominoSequence.pop();
    const matrix = tetrominos[name];


//shape of I and O start in the center-middle, other shapes start in left-middle
const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

//I starts on row 21(-1), other start on row 22(-2)
const row = name === 'I' ? -1 : -2;

return {
    name: name,         //name of the Shape/Piece
    matrix: matrix,     //Shape Rotation
    row: row,           //Row of shape (starts offscreen)
    col: col,           //Collumn   
    };
}

//Rotate a block matrix 90degrees
function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));

    return result;
}

//check if the the new matrix/row/col is true
function isTrueMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (
                //outside game bounds
                cellCol + col < 0 ||
                cellCol + col >= playfield[0].length ||
                cellRow + row >= playfield.length ||
                //If collides with other piece
                playfield[cellRow + row][cellCol + col])) {
                    return false;
            }
        }
    }   

    return true;
}

//place the tetromino blocks on the canvas
function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {

                //GameOver
                if (tetromino.row + row < 0) {
                    return showGameOver();
                }
                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }

    //check for line clears from the most bottom until up
    for (let row = playfield.length - 1; row >= 0;) {
        if (playfield[row].every(cell => !!cell)) {

            //drop every row above this one
            for (let r = row; r >= 0; r--) {
                for (let c = 0; c < playfield[r].length; c++) {
                    playfield[r][c] = playfield[r-1][c];
                }
            }
        }
        else {
            row--;
        }
    }

    tetromino = getNextTetromino();
}

//Game Over screen
function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;

    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
}

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 32;
const tetrominoSequence = [];