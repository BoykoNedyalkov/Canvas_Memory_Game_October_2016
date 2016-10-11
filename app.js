
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let imageSize = 90;

// function cls() { // TODO: For what is this func
//     ctx.clearRect(0, 0, 800, 600);
// }

canvas.addEventListener("click", onCanvasClick);

function onCanvasClick(e) {
    let row = Math.floor((getCursorPosition(e)[1]-20)/imageSize);
    let col = Math.floor((getCursorPosition(e)[0]-20)/imageSize);
    alert(row+ "," +col);
    return[row,col];
}

function getCursorPosition(e) {
    let x;
    let y;
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

// function res() { // TODO: for what is this func
//     ctx.fillStyle = 'white';
//     ctx.strokeStyle = ' black';
//     ctx.lineWidth = 1;
//     ctx.lineCap = 'butt';
// }

// function loadingBar() {
//         TODO: Implement the loading bar and score bar
//         let ctx = document.getElementById("canvas").getContext("2d");
//         let al = 0; //amount loaded
//         let start = 4.72; //start point of the circle - perfect north
//         let cw = ctx.canvas.width;
//         let ch = ctx.canvas.height;
//         let diff; //difference of the percentage
//         function progressSim() {
//             diff = ((al / 100) * Math.PI *2*10).toFixed(2);//process loading
//             ctx.clearRect(0,0,cw,ch); // clears canvas trough animation
//             ctx.lineWidth = 10;
//             ctx.fillStyle = '#09F';
//             ctx.strokeStyle = '#09F';
//             ctx.textAlign = 'center';
//             ctx.fillText(al + '%', cw / 2, ch / 2, cw);//Text position and visualization(text,x pos,y pos,max width)
//             ctx.beginPath();
//             ctx.arc(cw / 2,ch / 2,30,start,diff /10 + start, false); //position and parameters of the circle
//             ctx.stroke();
//             if(al >= 100){
//                 clearTimeout(sim);//stop animation
//             }
//             al++;
//         }
//         let sim = setInterval(progressSim, 50);
//     }
//     function displayScoreAndTime() {
//         let ctx = document.getElementById("canvas").getContext("2d");
//         ctx.moveTo()
//
//     }
//     function reset() {
//         // TODO: Reset the board after win/lose
//     }
// function grid() {
//     TODO: It is not needed for the moment
//     ctx.save();
//
//     ctx.strokeStyle = 'grey';
//     ctx.lineWidth = 0.25;
//     for (let row = 0; row < 60; row++) {
//         if (row % 5 == 0) ctx.lineWidth = 0.5;
//         if (row % 10 == 0) ctx.lineWidth = 1;
//         ctx.beginPath();
//         ctx.moveTo(0, row * 10);
//         ctx.lineTo(800, row * 10);
//         ctx.stroke();
//         if (row % 5 == 0) ctx.lineWidth = 0.25;
//     }
//     for (let col = 0; col < 80; col++) {
//         if (col % 5 == 0) ctx.lineWidth = 0.5;
//         if (col % 10 == 0) ctx.lineWidth = 1;
//         ctx.beginPath();
//         ctx.moveTo(col * 10, 0);
//         ctx.lineTo(col * 10, 600);
//         ctx.stroke();
//         if (col % 5 == 0) ctx.lineWidth = 0.25;
//     }
//
//     ctx.restore();
// }
function drawCards(){
    // let iterator = 0; // TODO: What is the purpose for this
    // let arr = []; // TODO: For what do we need object

    let imgArr =['nakov', 'rakia', 'royal', 'salata', 'SoftUni', 'SoftUni', 'simeon', 'televizor', 'ViktorKazakov',
        'ViktorKostadinov', 'nakov', 'rakia', 'royal', 'salata', 'SoftUni', 'SoftUni', 'simeon', 'televizor',
        'ViktorKazakov', 'ViktorKostadinov'];

    for (let col = 0; col < 5 ; col++) {
        // arr[col] = [];
        for (let row = 0; row < 4 ; row++) {

            let startX= 20+col*imageSize;
            let startY= 20+row*imageSize;

            let randomNum = Math.floor((Math.random() * imgArr.length-1) + 1);

            let img = new Image();
            // Gets the image id from directory via relative path
            img.src = `./images/90x90/${imgArr[randomNum]}_90x90.jpg`;
            imgArr.splice(imgArr.indexOf(imgArr[randomNum]),1); // Shrinks the array to get correct img

            // arr[col][row] = {
            //         img:img,
            //         id: iterator, // TODO: What is the purpose for this
            //         isFlipped: false,
            //         startPointX : startX,
            //         startPointY : startY
            // };
            
            ctx.beginPath();
            ctx.drawImage(img,startX,startY); // Draws image
        }
    }
    // console.log(arr); // For debugging purposes. Must be removed at some point
}
drawCards();