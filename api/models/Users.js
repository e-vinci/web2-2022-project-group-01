/* eslint-disable camelcase */
const db=require("./config_db");


// pas obliger de mettre le level et xp vu qu'il commencera forcement au niv1 0xp
module.exports.addUser = (username, password) => {
db.prepare('INSERT INTO users(username, password, level, xp) VALUES (?,?,1,0)').run(username,password);
}

module.exports.getUser = (userName) => db.prepare("SELECT * FROM users where username=(?)").get(userName);




module.exports.searchUser=(userName)=> {
    const test = db.prepare("SELECT * FROM users where username LIKE (?)")
    return test.all(`%${  userName.toLowerCase()  }%`)
}

module.exports.getUserFriends=(id_user)=> 
db.prepare("Select * from friends where users1=(?) Or users2=(?)").all(id_user,id_user);

module.exports.isFriend=(id_user1,id_user2)=> {
    const result = db.prepare("select count(*) AS total from friends where (users1=(?) AND users2=(?)) OR (users1=(?) AND users2=(?))").all(id_user1,id_user2,id_user2,id_user1);
   
    const number=result[0].total;
   
    return number!==0;
}

module.exports.addFriend=(id_user1,id_user2)=> 
db.prepare("insert into friends (users1, users2) values (?,?)").run(id_user1,id_user2);



