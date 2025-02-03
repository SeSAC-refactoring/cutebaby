import React from 'react'
import { Link } from 'react-router-dom'

export default function Logout() {
    console.log('로그아웃하고싶다')
    sessionStorage.removeItem('user'); // 특정 세션 데이터 삭제
    // sessionStorage.clear(); // 모든 세션 데이터 삭제 (필요 시 사용)
    alert('로그아웃 되었습니다.');

    window.location.href = '/Login'; // 로그인 페이지로 이동

}
