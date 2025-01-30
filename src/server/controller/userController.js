import { getUserByEmail } from '../model/User.js';

// 사용자 정보 조회 처리
export const getUserInfoByEmail = async (req, res) => {
  const { email } = req.body;  // 클라이언트에서 받은 이메일
  console.log('Received email:', email);  // 로그 출력

  try {
    const user = await getUserByEmail(email);
    
    if (user.length > 0) {
      res.json(user);  // 일치하는 사용자가 있으면 정보 반환
    } else {
      res.status(404).json({ message: 'User not found' });  // 사용자 없으면 404 반환
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });  // 서버 오류 시 500 반환
  }
};
