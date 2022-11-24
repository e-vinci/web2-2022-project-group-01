const db=require("./config_db");

module.exports.getUsers=()=> db.prepare("SELECT * FROM users ").all ()



