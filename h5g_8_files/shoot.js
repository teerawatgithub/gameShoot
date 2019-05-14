var jetNum = 5;

function createJet() {
    for (i = 0; i < jetNum; i++) {
        jet[i] = new Jet();
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
        newY = Math.random() * this.cHeight;
        while (newY >= 550) {
            newY = Math.random() * this.cHeight;
        }
        this.setPosition(newX, newY);
    }

    tjet.bomber = function () {
        var x = setInterval(function () {
            var ran = parseInt(Math.random() * 100);
            console.log(ran);
            if (ran >= 15 && ran <= 50) {
                tBom = new Sprite(scene, "F01L.png", 50, 50)
                tBom.setSpeed(10);
                tBom.setMoveAngle(180);
                // tBom.setBoundAction(DIE);
                tBom.setPosition(this.x, this.y);
                clearInterval(x);
            }
        }, 1000);
    }

    tjet.reset();
    tjet.bomber();

    return tjet;
}

function Thank() {
    tthank = new Sprite(scene, "thank.png", 100, 100);
    tthank.setPosition(900, 890);
    tthank.imagAngle = 90;
    tthank.setSpeed(0);

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
        this.setSpeed(100);
        this.setBoundAction(DIE);
        this.setImage("missile.png");
    }

    return tmissile;
}

function startGame() {

    // var timer = 60;
    var btnStart = document.getElementById("btn");
    var scoreUI = document.getElementById('score');
    // timeBoard = document.getElementById("time");

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
