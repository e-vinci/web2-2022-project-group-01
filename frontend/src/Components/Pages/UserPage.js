/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { getAuthenticatedUser } from "../../utils/auths";
import { clearPage } from "../../utils/render";
import profil from "../../img/profil.jpg";
// import { readUsersLevel } from "../../models/games";
// import { getUserId } from "../../models/users";
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
    const divGames = document.createElement("div");
    divUserPage.id = "divUser";
    // https://www.synonyme-du-mot.com/les-articles/comment-mettre-deux-div-cote-a-cote
    // https://youtu.be/0SktamdLLAQ
    /** 
     * divUserPage.innerHTML = `
            <div id="divUser2"> 
                <div class="divProfil">
                    <img src="${profil}" width="200px" height="200px" />
                </div>
            

                <div class="divProfil2">    
                    <p> Bienvenue sur votre profil <b> ${user.username} </b> </p>
                </div>
            </div> 
            <div id="divUser2">
                <div class="divNiv">
                        <p> Niveau : ${userLevel.level} </p>   
                </div>
                <div class="divXp">
                        <p> 16/25 xp </p>   
                </div> 
            </div>  
        `;
        */

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
            <div class="divProfil2">
                <p> Niveau : ${userLevel.level} </p>
                 
            </div>
            <div class="divProfil2">
                <p> 16/25 xp </p>   
            </div>
        </div>`;

    divGames.className = "divGames";
    divGames.innerHTML = `
        <div>
            oui
        </div>
    `;

    main.appendChild(divUserPage);
    main.appendChild(divGames);

}


async function getUserInfo() {
    const pseudo = user.username;

    const options = {
        headers: {
            Authorization: user.token,
        },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/users/getUser?pseudo=${pseudo}`, options);
    console.log("ooooooooooooooooooooooooooooooooooooooo",response);

    if (!response.ok) {
        throw new Error(`readUsersScore:: fetch error : ${response.status} : ${response.statusText}`);
    }

    const userId = await response.json();
    console.log("ooooooooooooooooooooooooooooooooooooooo",userId[0]);
    return userId[0];

}


  
  



export default UserPage;
