import { score } from './FormSpawner';

let time = 10;

function timerUpdate() {
  if (time === 0) {
    const divCanvas = document.querySelector('#gameDiv');
    divCanvas.innerHTML = `<p> GAME FINISH your score :  ${score}</p>`;
    showButtonRestart();
    return;
  }
  time -= 1;
  const divTimer = document.querySelector('#timer');
  divTimer.innerHTML = `<p> Time left : ${time} second  </p>`;
}

function showButtonRestart() {
  const buttonStart = document.querySelector('#start');
  buttonStart.style.display = '';
  buttonStart.innerHTML = '<p> restart </p>';
}

function initTimer() {
  time = 10;
}

export { initTimer, timerUpdate };
