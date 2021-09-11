//import PG
const pg = require('pg');

//POOL config
const config = {
  database: 'd56bv3nklm0p8r', 
  host: 'ec2-107-20-153-39.compute-1.amazonaws.com', 
  port: 5432, 
  max: 5, 
  idleTimeoutMillis: 30000 
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("connected to postgres");
});

pool.on("error", (err) => {
  console.log("error connecting to postgres", err);
});

module.exports = pool;