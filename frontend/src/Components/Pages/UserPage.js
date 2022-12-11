/* eslint-disable prefer-template */
/* eslint-disable operator-assignment */
/* eslint-disable no-extra-semi */
/* eslint-disable no-plusplus */
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
import { FluidLayerConfiguration } from "fluid-meter/dist/meters/CircularFluidMeter/Layers/FluidLayer";

const UserPage = () => {
    clearPage();
    getUserPage();

};

async function getUserPage() {
    const main = document.querySelector("main");
    const divUserPage = document.createElement("div");
    const user = await getUserInfo();


    const divGamesLeft = document.createElement("div");
    const divGamesRight = document.createElement("div");
    divUserPage.id = "divUser";


    divUserPage.innerHTML = ` 
            
            <div class="divProfil">
                <img src="${profil}" />
            </div>    
            <div class="divUser2">  
                <div class="divProfil2">    
                    <p> Welcome to your profil ${user.username} </p>
            </div>
                <div class="divLevel">
                    <div id="divNiv">
                            <p> Level : 
                            <br> 
                            <span id="divNumber">
                                ${user.level} </p>
                            </span>    
                    </div>
                    <div id="divXp"></div>
                </div>
            </div>`;

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
    divGamesRight.innerHTML = userAllGames + `<a> Précédant </a> <a> Suivant </a>`;


    main.appendChild(divUserPage);
    main.appendChild(divGamesLeft);
    main.appendChild(divGamesRight);
    // divGames.appendChild(divGamesLeft);
    // divGames.appendChild(divGamesRight);
    // main.appendChild(divGames);

    // eslint-disable-next-line no-new


    const xpBar = new CircularFluidMeter(document.querySelector("#divXp"), {
        initialProgress: 33,
    });

    xpBar.backgroundColor = "#ed2553";

}



function getGamesInfos(gameInfos, onlyBestScore) {
    let ligne;
    if (onlyBestScore === true) {
        ligne = "<br> <div id='gridContainer'> <div id=\"divLigne\"> <p> Your Best Games </p> </div>";
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
    }

    else {
        ligne = "<br> <div id='gridContainer'> <div id=\"divLigne\"> <p> All Your Games </p> </div>";
        if (gameInfos.length > 0) {
            for (let i = 0; i < 3; i++) {
                const element = gameInfos[i];
                ligne += `
                  <div class="gridItem">
                      <p><span>Score :</span> ${element.best_score}</p>
                      <p><span>Xp :</span> ${element.xp}</p> 
                  `;
                ligne += '</div>';
            };


        } else {
            ligne += ' <p> NO USER\'S GAMES FOUND</p> ';
        }
        ligne += '</div>';
        /** 
            let next = "<a> Précédant </a> <a> Suivant </a>";

            ligne = ligne + next;
        */
    }


    return ligne;

}


export default UserPage;
