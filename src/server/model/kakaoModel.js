import db from '../config/db.js';  // MySQL 연결 객체

//db쿼리문들 여기다가 적는거

// db에 넣는거
export const kakaoModel = (userData) => {
  console.log('model에서 확인',userData)
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO userInfo (userid,password, username,profile_picture) 
      VALUES (?, ?, ?, ?);
    `;
    db.query(query, [userData.id,"Kakaop@ssW0rd", userData.properties.nickname, userData.properties.profile_image], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

};
