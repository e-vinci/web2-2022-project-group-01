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

async function getUserInfo() {
  const pseudo = getAuthenticatedUser().username;

  const options = {
      headers: {
          Authorization: getAuthenticatedUser().token,
      },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/getUser?pseudo=${pseudo}`, options);
  console.log("ooooooooooooooooooooooooooooooooooooooo",response);

  if (!response.ok) {
      throw new Error(`readUsersScore:: fetch error : ${response.status} : ${response.statusText}`);
  }

  const userId = await response.json();
  console.log("ooooooooooooooooooooooooooooooooooooooo",userId[0]);
  return userId[0];

}


async function readBestUserScore(id) {
  if (!id) return undefined;

  try {
    const options = {
      headers: {
        Authorization: getAuthenticatedUser().token,
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/users/getBestUserScore?id=${id}`, options);
    

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

async function readAllUserScore(id) {
  if (!id) return undefined;

  try {
    const options = {
      headers: {
        Authorization: getAuthenticatedUser().token,
      },
    };

    const response = await fetch(`${process.env.API_BASE_URL}/users/getAllUserScore?id=${id}`, options);
    

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

export { readUsersScore, getUserInfo, readBestUserScore, readAllUserScore };
