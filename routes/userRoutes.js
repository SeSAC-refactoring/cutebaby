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
import { babycreate } from '../controller/babycreate.js';
import { delgrow } from '../controller/delgrow.js';
import { delbaby } from '../controller/delbaby.js';

const router = express.Router();

// 이메일로 사용자 정보 조회
router.post('/user', getUserInfoByEmail);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  
  router.post("/babycreate", upload.single("picture"), babycreate);

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


// babyid를 기반으로 예방접종 데이터 가져오기
router.post('/vaccination', getVaccination);

export default router;
