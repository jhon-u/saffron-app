const db = require("../../configs/db.config")

const getFavourites = () => {
  return db.query('SELECT * FROM favourites;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFavourites };