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
    divGamesLeft.className='card'
    const divGamesRight = document.createElement("div");
    divGamesRight.className='card'

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



    const userAllScore = await readAllUserScore(user.id_user);
    // const userAllScore = await readAllUserScore(randomId);


    divGamesRight.className = "divGames2";
    // *********************************************************************** //

    divPreviousNext.id = "divPreviousNext"
    divPreviousNext.innerHTML = ` <br> 
            <div id="divPreviousNextButton"  >
                <button type ="submbit" id="btnBefore" class="buttonClass Class btn btn-primary" ><-- Précédent</button> 
                <button type ="submbit" id="btnAfter" class="buttonClass Class btn btn-primary" >Suivant --></button>
            </div>
            `;
    const divGamesInfos=document.createElement('div');
    divGamesInfos.id="containerGamesInfo";
    divGamesInfos.appendChild(divGamesLeft);
    divGamesInfos.appendChild(divGamesRight);


    main.appendChild(divUserPage);
    main.appendChild(divGamesInfos);
    main.appendChild(divPreviousNext);
    getGamesInfos(userAllScore, false);

    let count = 0;
    const beforeButton = document.querySelector('#btnBefore');
    beforeButton.style.display="none";

    beforeButton.addEventListener('click', () => {
        count -= 3;
        previousPage(userAllScore, count);
    });

    const afterButton = document.querySelector('#btnAfter');
    if(userAllScore.length===3){
        afterButton.style.display="none";
    }

    afterButton.addEventListener('click', () => {
        count += 3;
        nextPage(userAllScore, count);
    });


    // eslint-disable-next-line no-new
    new CircularFluidMeter(document.querySelector("#divXp"), {
        // initialProgress: user.xp,
        initialProgress: 45,
        backgroundColor: "#fd6186",
        borderWidth: { value: 15 },


    });


}


function previousPage(userAllScore, count) {
    hideShowButtonNextPrevious(count,userAllScore);
    let ligne = "";


    ligne = "<br> <div id=\"divLigne\"> <p> All Your Games </p>  </div>  <div id='gridContainer'>";

    if (userAllScore.length > 0) {
        for (let i = count; i < count + 3; i++) {
            if (i < userAllScore.length) {
                let element = userAllScore[i];
                ligne += `
                <div class="gridItem">
                    <p><span>Score :</span> ${element.best_score}</p>
                    <p><span>Xp :</span> ${element.xp}</p> 
                `;
                ligne += '</div>';
            }
        }



    } else {
        ligne += ' <p> NO USER\'S GAMES FOUND</p> ';
    }
    ligne += '</div>';
    const divGamesRight = document.querySelector(".divGames2");
    divGamesRight.innerHTML = ligne;

}


function nextPage(userAllScore, count) {
    hideShowButtonNextPrevious(count,userAllScore);
    let ligne = "";
    ligne = "<br> <div id=\"divLigne\"> <p> All Your Games </p>  </div>  <div id='gridContainer'> ";
    
    if (userAllScore.length > 0) {
        for (let i = count; i < count + 3; i++) {
            if (i < userAllScore.length) {
                let element = userAllScore[i];
                ligne += `
                <div class="gridItem">
                    <p><span>Score :</span> ${element.best_score}</p>
                    <p><span>Xp :</span> ${element.xp}</p> 
                `;
                ligne += '</div>';
            }
        };

    } else {
        ligne += ' <p> NO USER\'S GAMES FOUND</p> ';
    }
    ligne += '</div>';

    const divGamesRight = document.querySelector(".divGames2");
    divGamesRight.innerHTML = ligne;

}


function getGamesInfos(userAllScore, onlyBestScore) {
    let ligne = "";
    // *****************************************************
    if (onlyBestScore === true) {
        ligne = "<br> <div id=\"divLigne\"> <p> Your Best Games </p> </div> <div id='gridContainer'>";
        if (userAllScore.length > 0) {
            userAllScore.forEach((element) => {
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
        ligne = "<br> <div id=\"divLigne\"> <p> All Your Games </p>  </div>  <div id='gridContainer'> ";
        if (userAllScore.length > 0) {
            for (let i = 0; i < 3; i++) {
                let element = userAllScore[i];
                ligne += `
                  <div class="gridItem">
                      <p><span >Score : </span> ${element.best_score} </p>
                      <p><span>Xp : </span> ${element.xp} </p> 
                  `;
                ligne += '</div>';
            };
        } else {
            ligne += ' <p> NO USER\'S GAMES FOUND</p> ';
        }
        ligne += '</div>';

        const divGamesRight = document.querySelector(".divGames2");
        divGamesRight.innerHTML = ligne;

    }
    return ligne;
}


function hideShowButtonNextPrevious(count,userAllScore){
    const beforeButton = document.querySelector('#btnBefore');
        if(count===0){
            beforeButton.style.display="none";
        }else{
        beforeButton.style.display="";
    }
    const afterButton = document.querySelector('#btnAfter');
    if(count>=userAllScore.length-3){
        afterButton.style.display="none";
    }else{
        afterButton.style.display="";
    }
}


export default UserPage;
