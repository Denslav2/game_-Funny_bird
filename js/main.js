"use strict"
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "image/bird.png";
bg.src = "image/bg.png";
fg.src = "image/fg.png";
pipeUp.src = "image/pipeUp.png";
pipeBottom.src = "image/pipeBottom.png";

//Sound files
let fly = new Audio();
let score_audio = new Audio();
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3"; 

let gap = 90;

//Press any key
document.addEventListener("keydown", moveUp);
function moveUp() {
    yPos -= 20;
    fly.play();
}

//Bloks
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

//Score
let score = 0;

//Position bird
let xPos = 10;
let yPos = 150;
let grav = 1;

function draw() {
    ctx.drawImage(bg, 0, 0);
    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
        //add new bloks
        if(pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        if(xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height 
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) 
            /*|| yPos + bird.height >= cvs.height - fg.height*/) {
            location.reload();
        }
        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    
    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "35px Roboto";
    ctx.fillText("Очки : " + score, 10, cvs.height -20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;