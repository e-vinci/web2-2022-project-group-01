/* eslint-disable no-console */
const main = document.querySelector('main');


// eslint-disable-next-line no-unused-vars
function color() {
    if (main.style.backgroundColor > '#4B0B0B') {
      const border = document.querySelectorAll('.divBorder');
      console.log(border);
      border.forEach((element) => {
        console.log('ok');
        // eslint-disable-next-line no-param-reassign
        element.className = 'divBorderWhite';
      });
    }
  }