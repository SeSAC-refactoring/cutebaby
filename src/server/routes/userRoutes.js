import express from 'express';
import { getUserInfo } from '../controllers/userController.js';

const router = express.Router();

router.post('/getUser', getUserInfo);

export default router;
