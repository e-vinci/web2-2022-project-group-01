/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { clearPage } from '../../utils/render';
import { drawOneFrame,setCanvasContextAndSize, onClickForm}  from '../Game/FormSpawner';

const main = document.querySelector('main');
const body = document.querySelector('body');


const GamePage = () => {
  clearPage();
  renderPlayZone();
  setCanvasContextAndSize();
  removePotentialVerticalAndHorizontalScrollbars();
  drawOneFrame();
  setInterval(drawOneFrame,10000);
};

function renderPlayZone() {
  const divGamePage = document.createElement('div');
  divGamePage.id = 'gamePageDiv';
  const divInformation = document.createElement('div');
  divInformation.id = 'gameInformation';
  const divTimer = document.createElement('div');
  divTimer.id = 'timer';
  divTimer.innerHTML = ' <p> timer TEST </p>';
  const divSocre = document.createElement('div');
  divSocre.id = 'score';
  divSocre.innerHTML = ' <p> score TEST </p>';
  divInformation.appendChild(divTimer);
  divInformation.appendChild(divSocre);
  divGamePage.appendChild(divInformation);

  const divCanvas = document.createElement('div');
  divCanvas.id = 'gameDiv';
  divCanvas.innerHTML = '<canvas id="gameCanvas"/>';
  divGamePage.appendChild(divCanvas);

  main.appendChild(divGamePage);
  
}

function removePotentialVerticalAndHorizontalScrollbars() {
  body.style.overflow = 'hidden';
}

export default GamePage;
