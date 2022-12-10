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
import { readUsersScore, getUserInfo } from "../../models/games";
// import { getUserInfo } from "../../models/users";

const user =  getAuthenticatedUser();


const UserPage = () => {
    clearPage();
    getUserPage();
    
};

async function getUserPage() {
    const main = document.querySelector("main");
    const divUserPage = document.createElement("div");
    const userLevel = await getUserInfo();
    console.log("kkkkkkkkkkkkkkkkkkkkkkk", userLevel.level);
    const games = await readUsersScore();
    const userGames = getGamesInfos(games);
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
                    <p> Niveau : ${userLevel.level} </p>
                </div>
                <div class="divXp">
                    <p> 16/25 xp </p>   
                </div>
            </div>
        </div>`;
    // ************************************************************************ //
    
    
    divGamesLeft.className = "divGames";
    console.log(userGames);
    divGamesLeft.innerHTML = userGames;


    divGamesRight.className = "divGames2";
    divGamesRight.innerHTML = `
        <div>
            oui
        </div>
    `;

    main.appendChild(divUserPage);
    main.appendChild(divGamesLeft);
    main.appendChild(divGamesRight);
    // divGames.appendChild(divGamesLeft);
    // divGames.appendChild(divGamesRight);
    // main.appendChild(divGames);
}


async function getGamesInfos(gameInfos) {
    const divUsers = document.querySelector('#divUsers');
    divUsers.style.display = '';
  
    let ligne = "<h1>USER</h1><br> <div id='gridContainer'>";
   
      gameInfos.forEach((element) => {
        ligne += `
            <div class="gridItem">
                <p><span>Name : </span> ${element.username}</p>
                <p><span>Level :</span> ${element.best_score}</p> 
                
            `;
      });

    divUsers.innerHTML = ligne;
  }


export default UserPage;
