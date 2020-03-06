const { Pool } = require('pg');


const options = {
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  port: 5432,
  database: 'lightbnb'
};

const pool = new Pool(options);
pool.connect(err => {
  if(err) {
    console.log(err);
  } else {
    console.log('DB connected');
  }
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}