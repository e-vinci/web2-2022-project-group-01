const HomePage = () => {
  const main = document.querySelector('main');
  
  // buttonsHomePage();
  
  const div = document.createElement("div");
  const div2 = document.createElement("div");

  div.id = 'divHome'
  div.innerHTML = `       
  <button type="submit" class="buttonClass Class btn btn-primary  ">
  Partie Classées
  </button> `
  main.appendChild(div);
  
  div2.id = 'divHome2'
  div2.innerHTML = `<button type="submit" class="buttonClass Class btn btn-primary  ">
  Partie rapide
  </button> `
  main.appendChild(div2);

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
