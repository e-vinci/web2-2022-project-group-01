/* eslint-disable no-unreachable */
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



export default readUsersScore;
