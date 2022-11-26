// eslint-disable-next-line import/newline-after-import
import { clearPage } from '../../utils/render';
const main = document.querySelector('main');

const TutorielPage = () => {
    clearPage();

    main.innerHTML = `
    <h1> Tutoriel </h1>`;

  };



  export default TutorielPage;