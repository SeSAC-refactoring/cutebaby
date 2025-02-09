import { delgrowModel } from "../model/delgrowModel.js";

// 사용자 정보 조회 처리
export const delgrow = async (req, res) => {
    const { growId } = req.body; // 클라이언트에서 받은 이메일
    console.log(req.body);
    console.log('delgrowModel > Received email:', growId); // 로그 출력

    try {
        const targetid = await delgrowModel(growId);
        console.log('babyinfo에 baby 내용 >>>', targetid);
       
        res.status(201).json({
            success: true,
            message: "성장 정보가 삭제되었습니다.",
            data: targetid,
        }); 
        
    } catch (err) {
        console.error(err);
    }
};
