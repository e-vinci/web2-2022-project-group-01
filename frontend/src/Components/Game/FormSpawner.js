/* eslint-disable no-console */

import { getTypeGame } from "../../utils/games";

/* eslint-disable no-unused-vars */
let radius = 20;
let color ="#ed2553";
let canvas;
let widthCanvas;
let heightCanvas;
let canvasContext;
let x;
let y;
// eslint-disable-next-line import/no-mutable-exports
let score = 0;

function setCanvasContextAndSize() {
  canvas = document.querySelector('#gameCanvas');
  canvas.addEventListener('click', onClickForm);
  canvasContext = canvas.getContext('2d');
  setSizeCanvas();
}

function setSizeCanvas() {
  const divCanvas = document.querySelector('#gameDiv');
  canvas.width = divCanvas.offsetWidth;
  canvas.height = divCanvas.offsetHeight;
  widthCanvas = canvas.width;
  heightCanvas = canvas.height;
}

function drawOneFrame() {
  clearFrame();
  setSizeCanvas();
  drawRectanglesAtRandomLocations();
}

function clearFrame() {
  canvasContext.clearRect(0, 0, widthCanvas, heightCanvas);
}

function drawRectanglesAtRandomLocations() {
  canvasContext.fillStyle = color;
  x = Math.random() * (widthCanvas - radius * 2);
  y = Math.random() * (heightCanvas - radius * 2);

  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
  canvasContext.fill();
}

function onClickForm(e) {
  const xPosReal = x + canvas.offsetLeft;
  const yPosReal = y + canvas.offsetTop;

  if (
    ((e.clientX >= xPosReal && e.clientX <= xPosReal + radius) ||
      (e.clientX <= xPosReal && e.clientX >= xPosReal - radius)) &&
    ((e.clientY >= yPosReal && e.clientY <= yPosReal + radius) ||
      (e.clientY <= yPosReal && e.clientY >= yPosReal - radius))
  ) {
    refreshScore();
  
    if(getTypeGame() === 'troll') drawOneFrameTroll();
    else drawOneFrame();
  }
}

function refreshScore() {
  const divScore = document.querySelector('#score');
  score += 5;
  divScore.innerHTML = `<p> Your score : ${score} </p>`;
}

function initScore() {
  score = 0;
}

function update(size,colorAdd) {
  radius = parseInt(size, 10);
  color=colorAdd;
  setCanvasContextAndSize();
}

// ********* TROLL **************
function drawOneFrameTroll() {
  clearFrame();
  setSizeCanvas();

  // eslint-disable-next-line prefer-const
  let tour = Math.random() * ((3-1)+1);

  if(tour < 2 ){
    drawMultipleRectangles();
  }else{
    drawRectanglesAtRandomLocations();
  }
}

function drawMultipleRectangles(){
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 3; i++) {
    drawRectanglesAtRandomLocations();
  }
}

 

export { drawOneFrame, setCanvasContextAndSize, onClickForm, score, initScore, update, drawOneFrameTroll };
