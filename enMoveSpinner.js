/** @type {HTMLCanvasElement} */
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');

CANVAS3_WIDTH = canvas3.width = 450;
CANVAS3_HEIGHT = canvas3.height = 900;

const numberOfEnemies = 10;
const eneimiesArray = [];

let gameFrame3 = 0;

class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = 'enemy4.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas3.width - this.width);
        this.y = Math.random() * (canvas3.height - this.height);
        this.newX =  Math.random() * (canvas3.width - this.width);
        this.newY = Math.random() * (canvas3.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 60);
    }
    update() {
        if (gameFrame3 % this.interval === 0) {
            this.newX = Math.random() * (canvas3.width - this.width);
            this.newY = Math.random() * (canvas3.height - this.height);
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/20;
        this.y -= dy/20;
    
        if (this.x + this.width < 0) this.x = canvas3.width;
        if (gameFrame3 % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx3.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numberOfEnemies; i++) {
    eneimiesArray.push(new Enemy());
}

function animate3() {
    ctx3.clearRect(0, 0, CANVAS3_WIDTH, CANVAS3_HEIGHT);
    eneimiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame3++;
    requestAnimationFrame(animate3);
}
animate3();