/* eslint-disable camelcase */
const db = require('./config_db');

// pas obliger de mettre le level et xp vu qu'il commencera forcement au niv1 0xp
module.exports.addUser = async (username, password) => {
  await db`INSERT INTO users(username, password, level, xp) VALUES (${username},${password},1,0)`;
};

module.exports.getUser = async (userName) => {
  const user = await db`SELECT * FROM users where username=${userName}`;
  return user.at(0);
};

module.exports.searchUser = async (userName) => {
  // eslint-disable-next-line prefer-template
  const users = await db`SELECT * FROM users where username LIKE ${'%' + userName + '%'}`;
  return users
};

module.exports.getUserFriends = async (id_user) => {
  const friends = await db`Select u.* from friends f , users u where (users1=${id_user} and f.users2 = u.id_user) Or (users2=${id_user} and  f.users1 = u.id_user)`;
  return friends 
};

module.exports.isFriend = async (id_user1, id_user2) => {
  const result = await db` select count(*) AS total from friends where (users1=(${id_user1}) AND users2=(${id_user2})) OR (users1=(${id_user2}) AND users2=(${id_user1}))`;
  const number = parseInt(result[0].total, 10);

  return number !== 0 

};

module.exports.addFriend = async (id_user1, id_user2) => {
  await db`insert into friends (users1, users2) values (${id_user1},${id_user2})`;
}

module.exports.getUsersScore = async () => {
  const result = await db`select u.username, g.score as best_score from users u, games g where u.id_user = g.user_id order by g.score desc limit 10`;
  return result;

}

module.exports.getUserIdScore= async (id, allGame) => {
  let result = null;
  if (allGame === false){
    result = await db`select g.score as best_score, u.xp from users u, games g where u.id_user = g.user_id and u.id_user = ${id} order by g.score desc limit 3`;
  }else{
     result = await db`select g.score as best_score, u.xp from users u, games g where u.id_user = g.user_id and u.id_user = ${id} `;
  }

  return result;

}

