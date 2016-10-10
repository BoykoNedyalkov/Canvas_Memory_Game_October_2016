let cardValues = [];

let cardSize = 100;
let nakov = document.getElementById('nakov');
let rakia = document.getElementById('rakia');
let royal = document.getElementById('royal');
let salata = document.getElementById('salata');
let softUni = document.getElementById('softUni');
let softUni1 = document.getElementById('softUni1');
let softUni2 = document.getElementById('softUni2');
let televizor = document.getElementById('televizor');
let kazakov = document.getElementById('kazakov');
let kostadinov = document.getElementById('kostadinov');

 let imgArr =['nakov', 'rakia', 'royal', 'salata', 'softUni', 'softUni1', 'softUni2', 'televizor', 'kazakov', 'kostadinov',
     'nakov', 'rakia', 'royal', 'salata', 'softUni', 'softUni1', 'softUni2', 'televizor', 'kazakov', 'kostadinov']



function cls() {
    ctx.clearRect(0, 0, 800, 600);
}
canvas.addEventListener("click", onCanvasClick, false);

function onCanvasClick(e) {
    alert(getCursorPosition(e));
}

function getCursorPosition(e) {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    return [x,y];
}

function res() {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = ' black';
    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';
}

function grid() {
    ctx.save();

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 0.25;
    for (let row = 0; row < 60; row++) {
        if (row % 5 == 0) ctx.lineWidth = 0.5;
        if (row % 10 == 0) ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, row * 10);
        ctx.lineTo(800, row * 10);
        ctx.stroke();
        if (row % 5 == 0) ctx.lineWidth = 0.25;
    }
    for (let col = 0; col < 80; col++) {
        if (col % 5 == 0) ctx.lineWidth = 0.5;
        if (col % 10 == 0) ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(col * 10, 0);
        ctx.lineTo(col * 10, 600);
        ctx.stroke();
        if (col % 5 == 0) ctx.lineWidth = 0.25;
    }

    ctx.restore();
}
for (var f = 1; f <= 20; f++) {
    let variable = Number(f);
    cardValues.push(variable);
    cardValues.push(variable);

}
function drawCards(){
    for (let i = 0; i <5 ; i++) {
        for (let j = 0; j <4 ; j++) {
            let s = 0;
            let startPointX = 20+i*cardSize;
            let startPointY = 20+j*cardSize;
            ctx.beginPath();
            ctx.moveTo(startPointX,startPointY)
            ctx.lineTo(startPointX+cardSize,startPointY)
            ctx.lineTo(startPointX+cardSize,startPointY + cardSize);
            ctx.lineTo(startPointX,startPointY + cardSize);
            ctx.lineTo(startPointX,startPointY);
            ctx.stroke();

        }

    }
}