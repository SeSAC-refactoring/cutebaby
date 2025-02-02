import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// db에 넣는거
export const signupModel = (formData) => {
  console.log('model에서 확인',formData)
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO userInfo (userid,password, username,profile_picture) 
      VALUES (?, ?, ?, ?);
    `;
    db.query(query, [formData.email, formData.password, formData.name, 'basicUrl'], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

};
