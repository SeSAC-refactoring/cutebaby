export default function Logout() {
    // sessionStorage.removeItem('user'); // 특정 세션 데이터 삭제
    sessionStorage.clear(); // 모든 세션 데이터 삭제 (필요 시 사용)
    localStorage.clear();
    alert('로그아웃 되었습니다.');

    window.location.href = '/SelectLogin'; // 로그인 페이지로 이동
}
