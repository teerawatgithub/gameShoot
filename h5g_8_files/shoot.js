var checkBomDIE = -1;
var thankHP = 3;
var score = 0;
var scoreUI = document.getElementById('score');

var botUI = document.getElementById('bot');



function createJet() {
    for (i = 0; i < jetNum; i++) {
        jet[i] = new Jet();
        bom[i] = new Bom(i);
    }
}

function Jet() {
    way = parseInt(Math.random() * 10 % 2)
    var newX;
    var newY;
    if (way == 1) {
        tjet = new Sprite(scene, "F01R.png", 100, 60);
        tjet.setMoveAngle(90);
        newX = 0;
    } else {
        tjet = new Sprite(scene, "F01L.png", 100, 60);
        tjet.setMoveAngle(270);
        newX = 1920;
    }
    tjet.setSpeed(15);

    tjet.reset = function () {
        newX = Math.random() * this.cWidth;
        newY = Math.random() * this.cHeight;
        while (newY >= 550) {
            newY = Math.random() * this.cHeight;
        }
        this.setPosition(newX, newY);
    }

    tjet.reset();

    return tjet;
}

function Bom(i) {
    tbom = new Sprite(scene, "bom.png", 30, 60)
    tbom.hide();

    tbom.startBomber = function (a) {
        var x = setInterval(function () {
            if (checkBomDIE == a) {
                clearInterval(x);
            }
            var ran = parseInt(Math.random() * 100);
            if (ran >= 90 && ran <= 100) {
                bom[a].show();
                bom[a].setSpeed(10);
                bom[a].setMoveAngle(180);
                bom[a].setBoundAction(DIE);
                bom[a].setPosition(jet[a].x, jet[a].y);
            }
        }, 1000);
    }

    tbom.startBomber(i);

    return tbom;
}

function Thank() {
    tthank = new Sprite(scene, "thank.png", 100, 100);
    tthank.setPosition(900, 890);
    tthank.imagAngle = 90;
    tthank.setSpeed(0);
    tthank.maxSpeed = 10;
    tthank.minSpeed = -10;

    tthank.checkKeys = function () {
        if (keysDown[K_LEFT]) {
            this.turnBy(-5);
        }
        if (keysDown[K_RIGHT]) {
            this.turnBy(5);
        }
        if (keysDown[K_SPACE]) {
            missile.fire();
        }
        if (keysDown[K_UP]) {
            this.changeSpeedBy(1);
            if (this.speed > this.maxSpeed)
                this.setSpeed(this.maxSpeed);
        }
        if (keysDown[K_DOWN]) {
            this.changeSpeedBy(-1);
            if (this.speed < this.minSpeed)
                this.setSpeed(this.minSpeed);
        }
    }

    tthank.checkScore = function () {

    }

    return tthank;
}

function BackGround() {
    tbg = new Sprite(scene, "skyTree.png", 1920, 1080);
    tbg.setSpeed(0);
    tbg.setPosition(950, 360);

    return tbg;
}

function Missile() {
    tmissile = new Sprite(scene, "missile.png", 30, 20);
    tmissile.hide();

    tmissile.fire = function () {
        this.show();
        this.setPosition(thank.x, thank.y);
        this.setAngle(thank.getImgAngle() - 90);
        this.setSpeed(50);
        this.setBoundAction(DIE);
        this.setImage("missile.png");
    }

    tmissile.hidee = function () {
        this.hide();
    }

    return tmissile;
}

function checkCollision(index) {
    tthankHP = document.getElementById("hp");
    tjetNum = document.getElementById("bot");
    tscore = document.getElementById("score");
    if (missile.collidesWith(jet[index])) {
        console.log(index);
        missile.hide();
        bomSound.play();
        jet[index].hide();
        //stopBom
        checkBomDIE = index;
        score += 100;
        jetNum--;
        tjetNum.innerHTML = `${jetNum}`;
        tscore.innerHTML = `${score}`;
        // updateScore();
    }
    if (bom[index].collidesWith(thank)) {
        thankHP--;
        if (thankHP == 0) {
            console.log(thankHP)
            tthankHP.innerHTML = `${thankHP}`;
            bom[index].hide();
            alert("Game Over");
        }
        tthankHP.innerHTML = `${thankHP}`;
        bom[index].hide();


    }
}

function startGame() {

    // var timer = 60;
    // timeBoard = document.getElementById("time");
    var btnStart = document.getElementById("btn");

    // score = 0;
    IsPlaying = true;
    // scoreUI.innerHTML = `${score}`;


    btnStart.disabled = "disabled"
    // ranHeadJa(1, 6);

    init();

    // var x = setInterval(function () {
    //     timer -= 1;
    //     if (timer % 10 == 0)
    //         ranHeadJa(1, 6);
    //     if (timer == 0) {
    //         clearInterval(x);
    //         alert("Time out your score is " + score);
    //         IsPlaying = false;
    //     }
    //     timeBoard.innerHTML = timer;
    // }, 1000);
}
