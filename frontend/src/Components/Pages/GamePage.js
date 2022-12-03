/* eslint-disable no-constant-condition */
/* eslint-disable import/no-unresolved */
// changes
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { gsap } from 'gsap';
import { clearPage } from '../../utils/render';
import {
  drawOneFrame,
  setCanvasContextAndSize,
  initScore,
  update,
  score,
} from '../Game/FormSpawner';
// eslint-disable-next-line import/no-cycle
import { timerUpdate, time, updateTime, initTimer, clearTime } from '../Game/Timer';
import { getTypeGame } from '../../utils/games';
import Navigate from '../Router/Navigate';

const main = document.querySelector('main');
let intervalId = 0;

const GamePage = () => {
  clearPage();
  clearTime();
  initTimer();
  renderPlayZone();
  setCanvasContextAndSize();
  startPersonnalisation();
  initScore();
  initPlayGround();

  buttonAnime();
};

function renderPlayZone() {
  const divGamePage = document.createElement('div');
  divGamePage.id = 'gamePageDiv';

  const divInformation = document.createElement('div');
  divInformation.id = 'gameInformation';

  const divTimer = document.createElement('div');
  divTimer.id = 'timer';
  divTimer.className = 'divBorder';
  divTimer.innerHTML = `<p> Time left : ${time} second  </p>`;

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
  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'buttonContainer';
  const divButton = document.createElement('div');
  divButton.id = 'buttonDiv';

  const buttonStart = document.createElement('button');
  buttonStart.type = 'submit';
  buttonStart.id = 'startButton';
  buttonStart.className = 'buttonClass btn btn-primary';
  buttonStart.innerHTML = '<p> Start </p> ';

  const buttonPerso = document.createElement('button');
  buttonPerso.type = 'submit';
  buttonPerso.id = 'persoButton';
  buttonPerso.className = 'buttonClass btn btn-primary';
  buttonPerso.innerHTML = '<p> personnalisé </p> ';

  if (getTypeGame() !== 'quick') {
    buttonPerso.style.display = 'none';
  }

  const divPerso = document.createElement('div');
  divPerso.style.display = 'none';
  divPerso.id = 'divPerso';

  buttonPerso.addEventListener('click', displayPerso);
  buttonStart.addEventListener('click', startGame);

  divButton.appendChild(buttonStart);
  divButton.appendChild(buttonPerso);

  buttonContainer.appendChild(divButton);
  buttonContainer.appendChild(divPerso);

  divGamePage.appendChild(buttonContainer);
}

async function saveScore() {
  // const user = getAuthenticatedUser()
  // quand la co sera faites
  const user = 1;
  const scoreToAdd = score;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      user,
      score: scoreToAdd,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/addScore`, options);
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const etatAdding = await response.json();

  console.log('adding ? ', etatAdding);

  Navigate('/');
}


function startGame(e) {
  e.preventDefault();
  if (time === 0) {
    initTimer();
  }
  initScore();
  initPlayGround();
  hideButton();
  drawOneFrame();
  intervalId = setInterval(timerUpdate, 1000);
}

function hideButton() {
  const buttonContainer = document.querySelector('#buttonContainer');
  buttonContainer.style.display = 'none';
}

function initPlayGround() {
  const divCanvas = document.querySelector('#gameDiv');
  divCanvas.innerHTML = '<canvas id="gameCanvas"/>';
  setCanvasContextAndSize();
}

function displayPerso(e) {
  e.preventDefault();
  const divPerso = document.querySelector('#divPerso');
  if (divPerso.style.display === 'none') {
    divPerso.style.display = '';
    divPerso.innerHTML = `  
    <form id = "persoForm" >
      <div class="form-group">
        <label for="time">Time</label>
        <input type="number" class="form-control" id="time" >
      </div>  
      <div class="form-group">
        <label for="size">Size</label>
        <input type="number" class="form-control" id="size" >
      </div>
      <div class="form-group">
        <label for="color">Color</label>
        <input type="color" class="form-control" id="color" >
      </div>
      <button type="submit" class="buttonClass btn btn-primary">Submit</button>
    </form>
  
  `;

    const form = document.querySelector('#persoForm');
    form.addEventListener('submit', personnalisation);
  } else {
    divPerso.style.display = 'none';
  }
}

function personnalisation(e) {
  e.preventDefault();
  const divPerso = document.querySelector('#divPerso');
  divPerso.style.display = 'none';

  const t = document.querySelector('#time').value;
  const m = document.querySelector('#size').value;
  const c = document.querySelector('#color').value;

  if (t !== '' && m !== '') {
    updateTime(t);
    update(m, c);
  }
}

function buttonAnime() {
  gsap.from('#buttonContainer', {
    opacity: 0,
    y: 600,
    duration: 3,
  });
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

export { GamePage, intervalId, saveScore };
