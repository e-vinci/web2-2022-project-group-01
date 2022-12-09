/* eslint-disable no-console */

import { getAuthenticatedUser } from '../utils/auths';

async function readUsersScore() {
  try {
    const options = {
      headers: {
        Authorization: getAuthenticatedUser().token,
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/users/getUsersScore`, options);
    

    if (!response.ok) {
      throw new Error(`readUsersScore:: fetch error : ${response.status} : ${response.statusText}`);
    }

    const usersScore = await response.json();
    return usersScore;
  } catch (err) {
    console.error('readUsersScore::error: ', err);
    throw err;
  }
}

async function readUsersLevel() {
  try {
    const options={
      headers: {
        Authorization: getAuthenticatedUser().token
      }
     }
     
    const response = await fetch(`${process.env.API_BASE_URL}/users/getLevelUser`,options);

    if (!response.ok) {
      throw new Error(`readUsersLevel:: fetch error : ${response.status} : ${response.statusText}`);
    }
   
    const userLevel= await response.json();
    return userLevel;
  } catch (err) {
    console.error('readUsersLevel::error: ', err);
    throw err;
  }
};


export { readUsersScore, readUsersLevel };
