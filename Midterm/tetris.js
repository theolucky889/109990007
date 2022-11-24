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
        const rand = getRandomInt(0, sequence.length - 1);
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
    col: col,           //Column   
    };
}

//Rotate a block matrix 90degrees
function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));

    return result;
}

//check if the the new matrix/row/col is true
function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (
                //outside game bounds
                cellCol + col < 0 ||
                cellCol + col >= playfield[0].length ||
                cellRow + row >= 6 ||
                //If collides with other piece
                playfield[cellRow + 7][cellCol + col])
                    //test
                    //|| cellRow + row >= 7
                    ) {
                    return false;
            }
        }
    }   

    return true;
}

//place the tetromino blocks on the canvas
function placeTetromino() {
    for (let row = 5; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {
                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }

    //check for line clears from the most bottom until up
    for (let row = playfield.length - 5; row >= 0;) {
        if (playfield[row].every(cell => !!cell)) {

            //drop every row above this one
            for (let r = row; r => 5; r--) {
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


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 32;
const tetrominoSequence = [];

//keeps track of what is in canvas(10x20 with few row is offscreen) using 2d array
const playfield = [];

//populate empty space
for (let row = -1; row < 20; row++) {
    playfield[row] = [];

    for (let col = 0; col < 10; col++) {
        playfield[row][col] = 0;
    }
}


//draw the Tetromino Shapes
// source = https://tetris.fandom.com/wiki/SRS
const tetrominos = {
    'C': [
        [1,1,1],
        [1,0,0],
        [1,1,1]
      ] ,
    'S': [
        [1,1,1,0,0],
        [1,0,0,0,0],
        [1,1,1,0,0],
        [0,0,1,0,0],
        [1,1,1,0,0]
      ],
    'I': [
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]
    ],
    'E': [
        [1,1,1,0,0],
        [1,0,0,0,0],
        [1,1,1,0,0],
        [1,0,0,0,0],
        [1,1,1,0,0]
    ],
    'J': [
      [1,0,0],
      [1,1,1],
      [0,0,0],
    ],
    'L': [
      [0,0,1],
      [1,1,1],
      [0,0,0],
    ],
    'O': [
      [1,1],
      [1,1],
    ],
    'Z': [
      [1,1,0],
      [0,1,1],
      [0,0,0],
    ],
    'T': [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ]
  };

  //colors of each tetromino
  const colors = {
    'C': 'red',
    'S': 'green',
    'I': 'blue',
    'E': 'purple',
    'J': 'yellow',
    'L': 'cyan',
    'Z': 'orange',
    'T': 'brown',
    'O': 'pink',
  };

  let count = 0;
  let tetromino = getNextTetromino();
  let rAF = null; //keep track of animation frame
  let gameOver = false;

  //game loop
  function loop() {
    rAF = requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);

    //Playfield
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (playfield[row][col]) {
                const name = playfield[row][col];
                context.fillStyle = colors[name];
        
                //Grid Effect
                context.fillRect(col * grid, row * grid, grid-1, grid-1);
            }
        }
    }

    //draw active tetromino
    if (tetromino) {

        //fall every 35 frame
        if (++count > 35) {
            tetromino.row++;
            count = 0;
            

      // new piece after 5 frames
      if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
        tetromino.row--;
        placeTetromino();
      }
    }

        context.fillStyle = colors[tetromino.name];
        
        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {

                    //Grid Effect
                context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
                }
            }
        } 
    }
  }


  
  //Keyboard Movement
  document.addEventListener('keydown', function(e) {
    if (gameOver) return;
  
    // left and right arrow keys (move)
    if (e.which === 37 || e.which === 39) {
      const col = e.which === 37
        ? tetromino.col - 1
        : tetromino.col + 1;
  
      if (isValidMove(tetromino.matrix, tetromino.row, col)) {
        tetromino.col = col;
      }
    }
  
    // up arrow key (rotate)
    if (e.which === 38) {
      const matrix = rotate(tetromino.matrix);
      if (isValidMove(matrix, tetromino.row, tetromino.col)) {
        tetromino.matrix = matrix;
      }
    }
  
    // down arrow key (drop)
    if(e.which === 40) {
      const row = tetromino.row + 1;
  
      if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
        tetromino.row = row - 1;
  
        placeTetromino();
        return;
      }
  
      tetromino.row = row;
    }
  });

  //Gamepad Movement
  //move right
 function moveRight() {
    const col = tetromino.col + 1;
    tetromino.col + 1;

    if (isValidMove(tetromino.matrix, tetromino.row, col)) {
        tetromino.col = col;   
    }
 }

 //move left
 function moveLeft() {
    const col = tetromino.col - 1;
    tetromino.col - 1;

    if(isValidMove(tetromino.matrix, tetromino.row, col)) {
        tetromino.col = col;
    }
 }

 //move down
 function moveDown() {
    const row = tetromino.row + 1;
  
      if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
        tetromino.row = row - 1;
  
        placeTetromino();
        return;
      }
  
      tetromino.row = row;
 }

 //Rotate
 function rotateTetromino() {
    const matrix = rotate(tetromino.matrix);
    if (isValidMove(matrix, tetromino.row, tetromino.col)) {
      tetromino.matrix = matrix;
    }
 }
 
 //Restart
function restartGame() {
    window.location.reload();
}

  //start the game
  function startGame() {
  rAF = requestAnimationFrame(loop);
  }

  //Pause
function gamePause() {
    cancelAnimationFrame(rAF);
}

// Mouse Click
window.addEventListener('mousedown', function(e) {
    row = e.pageX;
    col = e.pageY;
})

window.addEventListener('mouseup', function(e) {
    row = false;
    col = false;
})

