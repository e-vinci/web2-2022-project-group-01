/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const radius = 40;
const color = 'dark';
let canvas;
let widthCanvas;
let heightCanvas;
let canvasContext;
let x;
let y;

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
  // probleme de depassement de l'espace des canvas donc la forme n'est pas entière
  x = Math.random() * (widthCanvas - radius * 2);
  y = Math.random() * (heightCanvas - radius * 2);

  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
  canvasContext.fill();

}

function onClickForm(e) {
  const xPosReal= x+canvas.offsetLeft;
  const yPosReal= y+canvas.offsetTop;

  if ((
    (e.clientX >= xPosReal && e.clientX <= xPosReal + radius) || (e.clientX<=xPosReal && e.clientX >= xPosReal-radius)) 
    && ((e.clientY >= yPosReal && e.clientY <= yPosReal + radius ) || (e.clientY<=yPosReal && e.clientY>=yPosReal-radius))) {
    console.log(true);
  } else {
    console.log(false);
  }
}

export { drawOneFrame, setCanvasContextAndSize, onClickForm };
