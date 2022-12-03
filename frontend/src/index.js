import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import Navbar from './Components/Navbar/Navbar';
import Router from './Components/Router/Router';
import backgroundAnimation from './utils/background';

// const main = document.querySelector('main');
// main.style.backgroundColor='#000000'

Navbar();
backgroundAnimation();
Router();
