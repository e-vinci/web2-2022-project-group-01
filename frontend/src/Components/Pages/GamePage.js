/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import anime from 'animejs/lib/anime.es';
import mojs from '@mojs/core';
import { clearPage } from '../../utils/render';
import { drawOneFrame, setCanvasContextAndSize, initScore } from '../Game/FormSpawner';
// eslint-disable-next-line import/no-cycle
import { timerUpdate, initTimer } from '../Game/Timer';

const main = document.querySelector('main');
let intervalId = 0;

const GamePage = () => {
  clearPage();
  renderPlayZone();
  setCanvasContextAndSize();
  startPersonnalisation();
};

function renderPlayZone() {
  const divGamePage = document.createElement('div');
  divGamePage.id = 'gamePageDiv';

  const divInformation = document.createElement('div');
  divInformation.id = 'gameInformation';

  const divTimer = document.createElement('div');
  divTimer.id = 'timer';
  divTimer.className = 'divBorder';
  divTimer.innerHTML = `<p> Time left : 45 second  </p>`;

  const divScore = document.createElement('div');
  divScore.id = 'score';
  divScore.className = 'divBorder';
  divScore.innerHTML = ' <p> your score : 0 </p>';

  divInformation.appendChild(divTimer);
  divInformation.appendChild(divScore);

  divGamePage.appendChild(divInformation);

  const divCanvas = document.createElement('div');
  divCanvas.id = 'gameDiv';
  divCanvas.className = 'divBorder';
  divCanvas.innerHTML = '<canvas id="gameCanvas"/>';
  divGamePage.appendChild(divCanvas);


  main.appendChild(divGamePage);
}

function startPersonnalisation() {
  const divGamePage = document.getElementById('gamePageDiv');
  const divButton = document.createElement('div');
  divButton.id='buttonDiv';

  const buttonStart = document.createElement('button');
  buttonStart.type = 'submit';
  buttonStart.id = 'startButton';
  buttonStart.className='buttonClass btn btn-primary'
  buttonStart.innerHTML = '<p> Start </p> ';

  divButton.appendChild(buttonStart);

  if(true){
    const buttonPerso = document.createElement('button');
    buttonPerso.type = 'submit';
    buttonPerso.id = 'persoButton';
    buttonPerso.className='buttonClass btn btn-primary'
    buttonPerso.innerHTML = '<p> personnalisé </p> ';
    divButton.appendChild(buttonPerso)
    buttonPerso.addEventListener('click', displayPerso);

  }



  buttonStart.addEventListener('click', startGame);
  divGamePage.appendChild(divButton);
}
/*
function testAnime() {
  const divCanvas = document.querySelector('#gameDiv');
  // faire en sorte qu'il s'arrete au dessus
  anime({
    targets: '#animationDiv',
    translateX: divCanvas.offsetWidth / 2,
    // translateY:250,
    direction: 'alternate',
    loop: true,
    easing: 'spring(80, 80, 80, 0)',
  });
}
*/
/* function animationPlaying() {
  const divGamePage = document.querySelector('#gamePageDiv');
  const divAnimation = document.createElement('div');
  divAnimation.id = 'animationDiv';
  divAnimation.innerHTML += '<p> you are actually playing, DO YOUR BEST </p>';
  divGamePage.appendChild(divAnimation);
} */

function startGame(e) {
  console.log('test444');
  e.preventDefault();
  initScore();
  initTimer();
  initPlayGround();
  hideButton();
  // animationPlaying();
  drawOneFrame();
  intervalId = setInterval(timerUpdate, 1000);
  // testAnime();
}

function hideButton() {
  const divButton = document.querySelector('#buttonDiv');
  divButton.style.display = 'none';
}

function initPlayGround() {
  const divCanvas = document.querySelector('#gameDiv');
  divCanvas.innerHTML = '<canvas id="gameCanvas"/>';
  setCanvasContextAndSize();
}


function displayPerso(e){
  e.preventDefault();
  const divGamePage = document.getElementById('gamePageDiv');
  const divPerso= document.createElement('div');
  divPerso.id="divPerso"
  divPerso.innerHTML=`  
  <form>
    <div class="form-group">
      <label for="time">Time</label>
      <input type="number" class="form-control" id="time" >
    </div>  
    <div class="form-group">
      <label for="time">Size</label>
      <input type="number" class="form-control" id="size" >
    </div>
    <button type="submit" class="buttonClass btn btn-primary">Submit</button>
  </form>
  
  `
  console.log("resresrres");
  divGamePage.appendChild(divPerso)
}
/*
const OPTS = {
  fill:           'none',
  radius:         25,
  strokeWidth:    { 50 : 0 },
  scale:          { 0: 1 },
  duration:       500,
  left: 0,        top: 0,
  easing: 'cubic.out'
};

const mainCircle = new mojs.Shape({
  ...OPTS,
  stroke:         'cyan',
});

const smallCircles = [];
const colors = [ 'deeppink', 'magenta', 'yellow', '#00F87F' ]

for ( let i = 0; i < 4; i++ ) {
  smallCircles.push(new mojs.Shape({
    ...OPTS,
    parent:         mainCircle.el,
    radius:         { 0 : 15 },
    strokeWidth:    { 30: 0 },
    left: '50%',    top: '50%',
    stroke:         colors[ i % colors.length],
    delay:          'rand(0, 350)',
    x:              'rand(-50, 50)',
    y:              'rand(-50, 50)',
    // eslint-disable-next-line no-dupe-keys
    radius:         'rand(5, 20)'
  })
 );
}

document.addEventListener( 'click', (e) => {
  
   mainCircle
    .tune({ x: e.pageX, y: e.pageY  })
    .replay();
  
    // eslint-disable-next-line no-plusplus
    for ( let i = 0; i < smallCircles.length; i++ ) {
      smallCircles[i]
        .generate()
        .replay(); 
    }
  
});
*/

export { GamePage, intervalId };
