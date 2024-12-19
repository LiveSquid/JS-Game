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
let gameOver = false;
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
        this.curve = Math.random() * 3 + 2;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
        this.hasTrail = (Math.random() * 3) > 1.8;
    }
    update(deltatime) {
        if (score > 25) {
            this.x -= this.directionX + 5;
        }
        else this.x -= this.directionX;
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
            this.timeSinceFlap = 0
            if (this.hasTrail){
                for (let i = 0; i < 5; i++) {
                    particles.push(new Particle(this.x, this.y, this.width, this.color));
                }
            }
        }
        if (this.x < 0 - this.width) gameOver = true;
    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

let explosions = [];

class Explosion {
    constructor(x, y, size) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = x;
        this.y = y;
        this.size = size;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.timer = 0;
        this.frameInterval = 80;
        this.sound = new Audio();
        this.sound.src = 'boom.wav';
        this.willDelete = false;
    }
    update(deltatime) {
        if (this.frame === 0) this.sound.play();
        this.timer += deltatime;
        if (this.timer > this.frameInterval) {
            this.frame++;
            this.timer = 0;
            if (this.frame > 5) this.willDelete = true;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size/5, this.size, this.size);
    }
}

let particles = [];
class Particle {
    constructor(x, y, size, color){
        this.size = size;
        this.x = x + this.size * 0.5;
        this.y = y + this.size/3;
        this.radius = Math.random() * this.size/10;
        this.maxradius = Math.random() * 20 + 35;
        this.willDelete = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color
    }
    update() {
        this.x += this.speedX;
        this.radius += 0.3;
        if (this.radius > this.maxradius - 5) this.willDelete = true;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = 1 - this.radius/this.maxradius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 50, 75);
}
function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER, your score is: ' + score, canvas.width/2, canvas.height/2);
}

window.addEventListener('click', function(e) {
    const detectPixelColour = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColour.data;
    ravens.forEach(object => {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
            object.willDelete = true;
            if (object.hasTrail) {
                score += 2;
            }
            else score++;
            explosions.push(new Explosion(object.x, object.y, object.width));
        };
    });
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
    [...particles, ...ravens, ...explosions].forEach(object => object.update(deltatime));
    [...particles, ...ravens, ...explosions].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.willDelete);
    explosions = explosions.filter(object => !object.willDelete);
    particles = particles.filter(object => !object.willDelete);
    if (!gameOver) requestAnimationFrame(animate);
    else drawGameOver();
}
animate(0);