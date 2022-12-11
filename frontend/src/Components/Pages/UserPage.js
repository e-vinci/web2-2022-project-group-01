/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable import/named */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { getAuthenticatedUser } from "../../utils/auths";
import { clearPage } from "../../utils/render";
import profil from "../../img/profil.jpg";
import { getUserInfo, readBestUserScore, readAllUserScore } from "../../models/games";
import { CircularFluidMeter } from 'fluid-meter';

const UserPage = () => {
    clearPage();
    getUserPage();

};

async function getUserPage() {
    const main = document.querySelector("main");
    const divUserPage = document.createElement("div");
    const user = await getUserInfo();

    const target = document.querySelector("#divXp");
    let xpBar = new CircularFluidMeter(target, {
        initialProgress: 33,
        borderWidth: [
            {
              resolution: 0,
              value: 15
            },
            {
              resolution: 1024,
              value: 60
            }
          ],
          fontSize: [
            {
              resolution: 0,
              value: 25
            },
            {
              resolution: 768,
              value: 50
            }
          ]
        });

    const divGamesLeft = document.createElement("div");
    const divGamesRight = document.createElement("div");
    divUserPage.id = "divUser";
   

    divUserPage.innerHTML = ` 
            
            <div class="divProfil">
                <img src="${profil}" />
            </div>    
            
                <div class="divProfil2">    
                    <p> Bienvenue sur votre profil ${user.username} </p>
                </div>
                
                <br>
                <br>
                    <div class="divNiv">
                        <p> Niveau : ${user.level} </p>
                    </div>
                    <div id="divXp">
                           
                    </div>
                   
         
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>`;

    // ************************************************************************ //

    // <div class="divLevel"> 
    divGamesLeft.className = "divGames";


    // const userBestScore = await readBestUserScore(user.id_user);
    const userBestScore = await readBestUserScore(1);

    const userBestGames = getGamesInfos(userBestScore, true);

    
    divGamesLeft.innerHTML = userBestGames;


    // const userAllScore = await readAllUserScore(user.id_user);
    const userAllScore = await readAllUserScore(1);

    const userAllGames = getGamesInfos(userAllScore, false);

    divGamesRight.className = "divGames2";
    divGamesRight.innerHTML = userAllGames;

    main.appendChild(divUserPage);
    main.appendChild(divGamesLeft);
    main.appendChild(divGamesRight);
    // divGames.appendChild(divGamesLeft);
    // divGames.appendChild(divGamesRight);
    // main.appendChild(divGames);
}



function getGamesInfos(gameInfos, onlyBestScore) {
    let ligne;
    if (onlyBestScore === true) {
        ligne = "<br> <div id='gridContainer'> <div id=\"divLigne\"> <p> Your Best Games </p> </div>";
    } else {
        ligne = "<br> <div id='gridContainer'> <div id=\"divLigne\"> <p> All Your Games </p> </div>";
    }
    if (gameInfos.length > 0) {
        gameInfos.forEach((element) => {
            ligne += `
              <div class="gridItem">
                  <p><span>Score :</span> ${element.best_score}</p>
                  <p><span>Xp :</span> ${element.xp}</p> 
              `;
            ligne += '</div>';
        });
    } else {
        ligne += ' <p> NO USER\'S GAMES FOUND</p> ';
    }
    ligne += '</div>';

    return ligne;

}


export default UserPage;
