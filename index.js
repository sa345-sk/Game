const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1026;
canvas.height = 576;

//console.log(canvas);

const gravity = 0.5;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
      this.width = 30,
      this.height = 30
    }

    draw() {
        c.fillStyle = 'pink';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= canvas.height) { this.velocity.y += gravity; }
        else {
            this.velocity.y = 0;
        }
    }
}

class Platform {
    constructor({x, y,}) {
        this.position = {
         x,
         y 
        }

        this.width = 400;
        this.height = 100;
    }


    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const platforms = [new Platform({
    x:0, 
    y:500,
    
}), new Platform({ x: 400, y: 500 }), new Platform({ x: 1100, y: 500 }), new Platform({ x: 1100, y: 400 }), new Platform({ x: 1900, y: 500 }), new Platform({ x: 2500, y: 300 }), new Platform({ x: 3000, y: 300 }), new Platform({ x: 3500, y: 500 })];


const player  = new Player();


const keys = {  
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}


let scrollOffset = 0;

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    platforms.forEach((platform) => {
        platform.draw();
    });
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0;
        } 
    });
    if(keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5;
    } else { 
        player.velocity.x = 0; 
        if (keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach((platform) => {
                platform.position.x -= 5;
            });
        } else if (keys.left.pressed) {
            scrollOffset -= 5;
            platforms.forEach((platform) => {
                platform.position.x += 5;
            });
        }
    }
    player.update();
    if (scrollOffset = 2000) {
    
    }
}

animate();

console.log(scrollOffset)
addEventListener('keydown', ( { key } )=> {
  
    switch (key) {
        case 'd':
            keys.right.pressed = true;
            break;
        case 'a':
            keys.left.pressed = true;
            break;
        case 's':

            break;
        case 'w':
            player.velocity.y -= 20;
            break;                                    
    }

});

addEventListener('keyup', ({ key }) => {

    switch (key) {
        case 'd':
            keys.right.pressed = false;
            break;
        case 'a':
            keys.left.pressed = false;
            break;
        case 's':

            break;
        case 'w':
            player.velocity.y -= 0;
            break;
    }

});
