import db from '../config/db.js';

export const getUserById = (userid, callback) => {
  const query = 'SELECT usernumber FROM userinfo WHERE userid = ?';
  db.query(query, [userid], (err, result) => {
    callback(err, result);
  });
};
