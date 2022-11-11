var redGamePiece, blueGamePiece, yellowGamePiece;

function startGame() {
    redGamePiece = new component(75, 75, "red", 10, 10);
    yellowGamePiece = new component(75, 75, "yellow", 50, 60);    
    blueGamePiece = new component(75, 75, "blue", 10, 150);
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
        window.addEventListener('mousedown', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
        window.addEventListener('mouseup', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
        window.addEventListener('touchstart', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })
        window.addEventListener('touchend', function (e) {
            myGameArea.x = false;
            myGameArea.y = false;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX
        this.y += this.speedY
    }
    this.clicked = function() {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var clicked = true;
        if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
            clicked = false;
        }
        return clicked;
    }

}

var red = false;

function updateGameArea() {
    myGameArea.clear();
    //if (myGameArea.x && myGameArea.y) {
        //redGamePiece.x = myGameArea.x;
        //blueGamePiece.x = myGameArea.x;
        //yellowGamePiece.x = myGameArea.x;
        //blueGamePiece.y = myGameArea.y;   
        //yellowGamePiece.y = myGameArea.y;      
   // }
    redGamePiece.newPos();
    yellowGamePiece.newPos();        
    blueGamePiece.newPos();
    redGamePiece.update();
    yellowGamePiece.update();        
    blueGamePiece.update();

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
}

    if (myGameArea.x && myGameArea.y) {
        if (redGamePiece.clicked()) {
            red = true;
        }
if (red)
redGamePiece.x += 1;

        if (blueGamePiece.clicked()) {
            blueGamePiece.y += 1;
        }
        if (yellowGamePiece.clicked()) {
            yellowGamePiece.x += -1;
        }
    }

//if (myGameArea.key && myGameArea.key == 36) {redGamePiece.speedX = -1; }
//if (myGameArea.key && myGameArea.key == 37) {blueGamePiece.speedX = -1; }
//if (myGameArea.key && myGameArea.key == 39) {yellowGamePiece.speedX = 1; }
//if (myGameArea.key && myGameArea.key == 38) {yellowGamePiece.speedY = -1; }
//if (myGameArea.key && myGameArea.key == 40) {yellowGamePiece.speedY = 1; }
function startCube() {
    redGamePiece.speedX = 1; 
    yellowGamePiece.speedX = 1;
    yellowGamePiece.speedY = 1;
    blueGamePiece.speedX = 1;
    blueGamePiece.speedY = 1;
}

function stopmove() {
    redGamePiece.speedX = 0; 
    yellowGamePiece.speedX = 0;
    yellowGamePiece.speedY = 0;
    blueGamePiece.speedX = 0;
    blueGamePiece.speedY = 0;
}

function reset() {
    myGameArea.clear()
    redGamePiece = new component(75, 75, "red", 10, 10);
    yellowGamePiece = new component(75, 75, "yellow", 50, 60);    
    blueGamePiece = new component(75, 75, "blue", 10, 150);
}