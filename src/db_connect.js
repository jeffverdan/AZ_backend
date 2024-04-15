const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bd_AZ_Capital',
  password: '2122',
  port: 5432,
});

module.exports = pool;
