import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// db에 넣는거
export const updateuserModel = (data) => {
  console.log('update model에서 확인',data)

  
  return new Promise((resolve, reject) => {
    const query = `
    UPDATE userinfo SET userid= ? ,username=? WHERE usernumber=?
    `;
    db.query(query, [data.email, data.username, data.usernumber], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

};
