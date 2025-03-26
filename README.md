# <img height="50" src="https://github.com/user-attachments/assets/f8996eec-246d-44d8-acb9-182b095929e7"> 디지털 아기 수첩, 꼬물꼬물

### **아기수첩,** 알고계신가요? <img width="260" alt="스크린샷 2025-02-19 오후 3 49 14" align="right" src="https://github.com/user-attachments/assets/381e6271-a795-42de-8177-7ec4017ff051" />

신생아들은 태어나면서 아기수첩을 받습니다. <br/>
아기수첩에 예방접종 기록을 작성하고, 아기의 **키와 몸무게 등 성장과 관련된 수치**를 기입합니다. <br/>
이것은 모두 **수기**로 작성되는데, 아기수첩에 있는 **소중한 기록들이 분실/훼손**의 위험성이 높습니다. <br/>
<br/>

## 목차

- 개요
- 팀원소개
- 사용기술
- 주요기능
- 트러블 슈팅

## 개요

- 프로젝트 이름 : 꼬물꼬물
- 프로젝트 기간 : 2025.01.25 ~ 2025.02.17
- 팀프로젝트 : 디자인+퍼블리싱(2명), 프론트엔드+백엔드(2명)
- 프로젝트 기획 목적 : 아기의 첫시작이 담긴 아기수첩, **데이터의 디지털화를 통해 안전하게 보관** 하고
  누적된 데이터를 보기쉽게 **시각화**하여 **아기기록을 쉽게 관리**한다.
  <br/>

## 팀원소개

<div align=center>
  <img width="836" alt="스크린샷 2025-02-19 오후 4 02 49" src="https://github.com/user-attachments/assets/3d377d25-811a-444b-948c-1c40c159fd12" />
</div>
<br/>

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
    <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

</div>
<br/>

## 주요기능

### [초기화면]

- 서비스 접속 시 초기화면으로 로그인이 진행되어있지 않으면 "방문자님, 안녕하세요" 문구가 출력 되며
  상단 헤더 탭에 홈, 로그인 탭만 출력하게 됩니다.
  <img width="1076" alt="스크린샷 2025-02-19 오후 4 38 06" src="https://github.com/user-attachments/assets/14a4fa6a-9ff8-4d44-a475-d3f7b36e8d9d" />

- 우측 채팅창은 구글ai와 채팅할 수 있는 영역으로, ai에게 질문하는 용도로 구현했습니다.

  <div align=center>
    <img height="500" src="https://github.com/user-attachments/assets/b6e51577-a659-44f9-9651-36452b358de4">
</div>



- 로그인 회원가입 페이지 모두 **반응형**으로 제작하여 다양한 기기에 최적화 하였습니다.
  
<div align=center>

