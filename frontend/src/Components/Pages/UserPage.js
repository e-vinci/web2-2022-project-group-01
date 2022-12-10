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
import { readUsersScore, getUserInfo, readBestUserScore, readAllUserScore } from "../../models/games";
// import { getUserInfo } from "../../models/users";

// const user =  getAuthenticatedUser();


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
    // https://www.synonyme-du-mot.com/les-articles/comment-mettre-deux-div-cote-a-cote
    // https://youtu.be/0SktamdLLAQ
    divUserPage.innerHTML = ` 
            <div>
            <div class="divProfil">
                <img src="${profil}" />
            </div>
        
        </div>
        <div>
            <div class="divProfil2">    
                <p> Bienvenue sur votre profil ${user.username} </p>
            </div>
            <div class="divLevel">    
                <div class="divNiv">
                    <p> Niveau : ${user.level} </p>
                </div>
                <div class="divXp">
                    <p> 16/25 xp </p>   
                </div>
            </div>
        </div>`;
    // ************************************************************************ //


    divGamesLeft.className = "divGames";


    const userBestScore = await readBestUserScore(user.id_user);

    const userBestGames = getGamesInfos(userBestScore);

    const divBestScore = document.createElement("div");
    divBestScore.innerHTML = `<div class="divXp">
    <p> 16/25 xp </p>   
</div>`;

    divGamesLeft.appendChild(divBestScore);
    divGamesLeft.innerHTML = userBestGames;


    const userAllScore = await readAllUserScore(user.id_user);

    const userAllGames = getGamesInfos(userAllScore);

    divGamesRight.className = "divGames2";
    divGamesRight.innerHTML = userAllGames;

    main.appendChild(divUserPage);
    main.appendChild(divGamesLeft);
    main.appendChild(divGamesRight);
    // divGames.appendChild(divGamesLeft);
    // divGames.appendChild(divGamesRight);
    // main.appendChild(divGames);
}



function getGamesInfos(gameInfos) {

    let ligne = "<br> <div id='gridContainer'>";
    if (gameInfos.length > 0) {
        gameInfos.forEach((element) => {
            ligne += `
              <div class="gridItem">
                  <p><span>Score :</span> ${element.best_score}</p> 
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
