import { Link } from "react-router-dom";
import { getKakaoLoginUrl } from "../services/kakaoService";
import layout from "../styles/commons/Layout.module.scss";
import typography from "../styles/commons/Typography.module.scss";
import button from "../styles/commons/Button.module.scss";
import styles from "../styles/SelectLogin.module.scss";
import { useState } from "react";

// props로 데이터 받아서 회원가입, 로그인 구분
// <div className={styles.title}>{Email? "이메일" : "회원가입"}</div>

export default function SelectLogin() {
  const [selectSignup , setSelect] = useState<boolean>(false)
  const signup =()=>{
    if(!selectSignup){
    setSelect(true)}
    else if (selectSignup){
      setSelect(false)
    }
  }
  return (
    <div className={layout.container}>
      <div className={[layout.contentsArea, styles.contentsArea].join(" ")}>
        <div className={[layout.titleArea, typography.text4xlBd].join(" ")}>
          {!selectSignup?'로그인':'회원가입'}
        </div>
        <div className={layout.contentsWrap}>
          <img
            className={styles.login_img}
            src="/img/visuals/visual_login_ggomul_01_.svg"
          />
          
          <div className={`${layout.buttonArea} ${styles.buttonArea}`}>
            {!selectSignup?<Link to="/Login">
              <button
                className={`${button.btnXlGr} ${typography.textXlBd}`}
              >
                <img src="/img/icons/i-mail-s32.svg"></img>
                이메일로 로그인하기
              </button>
            </Link> : <Link to="/Signup">
              <button
                className={`${button.btnXlGr} ${typography.textXlBd}`}
              >
                <img src="/img/icons/i-mail-s32.svg"></img>
                이메일로 회원가입하기
              </button>
            </Link>}
            
            <a
              href={getKakaoLoginUrl()}
              style={{ textDecorationLine: "none" }}
            >
              <button
                className={`${button.btnXlKyw} ${typography.textXlBd}`}
              >
                <img src="/img/icons/i-kakaotalk-s32.svg"></img>
                {!selectSignup?'카카오톡으로 로그인하기':'카카오톡으로 회원가입하기'}
                </button>
            </a>
          </div>

          <div
            className={[styles.link_container, typography.textSmRg].join(" ")}
          >
            <div>{!selectSignup?'가입하지 않으셨나요?':'계정이 있으신가요?'}</div>
            <div onClick={signup}className={[styles.link, typography.textSmMd].join(" ")}>
              {/* <Link to="/Signup">회원가입하기</Link> */}
              {!selectSignup?'회원가입하기':'로그인하기'}

            </div>
        
          </div>
        </div>
      </div>
    </div>
  );
}
