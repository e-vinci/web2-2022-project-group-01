/* eslint-disable import/no-mutable-exports */
import { score } from './FormSpawner';
// eslint-disable-next-line import/no-cycle
import { intervalId ,saveScoreButton} from '../Pages/GamePage';

let time = 10;

function timerUpdate() {
  if (time === 0) {
    const divCanvas = document.querySelector('#gameDiv');
    divCanvas.innerHTML = ` 
    <div id ="divEndGameDisplay">
      <div id="textScore">
        <p> Your score is ${score} </p>
      </div>
      <div>
        <button type="submit" id = "saveButton"class = "buttonClass btn btn-primary">
        <p> Save Score </p>
      </div>
    </div>
    `
    const saveButton = document.querySelector("#saveButton")
    saveButton.addEventListener('click', saveScoreButton);

    showDivButton();
    // hideAnimation();
    clearInterval(intervalId);
    return;
  }
  time -= 1;
  const divTimer = document.querySelector('#timer');
  divTimer.innerHTML = `<p> Time left : ${time} second  </p>`;
}

function showDivButton() {
  const buttonContainer = document.querySelector('#buttonContainer');
  buttonContainer.style.display = '';
  const buttonStart = document.querySelector('#startButton');
  buttonStart.innerHTML = 'Restart';
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

function updateTime(addTime) {
  time = addTime;
  const timerDiv = document.querySelector('#timer');
  timerDiv.innerHTML = `<p> Time left : ${time} second  </p>`;
}

export { initTimer, timerUpdate, updateTime, time };
