/* eslint-disable no-console */
const postgres=require('postgres');

const sql = postgres('postgres://hrucaptp:rI2ySfCwwBW49L5KHTrNjd3PFCZ6ss1U@peanut.db.elephantsql.com/hrucaptp', {

  port                 : 5432,          // Postgres server port[s]
  username             : 'hrucaptp',            // Username of database user
  password             : 'rI2ySfCwwBW49L5KHTrNjd3PFCZ6ss1U',            // Password of database user
  idle_timeout         : 20,
  max_lifetime         : 60 * 50
})





module.exports = sql;