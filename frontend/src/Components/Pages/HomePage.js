const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = 'Deal with the content of your HomePage';
  // buttonsHomePage();
  
};
/** 
function buttonsHomePage(){
  const main = document.querySelector('main');
  const buttonQuickGame = document.createElement('button');
  buttonQuickGame.type = 'submit';
  buttonQuickGame.style = "width:60px; height:40px";

  const quickGame = `<button><a class="nav-link" href="#" data-uri="/game">Quick Game</a></button>`
  main.innerHTML = 'Deal with the content of your HomePage';
  const divButtonQuickGame = document.createElement('div');
  divButtonQuickGame.appendChild(buttonQuickGame);
  main.appendChild(divButtonQuickGame);
  buttonQuickGame.addEventListener('click', quickGame);
};
*/


export default HomePage;
