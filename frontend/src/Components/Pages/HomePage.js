const HomePage = () => {
  const main = document.querySelector('main');
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

export default HomePage;
