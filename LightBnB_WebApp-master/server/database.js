const properties = require('./json/properties.json');
const users = require('./json/users.json');

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

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = (email) => {
  let user;
  pool.query(`SELECT * FROM users WHERE email = $1`, [email.toLowerCase()])
  .then(res => {
    if (res.rows) {
      user = res.rows;
      return user;
    } else {
      return user = null;
    }
  })
  .catch(err => {
    console.log('Error message: ', err);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  let user;
  pool.query(`SELECT * FROM users WHERE id = $1`, [id])
  .then (res => {
    if (res.rows) {
    user = res.rows;
    return user;
  } else {
    return user = null;
  }
})
  .catch(err => {
    console.log('Error message: ', err);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = (user) => {
  pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, values)
  .then(res => {
    user = res.rows;
    return user;
  })
  .catch(err => {
    console.log('Error: ', err);
  })
}
/**
 let values = ['philen', 'philen@comcast.net', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'];
 console.log(addUser(values));
 */
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  return pool.query(`SELECT * FROM properties LIMIT $1`, [limit])
  .then(res => res.rows);
  // const limitedProperties = {};
  // for (let i = 1; i <= limit; i++) {
  //   limitedProperties[i] = properties[i];
  // }
  // return Promise.resolve(limitedProperties);
}
exports.getAllProperties = getAllProperties;




/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
