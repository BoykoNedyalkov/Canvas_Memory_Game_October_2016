function main() {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let imageSize = 90;
    let foundCards = 0;
    let flippedCards = [];
    let arr = [];
    let click = true;

// function cls() { // TODO: For what is this func
//     ctx.clearRect(0, 0, 800, 600);
// }

    window.addEventListener("click", onCanvasClick);

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

        return [x, y];
    }

    function onCanvasClick(e) {
        if(click){
        let row = Math.floor((getCursorPosition(e)[1] - 20) / imageSize);
        let col = Math.floor((getCursorPosition(e)[0] - 20) / imageSize);

        // To not throw exception in console if it is not within the array with images
        if (!(row >= 0 && row < 4 && col >= 0 && col < 5)){
            return
        }

        flipCards( col, row );
        }
    }

    function flipCards( col, row ) {

        let obj = arr[col][row];
        if (obj.isFlipped == false) {

            obj.isFlipped = true;
            flippedCards.push(obj);
            ctx.drawImage(obj.img[0], obj.startPointX, obj.startPointY);

            if (flippedCards.length == 2) {
                let firstImage = flippedCards[0];
                let secondImage = flippedCards[1];

                if (firstImage.name == secondImage.name) {
                    foundCards += 2;

                    if (foundCards == 20){
                        foundCards = 0;
                        setTimeout( () => gameWon(), 500);
                    }
                }
                else {
                    setTimeout( () => flipBack( firstImage, secondImage ), 1000);
                }
                flippedCards = [];
            }
        }
    }

    function flipBack(firstImage,secondImage) {

            ctx.drawImage(firstImage.img[1], firstImage.startPointX, firstImage.startPointY);
            ctx.drawImage(secondImage.img[1], secondImage.startPointX, secondImage.startPointY);
            firstImage.isFlipped = false;
            secondImage.isFlipped = false;
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

     function timeLine() {//In progress

         //let ctx = document.getElementById("canvas").getContext("2d");
         ctx.beginPath();
         ctx.strokeStyle = 'grey';
         ctx.lineCap="round";
         ctx.moveTo(30,400);
         ctx.lineTo(460,400);
         ctx.lineWidth = 25;
         ctx.stroke();



         let timer = setInterval(line, 20);
         let progress = 0;

         function line() {
             let pr = progress * 0.2;

             if(pr >= 360){
                 ctx.fillStyle = 'red';
                 ctx.font = '15pt italic';
                 ctx.fillText('You are running out of time!', 150,200);

             }
             ctx.beginPath();
             ctx.strokeStyle = 'skyblue';
             ctx.lineCap="round";
             ctx.moveTo(30 + pr,400);
             ctx.lineTo(30 + pr + 15,400);
             ctx.lineWidth = 20;
             ctx.stroke();

             progress++;
             if(pr >= 415){
                 clearInterval(timer);
                 click = false;
                 gameOver();
             }
             ctx.fillStyle = 'black';
             ctx.font = '10pt italic';
             ctx.fillText('Your time', 30,400);
         }
     }

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

    function loadImages() {
        let imgArr = ['nakov', 'rakia', 'royal', 'salata', 'pornhub', 'beer', 'simeon',
            'televizor', 'ViktorKazakov', 'ViktorKostadinov', 'nakov', 'rakia', 'royal', 'salata',
            'pornhub', 'beer', 'simeon', 'televizor', 'ViktorKazakov', 'ViktorKostadinov'];

        // Load images for cards
        for (let col = 0; col < 5; col++) {
            arr[col] = [];
            for (let row = 0; row < 4; row++) {

                let startX = 20 + col * imageSize;
                let startY = 20 + row * imageSize;

                let rngIndex = Math.floor((Math.random() * imgArr.length - 1) + 1);

                let front = new Image();
                let back = new Image();
                let frontImgName = `${imgArr[rngIndex]}`;
                // Gets the image id from directory via relative path
                front.src = `./images/90x90/${frontImgName}_90x90.jpg`;
                back.src = `./images/90x90/SoftUni_90x90.jpg`;
                // TODO: Check out the properties for the img class if it could be attached styling to them
                imgArr.splice(rngIndex, 1); // Shrinks the array to get correct img

                arr[col][row] = {
                        name: frontImgName,
                        img:[front, back],
                        isFlipped: false,
                        startPointX : startX,
                        startPointY : startY
                };
            }
        }

        // Load winning image
        let winImg = new Image();
        winImg.src = `./images/Win.png`;
        arr.push({ win: winImg });
    }

    function drawCards() {

        loadImages();
        // Draws images back for setting the game without winning image
        arr.forEach(row => arr.indexOf(row) < 5 ?
                    row.forEach(obj => ctx.drawImage(obj.img[1], obj.startPointX, obj.startPointY))
                    : false);

        console.log(arr); // For debugging purposes. Must be removed at some point
    }

    function gameWon() {

        ctx.drawImage( arr[5].win, 20, 20, 450, 360 );
        arr = [];
        // TODO: Make it if the player wants to reset the game
        setTimeout( () => setGame(), 4000 );
    }
    function gameOver() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let gameoverImage = new Image();

        gameoverImage.src = './images/game_over/game_over.png';
        ctx.drawImage(gameoverImage, 0,0);

        let pos = -100;
        let timer = setInterval(animateWords, 10);
        function animateWords() {
            pos += 0.3;
            ctx.font = '40pt sans';
            ctx.fillStyle = 'red';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(gameoverImage, 0,0);
            ctx.fillText("Счупи се телевизора", pos, 200);

        }
    }
    function setGame() {
        // TODO: Make it so that the first start does not have to be refreshed
        window.drawImages = drawCards();
        window.loadingBar = timeLine();
    }

    setGame()
}

setTimeout( main , 100 );