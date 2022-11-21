/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import anime from 'animejs/lib/anime.es';
import { clearPage } from '../../utils/render';
import { drawOneFrame, setCanvasContextAndSize } from '../Game/FormSpawner';
import timerUpdate from '../Game/Timer';

const main = document.querySelector('main');
const body = document.querySelector('body');

const GamePage = () => {
  clearPage();
  renderPlayZone();
  setCanvasContextAndSize();
};

function renderPlayZone() {
  const divGamePage = document.createElement('div');
  divGamePage.id = 'gamePageDiv';

  const divInformation = document.createElement('div');
  divInformation.id = 'gameInformation';

  const divTimer = document.createElement('div');
  divTimer.id = 'timer';
  divTimer.innerHTML=`<p> Time left : 45 second  </p>`;

  const divSocre = document.createElement('div');
  divSocre.id = 'score';
  divSocre.innerHTML = ' <p> your score : 0 </p>';

  divInformation.appendChild(divTimer);
  divInformation.appendChild(divSocre);

  divGamePage.appendChild(divInformation);

  const divCanvas = document.createElement('div');
  divCanvas.id = 'gameDiv';
  divCanvas.innerHTML = '<canvas id="gameCanvas"/>';
  divGamePage.appendChild(divCanvas);

  const divAnimation = document.createElement('div');
  divAnimation.id = 'animationDiv';
  divAnimation.innerHTML += '<p> you are actually playing, DO YOUR BEST </p>';
  divGamePage.appendChild(divAnimation);

  const button = document.createElement('button');
  button.type = 'submit';
  button.id = 'start';
  button.innerHTML = '<p> Start </p> ';
  button.addEventListener('click', startGame);
  divGamePage.appendChild(button);

  main.appendChild(divGamePage);
}

function removePotentialVerticalAndHorizontalScrollbars() {
  body.style.overflow = 'hidden';
}

function testAnime() {
  // faire en sorte qu'il s'arrete au dessus
  anime({
    targets: '#animationDiv',
    translateX: window.innerWidth / 2,
    // translateY:250,
    direction: 'alternate',
    loop: true,
    easing: 'spring(80, 80, 80, 0)',
  });
}

function animationPlaying() {
  const divGamePage = document.createElement('div');
  const divAnimation = document.createElement('div');
  divAnimation.id = 'animationDiv';
  divAnimation.innerHTML += '<p> you are actually playing, DO YOUR BEST </p>';
  divGamePage.appendChild(divAnimation);
}

function startGame(e) {
  e.preventDefault();
  animationPlaying();
  drawOneFrame();
  setInterval(drawOneFrame, 10000);
  setInterval(timerUpdate, 1000);
  testAnime();
}
export default GamePage;
