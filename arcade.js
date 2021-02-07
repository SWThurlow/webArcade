/*Get arcade div to load everything in.*/
let arcade = document.getElementById('arcade');

/*The Games*/
/*
let games = [
    Need to create objects with thumbnails, titles and function for each game.
];
*/
/*Game selection*/
let selectionScreen = document.createElement('div');
selectionScreen.setAttribute('class', 'selection');
arcade.appendChild(selectionScreen);
let gameTitle = document.createElement('h3');
gameTitle.setAttribute('class', 'title');
gameTitle.innerHTML = 'Game Title';
selectionScreen.appendChild(gameTitle);
let prevBtn = document.createElement('btn');
prevBtn.setAttribute('class', 'previous');
prevBtn.innerHTML = 'Previous';
selectionScreen.appendChild(prevBtn);
let gameThumb = document.createElement('img');
gameThumb.setAttribute('class', 'thumb');
gameThumb.setAttribute('src', '#');
selectionScreen.appendChild(gameThumb);
let nextBtn = document.createElement('btn');
nextBtn.setAttribute('class', 'next');
nextBtn.innerHTML = 'Next';
selectionScreen.appendChild(nextBtn);
let play = document.createElement('btn');
play.setAttribute('class', 'play');
play.innerHTML = 'Play';
selectionScreen.appendChild(play);