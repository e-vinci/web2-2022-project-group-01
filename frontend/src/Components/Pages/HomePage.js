/* eslint-disable import/newline-after-import */
import Navigate from '../Router/Navigate';
const HomePage = () => {
  const main = document.querySelector('main');



  const div = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");

  // Ranked game button
  div.id = 'divHome'
  div.innerHTML = `       
  <button type="submit" class="buttonClass Class btn btn-primary  ">
  Partie Classées
  </button> `;
  div.addEventListener('click', () => {
    Navigate('/game');
  });
  main.appendChild(div);

  // Quick game button
  div2.id = 'divHome2'
  div2.innerHTML = `
  <button type="submit" class="buttonClass Class btn btn-primary  ">
  Partie rapide
  </button>`
  div2.addEventListener('click', () => {
    Navigate('/game');
  });
  main.appendChild(div2);

  // Tutorial button

  div3.id = 'divHome2'
  div3.innerHTML = `
    <button type="submit" class="buttonClass Class btn btn-primary  ">
    Tutorial
    </button>`
  div3.addEventListener('click', () => {
    Navigate('/game');
  });
  main.appendChild(div3);




};
/** 
function buttonsHomePage(){
  const main = document.querySelector('main');
  const buttonQuickGame = document.createElement('button');
  buttonQuickGame.type = 'submit';
  buttonQuickGame.style = "width:60px; height:40px";

  const quickGame = `<button><a class="nav-link" href="#" data-uri="/game">Quick Game</a></button>`
  main.innerHTML = 'Deal with the content of your HomePage';
  const divButtonQuickGame = document.createElement('div');
  divButtonQuickGame.appendChild(buttonQuickGame);
  main.appendChild(divButtonQuickGame);
  buttonQuickGame.addEventListener('click', quickGame);
};
*/


export default HomePage;
