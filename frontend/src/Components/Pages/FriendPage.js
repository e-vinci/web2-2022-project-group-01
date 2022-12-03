import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const main = document.querySelector('main');

const FriendPage = () => {
  clearPage();
  displaySearch();
};

function displaySearch() {
  const userDiv = document.createElement('div');
  userDiv.id = 'divUsers';
  const searchDiv = document.createElement('div');
  searchDiv.id = 'searchDiv';
  searchDiv.innerHTML = `
    <input type="search" id="searchInput" class="form-control rounded search" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
    <br>
    <div id="friendButton">
        <button type="button" id="searchSubmit" class="btn btn-outline-primary buttonClass">search</button>
        <button type="button" id="friendAll" class="btn btn-outline-primary buttonClass">your friends</button>
    </div>
    `;
  main.appendChild(searchDiv);
  main.appendChild(userDiv);
  userDiv.style.display = 'none';
  const buttonSearch = document.querySelector('#searchSubmit');
  buttonSearch.addEventListener('click', displayUser);
  const buttonFriends = document.querySelector('#friendAll');
  buttonFriends.addEventListener('click',displayFriend)

}

async function search() {
  const input = document.querySelector('#searchInput').value;

  const response = await fetch(`${process.env.API_BASE_URL}/users/getUser?pseudo=${input}`);
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const users = await response.json();
  return users;
}

async function displayUser() {
  const users = await search();

  const allButton = document.querySelectorAll('#addSubmit');
  await userAsDiv(users)
  allButton.forEach((element) => {
    element.addEventListener('click', addFriend);
  });
}

async function displayFriend(){
    const friend=await getUserFriends();
    await userAsDiv(friend);
}

async function userAsDiv(users){
    const divUsers = document.querySelector('#divUsers');
    divUsers.style.display = '';

    let ligne = "<h1>USER</h1><br> <div id='gridContainer'>";
    const userFriends= await getUserFriends();
    if (users.length > 0) {
      users.forEach((element) => {
        ligne += `
          <div class="gridItem">
              <p><span>Name : </span> ${element.username}</p>
              <p><span>Level :</span> ${element.level}</p> 
              <p><span>Xp : </span>${element.xp}</p>
          `;
  
          // mettre a jour this user id
          if(!userFriends.some(e=>e.id_user===element.id_user) && element.id_user !== 2 ){
              ligne+=`
              <button type="submit" id="addSubmit" class="buttonClass Class btn btn-primary" data-id="${element.id_user}" >Add as friend</button>
              `
          }
          ligne+='</div>'
      });
  
    } else {
      ligne += ' <p> NO USER FOUND </p> ';
    }
    ligne += '</div>';
  
    divUsers.innerHTML = ligne;
}


async function addFriend(e) {
  e.preventDefault();
  const { id } = e.target.dataset;
  // a mettre a jour
  const user = 2;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      user1: user,
      user2: id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/addFriend`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    await response.json();
  Navigate('/');
}

async function getUserFriends(){
    // a mettre a jour
    const id=2;
    const response=await fetch(`${process.env.API_BASE_URL}/users/getUserFriends?id=${id}`);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    const userFriends=await response.json();
    return userFriends;

}



export default FriendPage;
