/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { getAuthenticatedUser } from "../../utils/auths";
import { clearPage } from "../../utils/render";
import profil from "../../img/profil.jpg";
import { readUsersLevel } from "../../models/games";

const UserPage = () => {
    clearPage();
    getUserPage();

};

function getUserPage() {
    const main = document.querySelector("main");
    const divUserPage = document.createElement("div");
    const user = getAuthenticatedUser();
    const userLevel = readUsersLevel();
    const divGames = document.createElement("div");
    divUserPage.className = "divUser";
    // https://www.synonyme-du-mot.com/les-articles/comment-mettre-deux-div-cote-a-cote
    // https://youtu.be/0SktamdLLAQ
    divUserPage.innerHTML = `
        <div>
            <div class="divProfil">
                <img src="${profil}" width="200px" height="200px" />
            </div>
          
        </div>

        <div>
            <div class="divProfil2">    
                <p> Bienvenue sur votre profil <b> ${user.username} </b> </p>
            </div>
            <div class="divLevel"> 
                <div class="divNiv">
                    <p> Niveau : ${userLevel.level} </p>   
                </div>
                <div class="divXp">
                    <p> 16/25 xp </p>   
                </div>
            </div>     
        </div>
        `;

    divGames.className = "divGames";
    divGames.innerHTML = `
        <div>
            oui
        </div>
    `;
    
    main.appendChild(divUserPage);
    main.appendChild(divGames);

}

export default UserPage;