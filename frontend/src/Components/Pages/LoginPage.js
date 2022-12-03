/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import $ from "jquery";
import { getRememberMe, setAuthenticatedUser, setRememberMe } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
  clearPage();
  renderPageTitle('Login');
  renderRegisterForm();
};

function renderRegisterForm() {
  const main = document.querySelector('main');
// eslint-disable-next-line spaced-comment
/***************************************************************************************
*    Author: Nothing4us
*    Availability: https://codepen.io/nothing4us/pen/vYrpOya
*
************************************************************************************** */
  main.innerHTML=`
  <div class="pen-title">
  
  </div>
  <div class="rerun"><a href="">Reload</a></div>
  <div class="container">
    <div class="card"></div>
    <div class="card">
      <h1 class="title">Login</h1>
      <form>
        <div class="input-container">
          <input type="#{type}" id="#{label}" required="required"/>
          <label for="#{label}">Username</label>
          <div class="bar"></div>
        </div>
        <div class="input-container">
          <input type="#{type}" id="#{label}" required="required"/>
          <label for="#{label}">Password</label>
          <div class="bar"></div>
        </div>
        <div class="button-container">
          <button><span>Go</span></button>
        </div>
        <div class="footer"><a href="#">Forgot your password?</a></div>
      </form>
    </div>
    <div class="card alt">
      <div class="toggle"></div>
      <h1 class="title">Register
        <div class="close"></div>
      </h1>
      <form>
        <div class="input-container">
          <input type="#{type}" id="#{label}" required="required"/>
          <label for="#{label}">Username</label>
          <div class="bar"></div>
        </div>
        <div class="input-container">
          <input type="#{type}" id="#{label}" required="required"/>
          <label for="#{label}">Password</label>
          <div class="bar"></div>
        </div>
        <div class="input-container">
          <input type="#{type}" id="#{label}" required="required"/>
          <label for="#{label}">Repeat Password</label>
          <div class="bar"></div>
        </div>
        <div class="button-container">
          <button><span>Next</span></button>
        </div>
      </form>
    </div>
  </div>
  
  `
  $('.toggle').on('click', () => {
    $('.container').stop().addClass('active');
  });
  
  $('.close').on('click', () => {
    $('.container').stop().removeClass('active');
  });
}

function onCheckboxClicked(e) {
  setRememberMe(e.target.checked);
}

async function onLogin(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}

export default LoginPage;
