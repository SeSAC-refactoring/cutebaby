// import db from '../config/db.js';  // MySQL 연결 객체

// //db쿼리문들 여기다가 적는거

// // db에 넣는거
// export const updatebabyModel = (data) => {
//   console.log('update model에서 확인',data)

  
//   return new Promise((resolve, reject) => {
//     if(data)
//     const query = `
//     UPDATE babyinfo SET babyname= ? ,birthday=?,gender=?, picture=? WHERE babyid=?
//     `;
//     db.query(query, [data.babyname,data.birthday,data.gender, data.picture, data.babyid], (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     });
//   });

// };
