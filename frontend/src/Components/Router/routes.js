import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import { GamePage } from '../Pages/GamePage';
import TutorielPage from '../Pages/TutorielPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/game': GamePage,
  '/tutoriel': TutorielPage,
};

export default routes;
