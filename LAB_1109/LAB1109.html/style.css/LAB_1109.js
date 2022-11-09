var redGamePiece, blueGamePiece, yellowGamePiece;

function startGame() {
    redGamePiece = new component(75, 75, "red", 10, 10);
    yellowGamePiece = new component(75, 75, "yellow", 50, 60);    
    blueGamePiece = new component(75, 75, "blue", 10, 220);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

var change_red_x = 1;
var change_yellow_x = 1;
var change_yellow_y = 1;
var change_blue_x = 1;
var change_blue_y = 1;
function updateGameArea() {
    myGameArea.clear();
        if (redGamePiece.x == 400)
        change_red_x = -1;
        else if (redGamePiece.x == 0)
        change_red_x = 1;

    redGamePiece.x += change_red_x * 1;

    if (yellowGamePiece.x == 400)
        change_yellow_x = -1;
        else if (yellowGamePiece.x == 0)
        change_yellow_x = 1;

    yellowGamePiece.x += change_yellow_x * 1;

    if (yellowGamePiece.y == 200)
    change_yellow_y = -1;
    else if (yellowGamePiece.y == 10)
    change_yellow_y = 1;

yellowGamePiece.y += change_yellow_y * 1;

    if (blueGamePiece.x == 400)
        change_blue_x = -1;
        else if (blueGamePiece.x == 10)
        change_blue_x = 1;

    blueGamePiece.x += change_blue_x * 1;

    if (blueGamePiece.y == 200)
    change_blue_y = 1;
    else if (blueGamePiece.y == 0)
    change_blue_y = -1;

blueGamePiece.y -= change_blue_y * 1;
             
    redGamePiece.update();
    yellowGamePiece.update();        
    blueGamePiece.update();
}
