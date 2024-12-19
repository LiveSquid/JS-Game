const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;
ctx.font = '50px Impact';

let ravens = [];

class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.speed = Math.random() * 4 + 1;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 4 + 1.3;
        this.directionY = Math.random() * 5 - 1.5;
        this.willDelete = false;
        this.image = new Image();
        this.image.src = 'raven.png';
        this.frame = 0
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.3;
        this.curve = Math.random() * 4 - 2;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }
    update(deltatime) {
        this.x -= this.directionX;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.curve = this.curve * -1;
        }
        if (this.x < 0 -this.width) this.willDelete = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 50, 75);

}

window.addEventListener('click', function(e) {
    const detectPixelColour = collisionCtx.getImageData(e.x, e.y, 1, 1);
    
});
function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function(a, b){
            return  a.width - b.width;
        });
    }
    drawScore();
    [...ravens].forEach(object => object.update(deltatime));
    [...ravens].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.willDelete);
    requestAnimationFrame(animate);
}
animate(0);