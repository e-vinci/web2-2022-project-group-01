import { getAuthenticatedUser } from "../../utils/auths";

const main = document.querySelector("main");
const divUserPage = document.createElement("div");
const authenticatedUser = getAuthenticatedUser();

const UserPage = async () => {
    getUserPage();
    
};

function getUserPage(){

    divUserPage.id = 'divUser';
    divUserPage.innerHTML = ` <p> Bienvenue sur votre profil ${authenticatedUser.username} </p> `

    main.appendChild(divUserPage);
}

export default UserPage;