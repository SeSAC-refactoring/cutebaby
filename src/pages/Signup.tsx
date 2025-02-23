import { useEffect } from "react";
import SignupForm from "../components/signup-page/SignupForm";
import { useNavigate } from "react-router-dom";

// import SignupForm from "../components/signup-page/SignupForm";
const Signup: React.FC = () => {
  // 로그인 되어있을 시 // 홈페이지로 리디렉션
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return <SignupForm />;
};
export default Signup;
