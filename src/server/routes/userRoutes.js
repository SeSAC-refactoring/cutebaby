import express from 'express';
import { getUserInfoByEmail } from '../controller/userController.js';
import { signupCon } from '../controller/signupCon.js';
import { kakaoCon } from '../controller/kakaoCon.js';
import { emailCheck } from '../controller/emailCheck.js';
import { babyinfo } from '../controller/babyinfo.js';
import { babygrow } from '../controller/babygrow.js';
import { getVaccination } from '../controller/vaccinationController.js';
import { newgrow } from '../controller/newgrow.js';

const router = express.Router();

// 이메일로 사용자 정보 조회
router.post('/user', getUserInfoByEmail);
// 이메일로 회원가입
router.post('/signup', signupCon);
router.post('/kakaosignup', kakaoCon);
router.post('/emailCheck', emailCheck);
router.post('/babyinfo', babyinfo);
router.post('/babygrow', babygrow);
router.post('/newgrow' , newgrow)

// babyid를 기반으로 예방접종 데이터 가져오기
router.post('/vaccination', getVaccination);

export default router;
