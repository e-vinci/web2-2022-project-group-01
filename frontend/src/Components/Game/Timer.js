import { score } from './FormSpawner';
// eslint-disable-next-line import/no-cycle
import {intervalId} from '../Pages/GamePage'

let time = 10;

function timerUpdate() {
  if (time === 0) {
    const divCanvas = document.querySelector('#gameDiv');
    divCanvas.innerHTML = `<p> GAME FINISH your score :  ${score}</p>`;
    showDivButton();
     // hideAnimation();
    clearInterval(intervalId)
    return;
  }
  time -= 1;
  const divTimer = document.querySelector('#timer');
  divTimer.innerHTML = `<p> Time left : ${time} second  </p>`;
}

function showDivButton() {
  const buttonStart = document.querySelector('#buttonDiv');
  buttonStart.style.display = '';
}
/*
function hideAnimation(){
  const divAnimation = document.getElementById('animationDiv');
  divAnimation.style.display="none"

}
*/
function initTimer() {
  time = 10;
}

export { initTimer, timerUpdate };
