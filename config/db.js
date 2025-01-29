import mysql from 'mysql2';

const db = mysql.createConnection({
  host: '219.251.60.108',
  user: 'sesacUser',
  password: 'keroro2424.',
  database: 'sesacproject',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
    return;
  }
  console.log('MySQL 에 드뎌!!!!');
});

export default db;
