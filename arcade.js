/*Get arcade div to load everything in.*/
let arcade = document.getElementById('arcade');

/*Game selection*/
let gameTitle = document.createElement('h3');
gameTitle.setAttribute('class', 'title');
gameTitle.innerHTML = 'Game Title';
arcade.appendChild(gameTitle);
let prevBtn = document.createElement('btn');
prevBtn.setAttribute('class', 'previous');
prevBtn.innerHTML = 'Previous';
arcade.appendChild(prevBtn);
let gameThumb = document.createElement('img');
gameThumb.setAttribute('class', 'thumb');
gameThumb.setAttribute('src', '#');
arcade.appendChild(gameThumb);
let nextBtn = document.createElement('btn');
nextBtn.setAttribute('class', 'next');
nextBtn.innerHTML = 'Next';
arcade.appendChild(nextBtn);
let play = document.createElement('btn');
play.setAttribute('class', 'play');
play.innerHTML = 'Play';
arcade.appendChild(play);