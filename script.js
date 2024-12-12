// let playerState = 'idle';
// const dropdown = document.getElementById('animations')
// dropdown.addEventListener('change', function(e){
//     playerState = e.target.value;
// });

// const canvas = document.getElementById('canvas1');
// const ctx = canvas.getContext('2d');

// const CANVAS_WIDTH = canvas.width = 600;
// const CANVAS_HEIGHT = canvas.height = 600;

// const playerImage = new Image();
// playerImage.src = 'shadow_dog.png';


// const spriteWidth = 575;
// const spriteHeight = 523;

// let gameFrame = 0;
// const staggerFrames = 5;
// const spriteAnimations = [];
// const animationStates = [
//     {
//         name: 'idle',
//         frames: 7,
//     },
//     {
//         name: 'jump',
//         frames: 7,
//     },
//     {
//         name: 'fall',
//         frames: 7,
//     },
//     {
//         name: 'run',
//         frames: 9,
//     },
//     {
//         name: 'stun',
//         frames: 11,
//     },
//     {
//         name: 'sit',
//         frames: 5,
//     },
//     {
//         name: 'roll',
//         frames: 7,
//     },
//     {
//         name: 'bite',
//         frames: 7,
//     },
//     {
//         name: 'ko',
//         frames: 12,
//     },
//     {
//         name: 'getHit',
//         frames: 4,
//     }
// ];

// animationStates.forEach((state, index) => {
//     let frames = {
//         loc: [],

//     }
//     for (let j = 0; j < state.frames; j++){
//         let positionX = j * spriteWidth;
//         let positionY = index * spriteHeight;
//         frames.loc.push({x: positionX, y: positionY});
//     }
//     spriteAnimations[state.name] = frames;
// });

// function animate(){
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//     let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
//     let frameX = spriteWidth * position;
//     let frameY = spriteAnimations[playerState].loc[position].y;

//     //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
//     ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

//     gameFrame ++;
//     requestAnimationFrame(animate);
// }

// animate();


const canvas2 = document.getElementById('canvas2')
const ctx2 = canvas2.getContext('2d');
const CANVAS2_WIDTH = canvas2.width = 800
const CANVAS2_HEIGHT= canvas2.height = 700

let gameSpeed = 5;
let gameFrame2 = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png'
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png'
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png'
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png'
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png'

window.addEventListener('load', function(){
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed
    slider.addEventListener('change', function(e){
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed
    });

    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.x2 = this.width;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
    
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= - this.width){
                this.x = 0;
            }
            this.x = this.x - this.speed;
        }
    
        draw() {
            ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx2.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    
    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);
    
    gameObjects = [layer1, layer2, layer3, layer4, layer5]
    
    function animate2(){
        ctx2.clearRect(0, 0, CANVAS2_WIDTH, CANVAS2_HEIGHT);
        gameObjects.forEach(object => {
            object.update();
            object.draw();
        });
        gameFrame2--;
        requestAnimationFrame(animate2);
    };
    animate2();
});