import { kakaoModel } from "../model/kakaoModel.js";
import { getUserByEmail } from "../model/User.js";


export const kakaoCon = async (req, res) => {
  const { userData } = req.body;  // 클라이언트에서 받은 formData (이메일, 비밀번호 등)
  console.log("Received request body:", req.body); // 요청 데이터 확인

  try {
    // 1. 이메일 중복 검사

    const email = userData.id
    console.log('컨트롤러에서 이메일 >>',userData.id)
    const user = await getUserByEmail(email);
    console.log('컨트롤러에서 user >>',user)
    // if (user.length > 0) {
    //   // 이메일이 이미 존재하면 중복 이메일 처리
    //   return res.status(409).json({
    //     success: false,
    //     message: "이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.",
    //   });
    // }

    // 2. 이메일이 중복되지 않으면 사용자 정보 삽입
    const newUser = await kakaoModel(userData);

    // 회원가입 성공 시
    res.json({
      success: true,
      message: "회원가입이 완료되었습니다.",
    });
  } catch (err) {
    console.error("회원가입 오류:", err);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다. 다시 시도해주세요.",
    });
  }
};
