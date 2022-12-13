/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
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

var index = 0;
var lastIndex = 3;

const UserPage = () => {
    clearPage();
    getUserPage();

};

async function getUserPage() {
    const main = document.querySelector("main");
    const divUserPage = document.createElement("div");
    const user = await getUserInfo();

    const divPreviousNext = document.createElement("div");
    const divGamesLeft = document.createElement("div");
    const divGamesRight = document.createElement("div");
    divUserPage.className = "divUser";


    divUserPage.innerHTML = ` 
               
            <div class="divProfil">
                <img src="${profil}" />
            </div>    
          
                <div class="divUser2">
                    <div class="divProfil2">    
                            <p> Welcome to your profil <b> ${user.username} </b> </p>
                    </div>
               
                    <div id="divNiv">
                            <p> <b><u> Level </u></b>
                            <br> 
                            <span id="divNumber">
                                ${user.level} 
                            </span>
                            </p>    
                    </div>
                         
                    <div id="divXp"> </div>   
            </div>`;

    // ************************************************************************ //


    divGamesLeft.className = "divGames";


    const userBestScore = await readBestUserScore(user.id_user);
    // const randomId = 1;
    // const userBestScore = await readBestUserScore(randomId);

    const userBestGames = getGamesInfos(userBestScore, true);


    divGamesLeft.innerHTML = userBestGames;



    const userAllScore = await readAllUserScore(1);
    // const userAllScore = await readAllUserScore(randomId);


    divGamesRight.className = "divGames2";
    // *********************************************************************** //

    divPreviousNext.id = "divPreviousNext"
    divPreviousNext.innerHTML = ` <br> <div> <button type =\"submbit\" id=\"btnAfter\">Suivant</button> </div>`;



    main.appendChild(divUserPage);
    main.appendChild(divGamesLeft);

    main.appendChild(divGamesRight);
    main.appendChild(divPreviousNext);
    let gameInfos = getGamesInfos(userAllScore, false);
    let count = 0;
    const afterButton = document.querySelector('#btnAfter');
    afterButton.addEventListener('click', () => {
        console.log("erzre", gameInfos);
        count += 3;
        pageNext(gameInfos, count);
    });

    // eslint-disable-next-line no-new


    const xpBar = new CircularFluidMeter(document.querySelector("#divXp"), {
        initialProgress: 33,
    });
    xpBar.backgroundColor = "#ed2553";

}


function pageNext(gameInfos, count) {
    let ligne = "";
    ligne = "<br> <div id='gridContainer'> <div id=\"divLigne\"> <p> All Your Games </p>  </div> ";
    if (gameInfos.length > 0) {
        
        for (let i = count; i < count + 3; i++) {
            if (i < gameInfos.length) {
                let element = gameInfos[i];
                console.log("GGGGGGGGGGGGGGGGGGGGGGGGG", count);
            ligne += `
                <div class="gridItem">
                    <p><span>Score :</span> ${element.best_score}</p>
                    <p><span>Xp :</span> ${element.xp}</p> 
                `;
                ligne += '</div>';

            };
            
        }
       
    } else {
        ligne += ' <p> NO USER\'S GAMES FOUND</p> ';
    }
    ligne += '</div>';


    const divGamesRight = document.querySelector(".divGames2");
    divGamesRight.innerHTML = ligne;
}


function getGamesInfos(gameInfos, onlyBestScore) {
    let ligne = "";
    // *****************************************************
    if (onlyBestScore === true) {
        ligne = "<br> <div id='gridContainer'> <div id=\"divLigne\"> <p> Your Best Games </p> </div>";
        if (gameInfos.length > 0) {
            gameInfos.forEach((element) => {
                ligne += `
                  <div class="gridItem">
                      <p><span>Score :</span> ${element.best_score}</p>
                      <p><span>Xp :</span> ${element.xp}</p> 
                    </div>`;

            });
        } else {
            ligne += ' <p> NO USER\'S GAMES FOUND</p> ';
        }
        ligne += '</div>';
    }
    // *****************************************************
    else {

        ligne = "<br> <div id='gridContainer'> <div id=\"divLigne\"> <p> All Your Games </p>  </div> ";
        if (gameInfos.length > 0) {
            for (let i = 0; i < 3; i++) {

                let element = gameInfos[i];

                ligne += `
                  <div class="gridItem">
                      <p><span >Score : </span> ${element.best_score} </p>
                      <p><span>Xp : </span> ${element.xp} </p> 
                  `;
                ligne += '</div>';


            };
            console.log("GGGGGGGGGGGGGGGGGGGGGGGGG", gameInfos[3]);

        } else {
            ligne += ' <p> NO USER\'S GAMES FOUND</p> ';
        }
        ligne += '</div>';

        const divGamesRight = document.querySelector(".divGames2");
        divGamesRight.innerHTML = ligne;

    }
    return ligne;
}



export default UserPage;
