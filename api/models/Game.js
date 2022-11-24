const db=require("./config_db");

module.exports.addGame=(user,score)=> {
    db.prepare("insert into games (user, score) values (?,?)").run(user,score);
}