![로그인 회원가입반응형](https://github.com/user-attachments/assets/ac2398c6-a35d-4434-aec6-dcd35a1685dc)

</div>


- 로그인은 mysql과 연동하여 로그인이 진행되게 구현했습니다. 일반 로그인 및 카카오 로그인 성공시 **홈화면으로 이동**되게 됩니다.
- 회원가입시 **유효성 검사와 이메일 이메일 중복체크**를 진행하며, **모두 완료되어야 완료버튼이 활성화** 됩니다.

  
<div align=center>

| 로그인          | 카카오 로그인     | 회원가입     |
| --------------- | ----------------- | ------------ |
| ![ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/1fda5e9f-667e-4f38-bc23-f62cd1292686)| ![2025-03-262 27 10-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/bfff83fa-7b8c-4063-9816-ea0745c8e6e4) | ![2025-03-262 35 44-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/8f24c276-a303-408c-8305-82670ea4d60f)
 

</div>

### [초기화면_로그인 이후]

- 로그인 이후 초기 페이지에서는 등록된 아이들의 리스트와 성장기록,위탁의료기관 목록, 감염병 정보, ai챗봇을 사용할 수 있으며, 헤더의 목록이 변경됩니다.

<div align=center>
  
![ezgif com-video-to-gif-converter (1)](https://github.com/user-attachments/assets/01dd9fc1-d4c0-4757-954b-42d8e4b74521)

</div>

### [예방접종 페이지]
- 예방접종페이지의 주요 기능은 **아이 예방 접종 일정 관리(CRUD)** 입니다.
- 3개의 드롭다운을 이용해 **필터링이 가능**하며, 관리버튼을 클릭하여 해당 백신의 **접종 일자와 횟수를 관리**할 수 있습니다.

  <div align=center>
    
  ![예방접종 관리](https://github.com/user-attachments/assets/2490e0c0-d761-4688-9fd5-95b3a1ee6d18)

  </div>

- **외부 API를 연동**하여 **예방접종 백신 상세정보와 감염병 정보**를 제공합니다.

<div align=center>

![감염병정보](https://github.com/user-attachments/assets/5da8143e-abee-4382-a8ae-47ecc0cb8414)

</div>

- **외부 API를 연동**하여 **예방접종 위탁의료기관 검색 기능**을 제공하고 페이지네이션 기능을 추가하였습니다.

<div align=center>
  
![2025-03-263 31 55-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/2fd99311-cecf-451c-a8bd-03f7e00b8da4)

</div>


### [성장일지 페이지]
- 성장일지 페이지의 주요기능은 **아이 성장 기록 관리 및 성장 추이 그래프 기능** 입니다.
- 성장기록은 측정 날짜, 키, 몸무게, 머리둘레를 입력하여 저장하고 성장기록 모달에서 **누적된 기록을 조회/추가/수정/삭제**를 할 수 있습니다.

<div align=center>
  
  ![2025-03-263 51 34-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/c9e70d20-9a10-460b-a92b-539482641301)

</div>


- 성장일지
  - 아이의 키, 몸무게, 머리둘레 기록 관리 (CRUD)
  - 아이의 성장 추이 그래프로 확인
  - 성장상태 측정 계산기 : 키, 체중, 머리둘레를 WHO 성장 기준과 비교하여 아기의 성장 상태 분석 가능
    - 성장곡선 그래프로 제공: 외부 API 연동하여 값을 얻어 그래프로 변환
    - 백분위로 정확한 수치 제공: 외부 API를 연동하여 LMS 값을 얻어 z-score로 변환하고 이를 다시 외부 API에서 얻은 데이터를 사용하여 백분위로 변환

### [마이페이지]
- 마이페이지에서는 **사용자의 정보를 수정**하거나 **아이 정보를 추가/수정/삭제**를 할 수 있습니다.
  
| 사용자 정보수정         | 아이 정보 수정     |
| -- | -- |
| ![사용자정보수정](https://github.com/user-attachments/assets/fe351799-bd6a-464d-8a5f-c106d9741670) | ![아이정보수정](https://github.com/user-attachments/assets/86ee37e4-a7fe-464a-b8c0-b8c4a0c96018) |

  <br/>

## 트러블슈팅

**✔️메모이제이션을 통한 성능 최적화**

- **문제상황** : API를 통해 데이터를 불러올때 로딩속도가 매번 길어 불편감 초래
- **이유** : 랜더링 될 때 마다 계속 같은 정보의 API를 호출하기 때문
- **해결** : useMemo()를 활용하여 메모이제이션 하여 한번 호출된 이후로는 값을 기억하도록 설정
  <br/>

**✔️useState()는 비동기 함수**

- **문제상황** : 삭제 버튼을 눌러도 삭제되지 않고, 한 번 더 눌러야만 삭제가 됨
- **이유** : setState()는 비동기 함수로 발생하는 문제
  - setState()는 비동기적으로 동작하여, React는 여러 개의 setState() 호출이 있을 때, 하나씩 바로 업데이트하지 않고 한꺼번에 처리. 성능 최적화를 위해 상태 변경 요청을 "잠시 모아두었다가 한 번에 처리. 따라서 setState()가 즉시 반영되지 않음.
  - axios.post() 실행 시점에서 setState()가 반영되지 않아 변수의 값이 여전히 이전 상태값을 유지하고 있음 → 잘못된 값이 서버로 전달됨
- **해결**

1. setState() 대신 즉시 반영되는 로컬 변수를 사용
2. useEffect()를 사용하여 값이 변경된 후 axios.post() 실행.
   ⇒ useState를 꼭 사용하지 않아도 되는 경우였기에, 간편하게 방법1 선택!
   <br/>

**✔️데이터가 존재하지만 반환되지 않음**

- **문제상황** : API를 호출하여 데이터를 받아오는데, 데이터가 1개일 때는 데이터가 반환되지 않고 오류가 생김
- **이유** : 데이터가 여러개일 경우에는 배열 형식 [{}, {} , …, {}] 으로 데이터를 받지만, 데이터가 1개일 경우에는 그냥 객체{} 형태로 데이터를 가져옴. 객체에는 map() 메서드 사용 불가로 나오는 에러!
- **해결** : Array.isArray()로 배열인지 아닌지 먼저 확인 후 배열이 아니면 배열로 변환
  <br/>

**✔️false의 조건**

- **문제상황** : 데이터의 값이 있는데 필수 정보가 부족하다는 오류가 있는 상황
- **이유** : `!데이터` 조건에서 데이터의 값이 0일 때 return됨.  
   +) 참고 : **`!childData.months`가 `true`가 되는 경우**
  - null : 값이 없을 때
  - undefined : 값이 정의되지 않았을 때
  - **0 : 숫자 0은 false로 평가됨**
  - ‘' : 빈 문자열은 false로 평가됨
  - NaN : 숫자가 아닌 값
- **해결** : `데이터===null || 데이터===undefined` 시 return되게 조건을 바꾸어 0도 유효한 값으로 처리
  <br/>

## 개선목표
