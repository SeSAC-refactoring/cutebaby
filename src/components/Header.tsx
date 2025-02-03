import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div>로고</div>
      <div>
        <Link to="/Vaccination">예방접종</Link>
      </div>
      <div>
        <Link to="/GrowthDiary">성장기록</Link>
      </div>
      <div>
        <Link to="/Mypage">마이페이지</Link>
      </div>
      <div>
        {" "}
        <Link to="/Login">로그인</Link>
      </div>
      <div>
        {" "}
        <Link to="/Signup">회원가입</Link>
      </div>
    </>
  );
}
