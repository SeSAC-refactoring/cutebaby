import { useEffect, useState } from 'react';
import styles from '../styles/Signup.module.scss';

export default function Signup() {
  //입력값 상태 관리
  const [inputEmail , setInputEmail] = useState<string>(''); //입력한 이메일
  const [inputPassword , setInputPassword] = useState<string>(''); // 입력한 비밀번호
  const [checkPassword, setcheckPassword] = useState<string>(''); // 한번더 입력한 비밀번호
  const [inputname, setName] = useState<string>(''); //입력한 이름
  const [inputBaby , setinputBaby] = useState<string>(''); //입력한 아기 이름
  const [babyBirtDay, setbabyBirthday] = useState<string>(''); // 입력한 아기 생일

  const [emailMessage , setemailMessage] = useState<string>('');
  const [passwordMessage , setpasswordMessage] = useState<string>('');
  const [rePassMessage , setrePassMessage] = useState<string>('');
  const [nameMessage, setNameMessage] = useState<string>('');
  const [babyMessage, setBabyMessage] = useState<string>('');


  //아이디 유효성검사
  useEffect(()=>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!inputEmail.trim()){
      setemailMessage('')
    }
    else if(!regex.test(inputEmail)){
      setemailMessage('이메일 형식에 맞게 입력해 주세요!')
    }else{
      setemailMessage('사용가능한 아이디입니다!')
    }
    
  },[inputEmail])

  //비밀번호 유효성 검사
  useEffect(()=>{
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if(!inputPassword.trim()){
      setpasswordMessage('')
    }
    else if(!regex.test(inputPassword)){
      setpasswordMessage('숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!')
    }else{
      setpasswordMessage('사용가능한 비밀번호입니다!')
    }
    //비밀번호 한번더
    if(!checkPassword.trim()){
      setrePassMessage('')
    }
    else if(!regex.test(checkPassword)){
      setrePassMessage('숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!')
    }
    else if(checkPassword !== inputPassword){
      setrePassMessage('비밀번호가 일치하지않습니다.')
    }else{
      setrePassMessage('비밀번호가 일치합니다.')
    }
  },[inputPassword,checkPassword])

  useEffect(()=>{
     if(!inputname.trim()){
      setNameMessage('')

     }
    else if(inputname.length <2){
      setNameMessage('이름은 2글자 이상으로 입력해주세요!')
    }else{
      setNameMessage('사용가능한 닉네임입니다.')

    }
  },[inputname])

  //입력받은 이메일 값 세팅
  const setEmail = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputEmail(e.target.value)
  }
  //입력받은 비밀번호 값 세팅
  const setPassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputPassword(e.target.value)
  }
  //한번더 입력받은 비밀번호 값 세팅
  const setCheck = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setcheckPassword(e.target.value)
  }
  //입력받은 이름 값 세팅
  const setUserName = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value)
  }
  const setBabyName = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setinputBaby(e.target.value)
  }


  const infoSubmit = (e: React.FormEvent)=>{
    e.preventDefault(); // 페이지 전체 새로고침되는거 막는거



  
   

  }
  return (
    <>
    <form onSubmit={infoSubmit}>
      <div className={styles.background}>
        <div className={styles.title}>회원가입</div>
        <div className={styles.gray_box}>1. 보호자님 정보를 적어주세요.</div>
        <div className={styles.input_set}>
          <div className={styles.a}>이메일 *</div>
          <input className={styles.input}type='email' value={inputEmail} onChange={setEmail}></input>
          {emailMessage?<p>{emailMessage}</p>:''}
        </div>
        <div className={styles.input_set}>
          <div className={styles.a} >비밀번호 *</div>
          <input className={styles.input} type='password' value={inputPassword} onChange={setPassword}></input>
          {passwordMessage?<p>{passwordMessage}</p>:''}
        </div>
        <div className={styles.input_set}>
          <div className={styles.a}>비밀번호 확인 *</div>
          <input className={styles.input} type='password' value={checkPassword} onChange={setCheck}></input>
          {rePassMessage?<p>{rePassMessage}</p>:''}
        </div>
        <div className={styles.input_set}>
          <div className={styles.a}>이름 *</div>
          <input className={styles.input} type='text' value={inputname} onChange={setUserName}></input>
          {nameMessage?<p>{nameMessage}</p>:''}
        </div>
        <div className={styles.gray_box}>2. 아기의 정보를 적어주세요.</div>
        <div className={styles.input_set}>
          <div className={styles.a}>이름 *</div>
          <input className={styles.input} type='text' value={inputBaby} onChange={setBabyName}></input>
          {babyMessage?<p>{babyMessage}</p>:''}
        </div>
        <div className={styles.input_set}>
          <div className={styles.a}>생년월일 *</div>
          <input className={styles.input} type='date'></input>
        </div>
        <div className={styles.gray_text}>
          이미 접종한 회차를 모두 체크해주세요.
        </div>
        <div className={styles.checkBox}>
          <div className={styles.checkBox_row}>
            <div className={styles.checkBox_unit}>예방 접종명</div>
            <div className={styles.checkBox_unit}>백신명</div>
            <div className={styles.checkBox_unit}>횟수</div>
          </div>
        </div>
        <button className={styles.button} type='submit'>완료</button>
      </div>
      </form>
    </>
  );
}
