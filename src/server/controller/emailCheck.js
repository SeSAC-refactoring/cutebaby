import { getUserByEmail } from '../model/User.js';
// 사용자 정보 조회 처리
export const emailCheck = async (req, res) => {
  console.log(req.body)
  const { inputEmail } = req.body;  // 클라이언트에서 받은 이메일
  console.log('Received email:', inputEmail);  // 로그 출력
  
  try {
    const user = await getUserByEmail(inputEmail);
    console.log('user >>>' , user)
    if (user.length > 0) {
        res.status(0).json({ message: '이미 사용중인 아이디 입니다.' }); 


    } else {
      res.status(1).json({ message: '사용가능한 id입니다.' });  // 사용자 없으면 404 반환
    }
  } catch (err) {
    console.error(err);
    res.json({ message:'서버 오류입니다.' });  // 서버 오류 시 500 반환
  }
};
