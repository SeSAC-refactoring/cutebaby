import express from 'express';
import { getUserInfoByEmail } from '../controller/userController.js';
import { signupCon } from '../controller/signupCon.js';


const router = express.Router();

// 이메일로 사용자 정보 조회
router.post('/user', getUserInfoByEmail);  
// 이메일로 회원가입
router.post('/signup' , signupCon);

export default router;
