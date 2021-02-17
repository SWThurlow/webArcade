/*Get arcade div to load everything in.*/
let arcade = document.getElementById('arcade');

/*The Games*/
let games = [{
    title: 'Memory Game',
    thumb: 'imgs\\gameThumbs\\placeHold1.png',
    script: memoryGame,
}, {
    title: 'Snake',
    thumb: 'imgs\\gameThumbs\\placeHold2.png',
    script: snake,
}]

/*Game selection*/
let selected = 0;

function gameSelection() {
    let selectionScreen = document.createElement('div');
    selectionScreen.setAttribute('class', 'selection');
    arcade.appendChild(selectionScreen);

    let gameTitle = document.createElement('h3');
    gameTitle.setAttribute('class', 'title');
    gameTitle.innerHTML = games[selected].title;
    selectionScreen.appendChild(gameTitle);

    let prevBtn = document.createElement('btn');
    prevBtn.setAttribute('class', 'previous');
    prevBtn.innerHTML = 'Previous';
    selectionScreen.appendChild(prevBtn);
    prevBtn.addEventListener('click', () => {
        if (selected === 0) {
            selected = games.length - 1;
        } else {
            selected--
        }
        selectionScreen.remove();
        gameSelection();
    })

    let gameThumb = document.createElement('img');
    gameThumb.setAttribute('class', 'thumb');
    gameThumb.setAttribute('src', games[selected].thumb);
    selectionScreen.appendChild(gameThumb);

    let nextBtn = document.createElement('btn');
    nextBtn.setAttribute('class', 'next');
    nextBtn.innerHTML = 'Next';
    selectionScreen.appendChild(nextBtn);
    nextBtn.addEventListener('click', () => {
        if (selected < games.length - 1) {
            selected++
        } else {
            selected = 0;
        }
        selectionScreen.remove();
        gameSelection();
    })

    let play = document.createElement('btn');
    play.setAttribute('class', 'play');
    play.innerHTML = 'Play';
    selectionScreen.appendChild(play);
    play.addEventListener('click', () => {
        selectionScreen.remove();
        games[selected].script();
    })
}

gameSelection();

/*End of game controls, back home or play again*/
let endOfGame = document.createElement('div');
endOfGame.setAttribute('class', 'endOfGame');

let winMsg = document.createElement('p');
winMsg.setAttribute('class', 'winMsg');
let gameScore = document.createElement('p');
gameScore.setAttribute('class', 'gameScore');

function endGameText() {

    endOfGame.appendChild(winMsg);

    endOfGame.appendChild(gameScore);

    let oar = document.createElement('p');
    oar.innerHTML = 'OR';
    oar.setAttribute('class', 'oar');
    endOfGame.appendChild(oar);

    let playAgain = document.createElement('btn');
    playAgain.innerHTML = 'Play again?';
    playAgain.setAttribute('class', 'playAgain');
    endOfGame.appendChild(playAgain);

    let differentGame = document.createElement('btn');
    differentGame.innerHTML = 'Play a different game?';
    differentGame.setAttribute('class', 'differentGame');
    endOfGame.appendChild(differentGame);

    let children = endOfGame.childNodes;
    playAgain.addEventListener('click', () => {
        for (let i = children.length - 1; i >= 0; i--) {
            children[i].remove();
        }
        endOfGame.remove();
        games[selected].script();
    });

    differentGame.addEventListener('click', () => {
        for (let i = children.length - 1; i >= 0; i--) {
            children[i].remove();
        }
        endOfGame.remove();
        gameSelection();
    });
}

/*Memory Game*/

function memoryGame() {
    //Array storing pairs of 'cards'.
    let cardArray = [
        'imgs/memory/pizza.png',
        'imgs/memory/pizza.png',
        'imgs/memory/chocolate.png',
        'imgs/memory/chocolate.png',
        'imgs/memory/hamburger.png',
        'imgs/memory/hamburger.png',
        'imgs/memory/icecream.png',
        'imgs/memory/icecream.png',
        'imgs/memory/pancake.png',
        'imgs/memory/pancake.png',
        'imgs/memory/soda.png',
        'imgs/memory/soda.png',
    ];

    //Shuffling game cards.
    cardArray.sort(() => 0.5 - Math.random());

    //Getting board element to play the game on and empty arrays to use for game logic.
    let memoryDiv = document.createElement('div');
    arcade.appendChild(memoryDiv);
    let cardsChosen = [];
    let cardsChosenId = [];
    let pairs = [];

    //Score counter.
    let score = 0;
    let scoreHolder = document.createElement('p');
    scoreHolder.innerHTML = 'Pairs found: ' + score;
    memoryDiv.appendChild(scoreHolder);

    //Timer.
    let timer = document.createElement('p');
    memoryDiv.appendChild(timer);
    let milliseconds = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let currentTime;
    timer.innerHTML = 'Time: ' + hours + ':' + minutes + ':' + seconds;
    let timeElapsed = setInterval(() => {
        milliseconds += 100;
        hours = Math.floor(milliseconds / 3600000);
        minutes = Math.floor((milliseconds - (hours * 3600000)) / 60000);
        seconds = Math.floor((milliseconds - (hours * 3600000) - (minutes * 60000)) / 1000);
        let ms = Math.floor((milliseconds - (hours * 3600000) - (minutes * 60000) - (seconds * 1000)) / 100);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        currentTime = 'Time: ' + hours + ':' + minutes + ':' + seconds + ':' + ms;
        timer.innerHTML = currentTime;
        if (pairs.length === cardArray.length / 2) {
            clearInterval(timeElapsed);
        }
    }, 100)

    //Setting the board at the start of the game. Cards given an id to make it easier to find them later on.
    function setBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'imgs/memory/blank.png');
            card.setAttribute('id', i);
            card.setAttribute('class', 'memoryImg')
            memoryDiv.appendChild(card);
            card.addEventListener('click', flip);
        }
    }

    //Function for flipping cards when clicked. Card is pushed to arrays for match checking. If functions for calling checkMatch function and to stop more than two cards being flipped.
    function flip() {
        this.setAttribute('src', cardArray[this.id]);
        cardsChosen.push(cardArray[this.id]);
        cardsChosenId.push(this.id);
        if (cardsChosen.length > 2) {
            this.setAttribute('src', 'imgs/memory/blank.png')
            return
        }
        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    //Match checking function and checking if game is complete.
    function checkMatch() {
        if (cardsChosenId[0] !== cardsChosenId[1] && cardsChosen[0] === cardsChosen[1]) {
            pairs.push(cardsChosen);
            score = pairs.length;
            document.getElementById(cardsChosenId[0]).setAttribute('src', 'imgs/memory/paired.png');
            document.getElementById(cardsChosenId[0]).removeEventListener('click', flip)
            document.getElementById(cardsChosenId[1]).setAttribute('src', 'imgs/memory/paired.png');
            document.getElementById(cardsChosenId[1]).removeEventListener('click', flip)
        } else {
            document.getElementById(cardsChosenId[0]).setAttribute('src', 'imgs/memory/blank.png');
            document.getElementById(cardsChosenId[1]).setAttribute('src', 'imgs/memory/blank.png');
        }

        if (pairs.length === cardArray.length / 2) {
            memoryDiv.remove();
            winMsg.innerHTML = 'You Won!';
            gameScore.innerHTML = currentTime;
            arcade.appendChild(endOfGame);
            endGameText();
        }

        cardsChosen = [];
        cardsChosenId = [];
    }

    setBoard();
}