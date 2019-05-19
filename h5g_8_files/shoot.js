function createJet() {
    for (i = 0; i < jetNum; i++) {
        jet[i] = new Jet();
        bom[i] = new Bom(i);
        bom[i].startBomber(i);
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

    tjet.reset = function() {
        newX = Math.random() * this.cWidth;
        newY = Math.random() * this.cHeight;
        while (newY >= 550) {
            newY = Math.random() * this.cHeight;
        }
        this.setPosition(newX, newY);
    }

    // tjet.die = function() {
    //     // this.setPosition(0, 1080);
    //     // this.hide();
    //     newX = Math.random() * this.cWidth;
    //     newY = Math.random() * this.cHeight;
    //     while (newY >= 550) {
    //         newY = Math.random() * this.cHeight;
    //     }
    //     this.setPosition(newX, newY);
    //     this.setSpeed(0);
    // }

    tjet.reset();

    return tjet;
}

function Bom(i) {
    tbom = new Sprite(scene, "bom.png", 30, 60)
    tbom.hide();

    tbom.startBomber = function(index) {
        var ran = parseInt(Math.random() * 100);
        if (ran >= 99 && ran <= 100 && !this.visible) {
            this.visible = true;
            this.setSpeed(10);
            this.setMoveAngle(180);
            this.setBoundAction(DIE);
            this.setPosition(jet[index].x, jet[index].y);
        }
    }

    return tbom;
}

function Thank() {
    tthank = new Sprite(scene, "thank.png", 100, 100);
    tthank.setPosition(900, 890);
    tthank.imagAngle = 90;
    tthank.setSpeed(0);
    tthank.maxSpeed = 10;
    tthank.minSpeed = -10;

    tthank.checkKeys = function() {
        if (keysDown[K_LEFT]) {
            this.turnBy(-5);
        }
        if (keysDown[K_RIGHT]) {
            this.turnBy(5);
        }
        if (keysDown[K_SPACE]) {
            missile.fire();
        }
        // if (keysDown[K_UP]) {
        //     this.changeSpeedBy(1);
        //     if (this.speed > this.maxSpeed)
        //         this.setSpeed(this.maxSpeed);
        // }
        // if (keysDown[K_DOWN]) {
        //     this.changeSpeedBy(-1);
        //     if (this.speed < this.minSpeed)
        //         this.setSpeed(this.minSpeed);
        // }
    }

    tthank.checkScore = function() {

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

    tmissile.fire = function() {
        this.show();
        this.setPosition(thank.x, thank.y);
        this.setAngle(thank.getImgAngle() - 90);
        this.setSpeed(50);
        this.setBoundAction(DIE);
        this.setImage("missile.png");
    }

    tmissile.reset = function() {
        this.setPosition(thank.x, thank.y);
        this.setSpeed(0);
        this.hide();
    }


    return tmissile;
}

function checkCollision(index) {
    thankHPUI = document.getElementById("hp");
    tjetNum = document.getElementById("bot");
    tscore = document.getElementById("score");
    btnStart = document.getElementById("btn");
    if (missile.collidesWith(jet[index])) {
        //hide every thing
        missile.reset();
        bomSound.play();
        jet.splice(index, 1);
        bom.splice(index, 1);

        //stopBom
        // checkBomDIE = index;
        //update value
        score += 100;
        jetNum--;

        //update ui
        tjetNum.innerHTML = `${jetNum}`;
        tscore.innerHTML = `${score}`;

        //Next level
        if (jetNum == 0) {
            level += 5;
            jetNum = level;
            btnStart.removeAttribute('disabled');
            alert("Next level");
            firstStart = false;
            return true;
        }
    }
    if (thank.collidesWith(bom[index])) {
        thankHP--;
        if (thankHP == 0) {
            thankHPUI.innerHTML = `${thankHP}`;
            jet.splice(0, level);
            bom.splice(0, level);
            level = 5;
            jetNum = level;
            thankHP = 3;
            btnStart.removeAttribute('disabled');
            alert("Game Over");
            alert("Your score are " + score + "!!");
            thankHPUI.innerHTML = `${thankHP}`;
            firstStart = false;
            return true;
        } else {
            bom[index].hide();
            thankHPUI.innerHTML = `${thankHP}`;
        }
    }
    return false;
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

    init(firstStart);

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