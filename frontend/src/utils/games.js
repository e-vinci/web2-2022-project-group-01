const rankedGame = document.createElement('div');

const getRankedGame  = () => {

 rankedGame.innerHTML = `<a class="nav-link" href="#" data-uri="/game">Quick Game</a>`
 return rankedGame;
};

export default getRankedGame;