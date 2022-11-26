let typeGame;


const getTypeGame  = () => typeGame;

const setTypeGame = (game) => {    
    typeGame = game;
};

const isTypeGame = () => typeGame !== undefined;

const clearTypeGame = () => {
  typeGame = undefined;
};

export {getTypeGame, setTypeGame, isTypeGame, clearTypeGame};