/* eslint-disable import/newline-after-import */
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import {  isAuthenticated } from '../../utils/auths';
// import {getTypeGame, setTypeGame, isTypeGame, clearTypeGame} from '../../utils/games';
const main = document.querySelector('main');

const HomePage = () => {
  clearPage();
  buttonTypeGame();

};

function buttonTypeGame() {

  const div = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");

  // Ranked game button
  div.id = 'divHome';
  div.innerHTML = `       
  <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
  Partie Classées
  </button> `;
  div.addEventListener('click', () => {
    if (isAuthenticated()){
      Navigate('/game');
    }else{
      Navigate('/login');
    }
      
  });
  main.appendChild(div);


  // Quick game button
  div2.id = 'divHome2'
  div2.innerHTML = `
  <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
  Partie rapide
  </button>`
  div2.addEventListener('click', () => {
    Navigate('/game');
  });
  main.appendChild(div2);


  // Tutorial button
  div3.id = 'divHome3'
  div3.innerHTML = `
    <button type="submit" id="buttonTutorial" class="buttonClass Class btn btn-primary  ">
    Tutorial
    </button>`
  div3.addEventListener('click', () => {
    Navigate('/');
  });
  main.appendChild(div3);

}

export default HomePage;
