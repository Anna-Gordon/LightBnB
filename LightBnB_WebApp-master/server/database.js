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
  // let user;
  return pool.query(`SELECT * FROM users WHERE email = $1`, [email])
  .then(res => res.rows[0])
    // if (res.rows) {
      // user = res.rows[0];
      // return user;
    // } else {
    //   return user = null;
    // }
    // res.rows[0]
  // })
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
  return pool.query(`SELECT * FROM users WHERE id = $1`, [id])
  .then (res => res.rows[0])
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
  return pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
  .then(res => res.rows[0])
  .catch(err => {
    console.log('Error: ', err);
  })
}
/**
 * VALUE FOR TEST (TERMINAL)
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
  return pool.query(`SELECT reservations.*, properties.*, AVG(rating) as average_rating
              FROM reservations
                  JOIN properties ON properties.id = reservations.property_id
                  JOIN property_reviews ON property_reviews.property_id = reservations.property_id
                WHERE reservations.guest_id = $1
                GROUP BY reservations.id, properties.id, properties.title, cost_per_night
                ORDER BY start_date DESC
                LIMIT $2;`,
      [guest_id, limit]
    )
    .then(res => res.rows);

  // return getAllProperties(null, 2);
}
// 45 | Louis Washington | chloecarter@google.com | $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.

// console.log(getAllReservations(45, 2));
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

// return pool.query(`SELECT * FROM properties LIMIT $1`, [limit])
// .then(res => res.rows);
const getAllProperties = (options, limit = 10) => {
    // 1
    const queryParams = [];
    // 2
    let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
        JOIN property_reviews ON properties.id = property_id
        JOIN users ON users.id = owner_id
    `;
  
    // 3
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    } 

    if (options.owner_id) {
      queryParams.push(options.owner_id);
      queryString += ` AND owner_id = $${queryParams.length}`;
    }
    
    if (options.minimum_price_per_night) {
      queryParams.push(options.minimum_price_per_night);
      queryString += `AND cost_per_night >= $${queryParams.length} * 100`;
    }

    if (options.maximum_price_per_night) {
      queryParams.push(options.maximum_price_per_night);
      queryString += ` AND cost_per_night <= $${queryParams.length} * 100`;
    }

    if (options.minimum_rating) {
      queryParams.push(options.minimum_rating);
      queryString += ` AND rating >= $${queryParams.length}`;
    }
    

  
    // 4
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  
    // 5
    console.log('queryString', queryString, 'queryParams', queryParams);
  
    // 6
    return pool.query(queryString, queryParams)
    .then(res => {
      return res.rows
    })
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
