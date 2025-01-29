import db from '../config/db.js';

export const getPostsByUserNumber = (usernumber, callback) => {
  const query = 'SELECT * FROM user_post WHERE usernumber = ?';
  db.query(query, [usernumber], (err, results) => {
    callback(err, results);
  });
};
