const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');

canvas4.width = 500;
canvas4.height = 700;

const explosions = [];
let canvasPosition = canvas4.getBoundingClientRect();

class Explosions {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
    }
    update() {
        this.frame++;

    }
    draw() {
        ctx4.draw(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

window.addEventListener('click', function(e){
    ctx4.fillStyle = 'white';
    ctx4.fillRect(e.x - canvasPosition.left, e.y, 50, 50);
});
