import express from 'express';
import { getUserInfoByEmail } from '../controller/userController.js';

const router = express.Router();

// 이메일로 사용자 정보 조회
router.post('/user', getUserInfoByEmail);  

export default router;
