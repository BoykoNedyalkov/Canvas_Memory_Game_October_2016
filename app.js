
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cardSize = 90;
let nakov = document.getElementById('nakov');
let simeon = document.getElementById('simeon');
let rakia = document.getElementById('rakia');
let royal = document.getElementById('royal');
let salata = document.getElementById('salata');
let softUni = document.getElementById('softUni');
let softUni1 = document.getElementById('softUni1');
let softUni2 = document.getElementById('softUni2');
let televizor = document.getElementById('televizor');
let kazakov = document.getElementById('kazakov');
let kostadinov = document.getElementById('kostadinov');
let imgArr =['nakov', 'rakia', 'royal', 'salata', 'softUni', 'softUni1', 'simeon', 'televizor', 'kazakov', 'kostadinov',
    'nakov', 'rakia', 'royal', 'salata', 'softUni', 'softUni1', 'simeon', 'televizor', 'kazakov', 'kostadinov'];

function cls() {
    ctx.clearRect(0, 0, 800, 600);
}
canvas.addEventListener("click", onCanvasClick, false);

function onCanvasClick(e) {
    let row = Math.ceil((getCursorPosition(e)[1]-20)/cardSize-1);
    let col = Math.ceil((getCursorPosition(e)[0]-20)/cardSize-1);
    alert(row+ "," +col);
    return[row,col];
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
function loadingBar() {
        let ctx = document.getElementById("canvas").getContext("2d");
        let al = 0; //amount loaded
        let start = 4.72; //start point of the circle - perfect north
        let cw = ctx.canvas.width;
        let ch = ctx.canvas.height;
        let diff; //difference of the percentage
        function progressSim() {
            diff = ((al / 100) * Math.PI *2*10).toFixed(2);//process loading
            ctx.clearRect(0,0,cw,ch); // clears canvas trough animation
            ctx.lineWidth = 10;
            ctx.fillStyle = '#09F';
            ctx.strokeStyle = '#09F';
            ctx.textAlign = 'center';
            ctx.fillText(al + '%', cw / 2, ch / 2, cw);//Text position and visualization(text,x pos,y pos,max width)
            ctx.beginPath();
            ctx.arc(cw / 2,ch / 2,30,start,diff /10 + start, false); //position and parameters of the circle
            ctx.stroke();
            if(al >= 100){
                clearTimeout(sim);//stop animation
            }
            al++;
        }
        let sim = setInterval(progressSim, 50);
    }
    function displayScoreAndTime() {
        let ctx = document.getElementById("canvas").getContext("2d");
        ctx.moveTo()

    }
    function reset() {
        
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
function drawCards(){
    let iterator = 0;
    let arr = [];
    for (let i = 0; i <5 ; i++) {
        arr[i] = [];
        for (let j = 0; j <4 ; j++) {

            let firstX= 20+i*cardSize;
             let firstY= 20+j*cardSize;
            let random = Math.floor((Math.random() * imgArr.length-1) + 1);
            let img = imgArr[random];
            console.log(img);
            imgArr.splice(imgArr.indexOf(img),1);
            arr[i][j] = {
                    img:img,
                    id: iterator,
                    isFlipped:false,
                    startPointX : firstX,
                    startPointY : firstY,
                    endPointX : firstX +90,
                    endPointY: firstY+90
            };
            
            
            let s = 0;
            ctx.beginPath();
            switch (arr[i][j].img){
                case 'nakov':ctx.drawImage(nakov,arr[i][j].startPointX,arr[i][j].startPointY); break;
                case 'rakia':ctx.drawImage(rakia,arr[i][j].startPointX,arr[i][j].startPointY); break;
                case 'royal':ctx.drawImage(royal,arr[i][j].startPointX,arr[i][j].startPointY); break;
                case 'salata':ctx.drawImage(salata,arr[i][j].startPointX,arr[i][j].startPointY); break;
                case 'simeon':ctx.drawImage(simeon,arr[i][j].startPointX,arr[i][j].startPointY); break;
                case 'softUni':ctx.drawImage(softUni,arr[i][j].startPointX,arr[i][j].startPointY); break;
                case 'softUni1':ctx.drawImage(softUni1,arr[i][j].startPointX,arr[i][j].startPointY); break;
                case 'softUni2':ctx.drawImage(softUni2,arr[i][j].startPointX,arr[i][j].startPointY); break;
                case 'televizor':ctx.drawImage(televizor,arr[i][j].startPointX,arr[i][j].startPointY); break;
                case 'kazakov':ctx.drawImage(kazakov,arr[i][j].startPointX,arr[i][j].startPointY); break;
                case 'kostadinov':ctx.drawImage(kostadinov,arr[i][j].startPointX,arr[i][j].startPointY); break;
                default:break;
            }
        }
    }
    console.log(arr);
}
drawCards();