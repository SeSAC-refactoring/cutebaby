# 디지털 아기 수첩, 꼬물꼬물

<img width="260" alt="스크린샷 2025-02-19 오후 3 49 14" align="right" src="https://github.com/user-attachments/assets/381e6271-a795-42de-8177-7ec4017ff051" />

### **아기수첩,** 알고계신가요?

신생아들은 태어나면서 아기수첩을 받습니다.

아기수첩에 예방접종 기록을 작성하고, 아기의 **키와 몸무게 등 성장과 관련된 수치**를 기입합니다.

이것은 모두 **수기**로 작성되는데, 아기수첩에 있는 **소중한 기록들이 분실/훼손**의 위험성이 높습니다.

## 목차

- 개요
- 팀원소개
- 사용기술
- 주요기능
- 트러블 슈팅
- 개선 목표

## 개요

- 프로젝트 이름 : 꼬물꼬물
- 프로젝트 기간 : 2025.01.25 ~ 2025.02.17
- 프로젝트 기획 목적 : 아기의 첫시작이 담긴 아기수첩, 데이터의 디지털화를 통해 안전하게 보관하고
  누적된 데이터를 보기쉽게 시각화하여 아기기록을 쉽게 관리한다.

## 팀원소개

<div align=center>
<img width="836" alt="스크린샷 2025-02-19 오후 4 02 49" src="https://github.com/user-attachments/assets/3d377d25-811a-444b-948c-1c40c159fd12" />
</div>

## 사용기술

<div align=center>
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
</div>

<div align=center>
<img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white">
<img src="https://img.shields.io/badge/Mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white">
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

</div>
<div align=center>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white">

</div>

## 주요기능

### [초기화면_로그인 이전]

- 서비스 접속 시 초기화면으로 로그인이 진행되어있지 않으면 "방문자님, 안녕하세요" 문구가 출력 되며
  상단 헤더 탭에 홈, 로그인 탭만 출력하게 됩니다.
  <img width="1076" alt="스크린샷 2025-02-19 오후 4 38 06" src="https://github.com/user-attachments/assets/14a4fa6a-9ff8-4d44-a475-d3f7b36e8d9d" />

- 우측 채팅창은 구글ai와 채팅할 수 있는 영역으로, ai에게 질문하는 용도로 구현했습니다.
  <div align=center>
    <img height="500" src="https://github.com/user-attachments/assets/b6e51577-a659-44f9-9651-36452b358de4">
</div>

- 로그인은 mysql과 연동하여 로그인이 진행되게 구현했습니다. 일반 로그인 및 카카오 로그인 성공시 홈화면으로 이동되게 됩니다.
- 회원가입시 유효성 검사와 이메일 이메일 중복체크를 진행하며, 모두 완료되어야 완료버튼이 활성화 됩니다.
<div align=center>

| 로그인 | 카카오 로그인 | 회원가입 |
|------| ----------| --------|
| 로그인 화면 gif | 카카오 로그인 gif | 회원가입 gif |
</div>

### [초기화면_로그인 이후]
### [예방접종 페이지]
### [성장일지 페이지]
### [마이페이지]

## 트러블슈팅
## 개선목표
