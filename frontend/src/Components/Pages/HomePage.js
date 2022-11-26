/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import { isAuthenticated } from '../../utils/auths';
import { setTypeGame } from '../../utils/games';

const main = document.querySelector('main');
const divAll = document.createElement("div");
const div = document.createElement("div");
const div2 = document.createElement("div");
const div3 = document.createElement("div");
const divScoreTable = document.createElement('div');



const HomePage = () => {
  clearPage();

  if (isAuthenticated()) {
    getHomePageConnected();
  }
  else {
    getHomePageDisconnected();
  }
};



// If the user is disconnected
function getHomePageDisconnected() {

  divScoreTable.style.display = 'none';
  div.id = 'divHome';
  div2.id = 'divHome2';
  div3.id = 'divHome3';


  // Ranked game button
  div.innerHTML = `       
  <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
  Ranked Game
  </button> `;
  div.addEventListener('click', () => {
    if (isAuthenticated()) {
      Navigate('/game');
    } else {
      setTypeGame("competition")
      Navigate('/game');
    }
  });


  // Quick game button
  div2.innerHTML = `
  <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
  Quick Game
  </button>`
  div2.addEventListener('click', () => {
    setTypeGame("quick")
    Navigate('/game');
  });


  // Tutorial button
  div3.innerHTML = `
    <button type="submit" id="buttonTutorial" class="buttonClass Class btn btn-primary  ">
    Tutorial
    </button>`
  div3.addEventListener('click', () => {
    Navigate('/tutoriel');
  });

  main.appendChild(div);
  main.appendChild(div2);
  main.appendChild(div3);
};


// If the user is connected
function getHomePageConnected() {

  // Score Table
  getScoreTable();

  // 'div' with the game buttons and the score table
  divAll.id = 'divAll';

  // Ranked game button
  div.id = 'divHomeConnected';
  div.innerHTML = `       
      <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
      Ranked Game
      </button> `;
  div.addEventListener('click', () => {
    if (isAuthenticated()) {
      Navigate('/game');
    } else {
      setTypeGame("competition")
      Navigate('/game');
    }

  });
  divAll.appendChild(div);



  // Quick game button
  div2.id = 'divHomeConnected'
  div2.innerHTML = `
      <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
      Quick Game
      </button>`
  div2.addEventListener('click', () => {
    setTypeGame("quick")
    Navigate('/game');
  });
  divAll.appendChild(div2);


  // Tutorial button
  div3.id = 'divHomeConnected'
  div3.innerHTML = `
        <button type="submit" id="buttonTutorial" class="buttonClass Class btn btn-primary  ">
        Tutorial
        </button>`
  div3.addEventListener('click', () => {
    Navigate('/tutoriel');
  });
  divAll.appendChild(div3);


  main.appendChild(divAll);

};

function getScoreTable() {
  const scoreTable = `
          <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th colspan="3" style="text-align: center;">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>N°</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
            <tr>
              <td>1</td>
              <td>Player1</td>
              <td>120</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Player2</td>
              <td>90</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Player3</td>
              <td>60</td>
            </tr>
          </tbody>
        </table>`;
  divScoreTable.id = 'divScoreTable';
  divScoreTable.innerHTML = scoreTable;
  divAll.appendChild(divScoreTable);
};

export default HomePage;
