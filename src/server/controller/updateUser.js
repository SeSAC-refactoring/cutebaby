
import { updateuserModel } from "../model/updateuserModel.js";

// 사용자 정보 조회 처리
export const updateUser = async (req, res) => {
        console.log(req.body)
    try {
        const { email , username ,usernumber} = req.body; // 클라이언트에서 받은 이메일
        console.log(req.body);
        
        const updateuser = await updateuserModel({
          email,
          username,
          usernumber
        });
        res.status(201).json({
            success: true,
            message: "유저 정보가 성공적으로 수정되었습니다.",
            data: updateuser,
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "서버 오류 발생" });
    
    }
   
    // try {
    //     if (baby.length > 0) {
    //         res.json(baby);
    //         // sessionStorage.setItem("babyid", JSON.stringify(babyids));
    //     } else {
    //         res.json(babyFalse); // 사용자 없으면 404 반환
    //     }
    // } catch (err) {
    //     console.error(err);
    // }
};
