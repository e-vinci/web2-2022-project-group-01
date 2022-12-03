import { clearPage } from '../../utils/render';

const main = document.querySelector("main");

const FriendPage = ( ) =>{
    clearPage();
    displaySearch();
    
}

function displaySearch() {
    const userDiv=document.createElement("div")
    userDiv.id="divUsers";
    const searchDiv=document.createElement("div");
    searchDiv.id="searchDiv"
    searchDiv.innerHTML=`
    <input type="search" id="searchInput" class="form-control rounded search" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
    <br>
    <button type="button" id="searchSubmit" class="btn btn-outline-primary buttonClass">search</button>
    `
    main.appendChild(searchDiv);
    main.appendChild(userDiv);
    userDiv.style.display='none';
    const button = document.querySelector("#searchSubmit")
    button.addEventListener("click",displayUser);
}

async function search(){
    const input = document.querySelector("#searchInput").value;

    const response=await fetch(`${process.env.API_BASE_URL}/users/getUser?pseudo=${input}`)
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const users= await response.json();
    return users;
}

async function displayUser(){
    const divUsers=document.querySelector("#divUsers");
    divUsers.style.display="";
    const users= await search();
    let ligne="<h1>USER</h1><br> <div id='gridContainer'>";
    if(users.length>0){
        users.forEach(element => {
        ligne+=`
        <div class="gridItem">
            <p><span>Name : </span> ${element.username}</p>
            <p><span>Level :</span> ${element.level}</p> 
            <p><span>Xp : </span>${element.xp}</p>
            <button type="submit" id="addSubmit" class="buttonClass Class btn btn-primary" data-id="${element.id_user}" >Add as friend</button>
        </div>
        `;
    }); 
    }else{
        ligne+=" <p> NO USER FOUND </p> "
    }
    ligne+='</div>'
    
    divUsers.innerHTML=ligne;

    const allButton = document.querySelectorAll( "#addSubmit");

    allButton.forEach(element=>{
        element.addEventListener("click",addFriend)
    })

}

async function addFriend(e){
    e.preventDefault();
    const {id}=e.target.dataset;
    console.log(id);
}


export default FriendPage;

