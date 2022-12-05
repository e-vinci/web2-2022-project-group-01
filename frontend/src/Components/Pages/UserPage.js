/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { getAuthenticatedUser } from "../../utils/auths";
import { clearPage } from "../../utils/render";
import profil from "../../img/profil.jpg";


const UserPage = () => {
    clearPage();
    getUserPage();

};

function getUserPage() {
    const main = document.querySelector("main");
    const divUserPage = document.createElement("div");
    const authenticatedUser = getAuthenticatedUser();
    const divImg = document.createElement("div");
    const divLevNum = document.createElement("div");
    const divXp = document.createElement("div");
    const divBestGame = document.createElement("div");
    const divAllYourGames = document.createElement("div");
    const divInfoGames = document.createElement("div");
    const divLevXp = document.createElement("div");


    divImg.id = 'divImg';
    divUserPage.id = 'divUser';
    divLevNum.id = 'divLevNum';
    divXp.id = 'divXp';
    divBestGame.id = 'divBestGame';
    divAllYourGames.id = 'divAllYourGames';
    divInfoGames.id = 'divInfoGames';
    divLevXp.id = 'divLevXp';


    divImg.innerHTML = `<img src="${profil}">`;

    divUserPage.innerHTML = `<p> Bienvenue sur votre profil ${authenticatedUser.username} </p> `;

    divLevNum.innerHTML = ` <br><div> 
    <p> Niveau : 13 </p> </div>`
    divXp.innerHTML = `<p> 16/25 XP </p>`


    main.appendChild(divImg);
    main.appendChild(divUserPage);

    main.appendChild(divLevNum);
    main.appendChild(divXp);

}

export default UserPage;