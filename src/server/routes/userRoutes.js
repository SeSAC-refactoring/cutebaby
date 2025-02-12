import express from 'express';
import multer from "multer";
import { getUserInfoByEmail } from '../controller/userController.js';
import { signupCon } from '../controller/signupCon.js';
import { kakaoCon } from '../controller/kakaoCon.js';
import { emailCheck } from '../controller/emailCheck.js';
import { babyinfo } from '../controller/babyinfo.js';
import { babygrow } from '../controller/babygrow.js';
import { getVaccination } from '../controller/vaccinationController.js';
import { newgrow } from '../controller/newgrow.js';
import { babycreate, updateBaby } from '../controller/babycreate.js';
import { delgrow } from '../controller/delgrow.js';
import { delbaby } from '../controller/delbaby.js';
import { updategrow } from '../controller/updategrow.js';
import { newVac } from '../controller/newVac.js';
import { delVac } from '../controller/delVac.js';
import { updateVac } from '../controller/updateVac.js';
import { updateUser } from '../controller/updateUser.js';

const router = express.Router();


const storage = multer.memoryStorage(); // 🚀 메모리에서만 처리
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 제한 (5MB)
});

router.post("/babycreate", upload.single("picture"), babycreate);
// 이메일로 사용자 정보 조회
router.post('/user', getUserInfoByEmail);
// 이메일로 회원가입
router.post('/signup', signupCon);
router.post('/kakaosignup', kakaoCon);
router.post('/emailCheck', emailCheck);
router.post('/babyinfo', babyinfo);
router.post('/babygrow', babygrow);
router.post('/newgrow' , newgrow);
router.post('/delgrow',delgrow);
router.post('/babycreate',babycreate);
router.post('/delbaby', delbaby);
router.post('/updategrow', updategrow)
router.post('/updateBaby', upload.single("picture"), updateBaby)
router.post('/newVac', newVac)
router.post('/delVac', delVac)
router.post('/updateVac', updateVac)
router.post('/updateUser',updateUser)

// babyid를 기반으로 예방접종 데이터 가져오기
router.post('/vaccination', getVaccination);

export default router;
