const db=require("./config_db");

module.exports.addGame= async(user,score)=> {
    await db `insert into games (user_id, score) values (${user},${score})`
}



