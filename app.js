function main() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let imageSize = 100;
    let foundCards = 0; // Check card pairs
    let flippedCards = []; // Counting flipped cards
    let arr = []; // Used as basket (view model)
    let click = false;
    let gameIsWon = false;
    let hasRestartButton = false;
    let timeBarProgress = true;

    window.addEventListener( "click", onCanvasClick );

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
         if(hasRestartButton == true){
             let x = getCursorPosition(e)[0];
             let y = getCursorPosition(e)[1];
             if(x >= canvas.width / 2 - 95 && x <= canvas.width / 2 + 105
                 && y >= 400 && y <= 460){

                 location.reload();
             }
         } else if (click == true) {
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

            playFlipCardSound();

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
                    click = false;
                    setTimeout( () => flipBack( firstImage, secondImage ), 500);
                }
                flippedCards = [];
            }
        }
    }

    function flipBack( firstImage,secondImage ) {

        ctx.drawImage(firstImage.img[1], firstImage.startPointX, firstImage.startPointY);
        ctx.drawImage(secondImage.img[1], secondImage.startPointX, secondImage.startPointY);
        firstImage.isFlipped = false;
        secondImage.isFlipped = false;
        click = true;
    }

    function playFlipCardSound() {
        arr[7].flipCardAudio.pause();
        arr[7].flipCardAudio.currentTime = 0;
        arr[7].flipCardAudio.play();
    }

    function playLostAudio() {
        arr[7].backgroundAudio.pause();
        arr[7].audioLost.play();
        arr[7].backgroundAudio.currentTime = 0;
    }

    function playBackgroundMusic() {
        arr[7].backgroundAudio.volume = 0.5;
        arr[7].backgroundAudio.play();
        arr[7].audioLost.pause();
        arr[7].audioLost.currentTime = 0;
        arr[7].audioWin.pause();
        arr[7].audioWin.currentTime = 0;
    }

    function loadImages() {
        let imgArr = ['nakov', 'rakia', 'royal', 'salata', 'pornhub', 'beer', 'simeon',
            'televizor', 'ViktorKazakov', 'ViktorKostadinov', 'nakov', 'rakia', 'royal', 'salata',
            'pornhub', 'beer', 'simeon', 'televizor', 'ViktorKazakov', 'ViktorKostadinov'];

        // Load images for cards
        for (let col = 0; col < 5; col++) {
            arr[col] = [];
            for (let row = 0; row < 4; row++) {

                let startX = 10 + col * imageSize;
                let startY = 10 + row * imageSize;

                let rngIndex = Math.floor((Math.random() * imgArr.length - 1) + 1);

                let front = new Image();
                let back = new Image();
                let frontImgName = `${imgArr[rngIndex]}`;
                // Gets the image id from directory via relative path
                front.src = `./images/90x90/${frontImgName}_90x90.jpg`;
                back.src = `./images/90x90/SoftUni_90x90.jpg`;
                imgArr.splice(rngIndex, 1); // Shrinks the array to get correct img

                arr[col][row] = {
                        name: frontImgName,
                        img:[front, back],
                        isFlipped: false,
                        startPointX : startX,
                        startPointY : startY,
                        borderStartX: startX-5,
                        borderStartY: startY-5

                };
            }
        }

        // Load winning images
        let winArrImages = [ `Win`, `Win_RoYal` ];
        arr[5] = [];
        for (var i = 0; i < winArrImages.length; i++) {
            let winImg = new Image();
            winImg.src = `./images/win/${winArrImages[i]}.png`;
            arr[5].push(winImg)
        }

        // Load losing image
        let gameOverImage = new Image();
        gameOverImage.src = './images/gameOver.jpg';
        arr.push(gameOverImage)
    }

    function loadAudio() {

        arr[7] = { backgroundAudio: document.getElementById("backgroundMusic"),
                    audioWin: document.getElementById("gameWon"),
                    audioLost: document.getElementById("gameLost"),
                    flipCardAudio: document.getElementById("cardFlip") };
    }

    function drawCards() {
        // Gets only images for the cards
        let cardImgArr = arr.slice(0,5);
        // Draws images back for setting the game without winning image
        cardImgArr.forEach( row => row.forEach(obj => ctx.drawImage(obj.img[1], obj.startPointX, obj.startPointY)));

        // TODO: Remove consoles at the end
        console.log(cardImgArr); // For debugging purposes. Must be removed at some point
        console.log(arr); // For debugging purposes. Must be removed at some point
    }

    function timeLine() {

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineCap="round";
        ctx.moveTo(30,450);
        ctx.lineTo(480,450);
        ctx.lineWidth = 25;
        ctx.stroke();


        let timer = setInterval(line, 60);

        let progress = 0;

        function line() {
            let x = 0;
            timeBarProgress?x=0.2:x=0.00;
            let pr = progress * x; // Time bar's speed
            if(pr >= 350){
                ctx.fillStyle = 'red';
                ctx.font = '15pt italic';
                ctx.fillText('You are running out of time!', 260,430);

            }
            ctx.beginPath();
            timeBarProgress?ctx.strokeStyle = 'red':ctx.strokeStyle = 'white';//Changed

            ctx.lineCap="round";
            ctx.moveTo(30 + pr,450);
            ctx.lineTo(30 + pr + 15,450);
            ctx.lineWidth = 20;
            ctx.stroke();

            ctx.fillStyle = 'white';
            ctx.font = '10pt italic';
            ctx.fillText('Your time', 30,450);

            progress++;
            if(pr >= 415){
                click = false
            }
            if(pr >= 435){
                clearInterval(timer);
                click = false;
                gameLost();
            }
            if(gameIsWon == true){
                clearInterval(timer);
                click = false;
                gameWon(timer);
            }
        }
    }

    function restartButton() {

        let x = 80;
        ctx.strokeStyle = 'white';
        ctx.lineCap = 'round';
        ctx.lineWidth = 50;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - x,430);
        ctx.lineTo(canvas.width / 2 + x,430);
        ctx.stroke();
        ctx.strokeStyle = 'red';
        ctx.lineCap = 'round';

        ctx.lineWidth = 40;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 80,430);
        ctx.lineTo(canvas.width / 2 + 80,430);
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.font = "23px italic";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("Restart Game", canvas.width / 2,430);
        gameIsWon = false;
    }

    function gameWon(timer) {
        timeBarProgress = false;
        click = false;
        hasRestartButton = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameIsWon = true;
        clearInterval(timer);

        let rngWinIndex = Math.floor(Math.random() * 2);
        ctx.drawImage( arr[5][1], 10, 10, 500, 380 );
        arr[7].backgroundAudio.pause();

        function playWinAudio() {
            arr[7].audioWin.play();
            arr[7].backgroundAudio.currentTime = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage( arr[5][rngWinIndex], 10, 10, 500, 380 );
            restartButton();
        }

        setTimeout( playWinAudio, 10 );
    }

    function gameLost() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hasRestartButton = true;
        click = false;

        setTimeout( playLostAudio, 500 );

        let gameOverImage = arr[6];
        ctx.drawImage(gameOverImage, 0,0);

        let pos = +600;
        function animateWordsLost() {
            pos -= 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(gameOverImage, 0,0);
            restartButton();
            ctx.font = '40pt sans';
            ctx.fillStyle = 'white';
            ctx.fillText("Чупихме телевизора", pos, 200);
        }

        setInterval( animateWordsLost, 10);
    }

    function setGame() {

        loadImages();
        loadAudio();
        setTimeout( drawCards, 300 );
        setTimeout( timeLine, 300 );
        setTimeout( playBackgroundMusic, 500 );
        hasRestartButton = false;
        gameIsWon = false;
        click = true;
    }

    setGame();
}

main();