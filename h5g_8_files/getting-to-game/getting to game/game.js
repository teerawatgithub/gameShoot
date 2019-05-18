//Checkcollision
// function Checkcollision(){

// }

//calss fly
var score = 0;
var IsPlaying;
var ranHead;



function Fly() {
    var scoreUI = document.getElementById('score');
    var type = Math.floor(Math.random() * (6 - 1)) + 1;
    // alert(type);
    if (type == 1) {
        tFly = new Sprite(scene, "tri.png", 30, 30, type);
    }
    if (type == 2) {
        tFly = new Sprite(scene, "sq.png", 30, 30, type);
    }
    if (type == 3) {
        tFly = new Sprite(scene, "cy.png", 30, 30, type);
    }
    if (type == 4) {
        tFly = new Sprite(scene, "six.png", 30, 30, type);
    }
    if (type == 5) {
        tFly = new Sprite(scene, "fiv.png", 30, 30, type);
    }
    tFly.setSpeed(7);


    //make moving of fly
    tFly.wriggle = function() {
        // newDir = (Math.random() * 90) - 45;
        // this.changeAngleBy(newDir);
        this.setAngle(180);
    }

    tFly.reset = function() {
        newX = Math.random() * this.cWidth;
        // newY = Math.random() * this.cHeight;
        newY = Math.floor(Math.random() * (20 - 10)) * 4;


        this.setPosition(newX, newY);

    }

    tFly.changeThis = function() {
        var t = Math.floor(Math.random() * (6 - 1)) + 1;
        if (t == 1) {
            tFly.type = t;
            tFly.image.src = "tri.png";
        }
        if (t == 2) {
            tFly.type = t;
            tFly.image.src = "sq.png";
        }
        if (t == 3) {
            tFly.type = t;
            tFly.image.src = "cy.png";
        }
        if (t == 4) {
            tFly.type = t;
            tFly.image.src = "six.png";
        }
        if (t == 5) {
            tFly.type = t;
            tFly.image.src = "fiv.png";
        }
    }


    tFly.checkScore = function() {
        // alert(ranHead + " " + this.type);
        if (ranHead == this.type) {
            score += 100;
            scoreUI.innerHTML = `${score}`;
        } else {
            score -= 5;
            scoreUI.innerHTML = `${score}`;
        }
    }

    tFly.reset();

    return tFly;
}

//class frog
function Frog() {
    frog = new Sprite(scene, "red.png", 50, 50);
    frog.setAngle(0);
    frog.setSpeed(0);
    frog.maxSpeed = 15;
    frog.minSpeed = -5;
    frog.setAngle(90);
    frog.setPosition(310, 390);


    frog.moveKeys = function() {

        //controll sprite
        if (keysDown[K_LEFT]) {
            // frog.changeAngleBy(-5);
            frog.setMoveAngle(270);
            frog.changeSpeedBy(2);
            if (this.speed > this.maxSpeed) {
                this.setSpeed(this.maxSpeed);
            }
        } else if (keysDown[K_RIGHT]) {
            // frog.changeAngleBy(5);
            frog.setMoveAngle(90);
            frog.changeSpeedBy(2);
            if (this.speed > this.maxSpeed) {
                this.setSpeed(this.maxSpeed);
            }
        } else {
            frog.setSpeed(0);
        }
        // if (keysDown[K_UP]) {
        //     frog.changeSpeedBy(1);
        //     if (this.speed > this.maxSpeed) {
        //         this.setSpeed(this.maxSpeed);
        //     }
        // }
        // if (keysDown[K_DOWN]) {
        //     frog.changeSpeedBy(-1);
        //     if (this.speed < this.minSpeed) {
        //         this.setSpeed(this.minSpeed);
        //     }
        // }
    }

    return frog;
}

function startGame() {

    var timer = 5;
    var btnStart = document.getElementById("btn");
    var scoreUI = document.getElementById('score');
    timeBoard = document.getElementById("time");

    score = 0;
    IsPlaying = true;
    scoreUI.innerHTML = `${score}`;


    btnStart.disabled = "disabled"
    ranHeadJa(1, 6);

    init();

    var x = setInterval(function() {
        timer -= 1;
        if (timer % 10 == 0)
            ranHeadJa(1, 6);
        if (timer == 0) {
            clearInterval(x);
            alert("Time out your score is " + score);
            IsPlaying = false;
        }
        timeBoard.innerHTML = timer;
    }, 1000);
}

function ranHeadJa(min, max) {
    var head = document.getElementById('head');
    ranHead = Math.floor(Math.random() * (max - min)) + min;
    if (ranHead == 1) {
        head.innerHTML = "Keeps Triangle!";
    } else if (ranHead == 2) {
        head.innerHTML = "Keeps Square!";
    } else if (ranHead == 3) {
        head.innerHTML = "Keeps Cycle!";
    } else if (ranHead == 4) {
        head.innerHTML = "Keeps Hexagon!";
    } else if (ranHead == 5) {
        head.innerHTML = "Keeps Pentagon!";
    }
}

// function setType (min, max) {
//     var ranFly;
//     ranFly = Math.floor(Math.random() * (max - min)) + min;
//     if(ranFly == 1){
//         type = 1;
//     }else{
//         type = 2;
//     }
// }