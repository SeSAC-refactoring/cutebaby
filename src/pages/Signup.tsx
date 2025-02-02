import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Signup.module.scss';
import axios,{AxiosError} from 'axios';


 const  Signup:React.FC=()=> {
  // 입력값 상태
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    babyName: '',
    babyBirthday: '',
  });

  // 메시지 상태
  const [messages, setMessages] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    babyName: '',
  });

  const inputRef = useRef({
    email: null as HTMLInputElement | null,
    password: null as HTMLInputElement | null,
    checkPassword: null as HTMLInputElement | null,
    name: null as HTMLInputElement | null,
    babyName: null as HTMLInputElement | null,
  });

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 이메일 유효성 검사
  useEffect(() => {
    if (!formData.email.trim()) return setMessages(prev => ({ ...prev, email: '' }));
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setMessages(prev => ({
      ...prev,
      email: emailRegex.test(formData.email) ? '사용가능한 아이디입니다!' : '이메일 형식에 맞게 입력해 주세요!',
    }));
  }, [formData.email]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (!formData.password.trim()) return setMessages(prev => ({ ...prev, password: '' }));
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    setMessages(prev => ({
      ...prev,
      password: passwordRegex.test(formData.password)
        ? '사용가능한 비밀번호입니다!'
        : '숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요!',
    }));
  }, [formData.password]);

  // 비밀번호 확인 검사
  useEffect(() => {
    if (!formData.confirmPassword.trim()) return setMessages(prev => ({ ...prev, confirmPassword: '' }));
    setMessages(prev => ({
      ...prev,
      confirmPassword:
        formData.password === formData.confirmPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.',
    }));
  }, [formData.confirmPassword, formData.password]);

  // 이름 유효성 검사
  useEffect(() => {
    if (!formData.name.trim()) return setMessages(prev => ({ ...prev, name: '' }));
    setMessages(prev => ({
      ...prev,
      name: formData.name.length >= 2 ? '사용가능한 닉네임입니다.' : '이름은 2글자 이상 입력해주세요!',
    }));
  }, [formData.name]);

  //입력한값에 빈값이 있는지 검사
  const emptyCheck = ()=>{
    if (!formData.email.trim()) {
      setMessages(prev => ({ ...prev, email: '이메일을 입력해 주세요!' }));
      inputRef.current.email?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current.email?.focus();
      return false;
    }else if(!formData.password.trim()){
      setMessages(prev => ({ ...prev, password: '비밀번호를 입력해 주세요!' }));
      inputRef.current.password?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current.password?.focus();
      return false;

    }else if(!formData.confirmPassword.trim()){
      setMessages(prev => ({ ...prev, confirmPassword: '비밀번호를 한번더 입력해 주세요!' }));
      inputRef.current.checkPassword?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current.checkPassword?.focus();
      return false;

    }else if(!formData.name.trim()){
      setMessages(prev => ({ ...prev, name: '이름을 입력해 주세요!' }));
      inputRef.current.name?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current.name?.focus();
      return false;
    }else return true;

  }

  // 폼 제출 핸들러
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    //여기서부터 db연결
    if(emptyCheck()){
      try {
        const response = await axios.post('http://localhost:5001/api/signup', { formData });
        console.log('response >>' , response)
        if (response.data.success) {
          console.log("회원가입 성공:", response.data.message);
          alert("회원가입이 완료되었습니다!");
        } else {
          console.log("회원가입 실패:", response.data.message);
          alert(response.data.message);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            alert("이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.");
            inputRef.current.email?.scrollIntoView({ behavior: 'smooth' });
            inputRef.current.email?.focus();
          } else {
            console.error("회원가입 중 오류 발생:", error.response?.data);
            alert("서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.");
          }
        } else {
          console.error("알 수 없는 오류 발생:", error);
          alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
  };

}

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.background}>
        <h2 className={styles.title}>회원가입</h2>

        
          <h3 className={styles.gray_box}>1. 보호자님 정보를 적어주세요.</h3>

          <div className={styles.input_set}>
            <label className={styles.a}>이메일 *</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              ref={(el) => { inputRef.current.email = el; }}/>
            {messages.email && <p>{messages.email}</p>}
          </div>

          <div className={styles.input_set}>
            <label className={styles.a}>비밀번호 *</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              ref={(el) => { inputRef.current.password = el; }}
            />
            {messages.password && <p>{messages.password}</p>}
          </div>

          <div className={styles.input_set}>
            <label className={styles.a}>비밀번호 확인 *</label>
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              ref={(el) => { inputRef.current.checkPassword = el; }}
            />
            {messages.confirmPassword && <p>{messages.confirmPassword}</p>}
          </div>

          <div className={styles.input_set}>
            <label className={styles.a}>이름 *</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              ref={(el) => { inputRef.current.name = el; }}
            />
            {messages.name && <p>{messages.name}</p>}
          </div>

          <h3 className={styles.gray_box}>2. 아기의 정보를 적어주세요.</h3>

          <div className={styles.input_set}>
            <label className={styles.a}>이름 *</label>
            <input
              className={styles.input}
              type="text"
              name="babyName"
              value={formData.babyName}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.input_set}>
            <label className={styles.a}>생년월일 *</label>
            <input className={styles.input} type="date" name="babyBirthday" onChange={handleInputChange} />
          </div>

          <p className={styles.gray_text}>이미 접종한 회차를 모두 체크해주세요.</p>
          <div className={styles.checkBox}>
            <div className={styles.checkBox_row}>
              <div className={styles.checkBox_unit}>예방 접종명</div>
              <div className={styles.checkBox_unit}>백신명</div>
              <div className={styles.checkBox_unit}>횟수</div>
            </div>
          </div>

        <button className={styles.button} type="submit">
          완료
        </button>
      </div>
    </form>
  );
}

export default Signup;
