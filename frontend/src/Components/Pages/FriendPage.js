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
    let ligne="<h1>USER</h1><br>";
    if(users.length>0){
        users.forEach(element => {
        ligne+=`<p>${element.username}</p> <br>`;
    }); 
    }else{
        ligne+=" NO USER FOUND"
    }
  
   

    
    divUsers.innerHTML=ligne;

}



export default FriendPage;

