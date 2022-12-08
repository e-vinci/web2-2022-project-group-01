/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// import { getAuthenticatedUser } from "../../utils/auths";
import { clearPage } from "../../utils/render";
// import profil from "../../img/profil.jpg";

// `<div><p> Bienvenue sur votre profil ${authenticatedUser.username} </p> </div><br>`

const UserPage = () => {
    clearPage();
    getUserPage();

};

function getUserPage() {
    const main = document.querySelector("main");
    const divUserPage = document.createElement("div");
    divUserPage.id = "divUser";

    divUserPage.innerHTML = ``;

    main.appendChild(divUserPage);

}

export default UserPage;