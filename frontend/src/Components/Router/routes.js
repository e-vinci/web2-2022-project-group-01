import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import { GamePage } from '../Pages/GamePage';
import TutorielPage from '../Pages/TutorielPage';
import TrollGamePage from '../Pages/TrollGamePage';
import FriendPage from '../Pages/FriendPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/game': GamePage,
  '/tutoriel': TutorielPage,
  '/troll': TrollGamePage,
  '/friend': FriendPage,
};

export default routes;
