#  <img height="50" src="https://github.com/user-attachments/assets/f8996eec-246d-44d8-acb9-182b095929e7"> 디지털 아기 수첩, 꼬물꼬물


### **아기수첩,** 알고계신가요?<img width="260" alt="스크린샷 2025-02-19 오후 3 49 14" align="right" src="https://github.com/user-attachments/assets/381e6271-a795-42de-8177-7ec4017ff051" />


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
- 프로젝트 기획 목적 : 아기의 첫시작이 담긴 아기수첩, **데이터의 디지털화를 통해 안전하게 보관** 하고
  누적된 데이터를 보기쉽게 **시각화**하여 **아기기록을 쉽게 관리**한다.

## 팀원소개
<div align=center>
  <img width="836" alt="스크린샷 2025-02-19 오후 4 02 49" src="https://github.com/user-attachments/assets/3d377d25-811a-444b-948c-1c40c159fd12" />
</div>

- 이유진 : 기획+퍼블리싱
  - 유저플로우 기획
  - 와이어프레임과 화면정의서 제작
  - WBS 제작
  - 퍼블리싱(HTML/CSS)
- 김복은 : 디자인+퍼블리싱
  - 디자인 시스템 구축
  - UI/UX 디자인 (Figma 사용)
  - 퍼블리싱(HTML/CSS)
- 배주향 : 프론트엔드
  - 홈페이지의 AI챗봇 기능
  - api 데이터를 사용하여 감염병별 정보 제공
  - api 데이터를 사용하여 예방접종 위탁의료기관 검색 기능, 페이지네이션 기능
  - 성장기록에 따른 그래프 구현, 성장상태 측정계산기의 측정값에 따른 그래프 구현
- 윤도훈 : 프론트엔드+백엔드
  - MySQL 기반 DB 설계
  - Node.js와 Express를 활용한 API 개발
  - 로그인/회원가입 기능 개발
  - 예방접종기록, 성장기록, 마이페이지의 CRUD 기능 개발
  - 서버 배포

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

- **상태 관리** : **Redux**
  - 사용자 정보: 이름, 아이디, 비밀번호
  - 사용자의 아기 정보: 이름, 생년월일, 성별
  - 예방접종 정보: 아기아이디, 접종일, 백신이름, 접종회차, 접종일
  - 성장기록 정보: 아기아이디, 측정일, 키, 몸무게, 머리둘레
<br/>

- **프론트엔드**
  - **React** : 컴포넌트 기반 구조로 재사용성 증가, 페이지 리로드 없이 동적인 웹페이지 구현 가능, 다양한 라이브러리와의 연동 가능
  - **TypeScript** : 타입을 명시해 코드의 의도 전달, 타입 안전성을 제공하여 Props, State 등의 오류를 사전에 방지
  - **@google/generative-ai** : Google Generative AI API 사용을 위한 라이브러리로 홈페이지의 챗봇 기능에 활용
  - **chart.js** : 다양한 유형의 차트를 쉽고 직관적으로 생성이 가능한 라이브러리로 성장일지의 그래프와 성장상태 측정계산기의 그래프에서 활용
  - **react-markdown** : React에서 Markdown을 렌더링할 수 있도록 도와주는 라이브러리로 홈페이지의 챗봇 기능에 활용
  - **fast-xml-parser** : XML 데이터를 JSON으로 변환하는 라이브러리로 프론트에서 Open API 데이터를 직접 요청할 때 API에서 불러온 XML 데이터를 JSON으로 변환한 후 UI에 표시
<br/>

- **백엔드**
  - **Node.js** : 백엔드 개발에 JavaScript 사용할 수 있도록
  - **Express 프레임워크**: Node.js 환경에서 MySQL과 연동할때 유용한 기능을 제공하여 서버 구축을 쉽게 할 수 있도록 도움받음
  - **MVC 패턴 적용**: 백엔드 로직을 Model / View / Controller 로 나누어 관리하여 파일 구조를 체계적으로 분리고 코드 가독성 향상, 유지보수성 챙김
  - **CORS 모듈**: CORS 에러를 해결하기 위해 Express(Node.js)에서 cors 모듈을 사용하여 특정 도메인에서의 요청을 허용할 수 있도록 설정
<br/>

- **스타일링** : **SASS**
  - 변수를 사용해 **일관된 디자인**을 유지, 유지보수성 향상
  - 중첩 문법 지원, mixin과 extend로 코드 재사용성 증가
  - 모듈화로 코드 관리가 쉽고, 협업 시 충돌 방지

## 주요기능  
### [초기화면_로그인 이전]
- 서비스 접속 시 초기화면으로 로그인이 진행되어있지 않으면 "방문자님, 안녕하세요" 문구가 출력 되며
  상단 헤더 탭에 홈, 로그인 탭만 출력하게 됩니다.
  <img width="1076" alt="스크린샷 2025-02-19 오후 4 38 06" src="https://github.com/user-attachments/assets/14a4fa6a-9ff8-4d44-a475-d3f7b36e8d9d" />

- 우측 채팅창은 구글ai와 채팅할 수 있는 영역으로, ai에게 질문하는 용도로 구현했습니다.
  <div align=center>
    <img height="500" src="https://github.com/user-attachments/assets/b6e51577-a659-44f9-9651-36452b358de4">
</div>

- 로그인은 mysql과 연동하여 로그인이 진행되게 구현했습니다. 일반 로그인 및 카카오 로그인 성공시 **홈화면으로 이동**되게 됩니다.
- 회원가입시 **유효성 검사와 이메일 이메일 중복체크**를 진행하며, **모두 완료되어야 완료버튼이 활성화** 됩니다.
<div align=center>

| 로그인 | 카카오 로그인 | 회원가입 |
|------| ----------| --------|
| 로그인 화면 gif | 카카오 로그인 gif | 회원가입 gif |
</div>

### [초기화면_로그인 이후]

### [예방접종 페이지]
- 예방접종
    - 어린이 예방 접종 일정표 + 접종 일정 관리 (CRUD)
    - 예방접종 백신 상세 정보 제공
    - 예방접종 대상 감염병 정보 제공: 외부 API 연동
    - 예방접종 위탁의료기관 검색 기능: 외부 API 연동, 페이지네이션
### [성장일지 페이지]
- 성장일지
    - 아이의 키, 몸무게, 머리둘레 기록 관리 (CRUD)
    - 아이의 성장 추이 그래프로 확인
    - 성장상태 측정 계산기 :  키, 체중, 머리둘레를 WHO 성장 기준과 비교하여 아기의 성장 상태 분석 가능
        - 성장곡선 그래프로 제공: 외부 API 연동하여 값을 얻어 그래프로 변환
        - 백분위로 정확한 수치 제공: 외부 API를 연동하여 LMS 값을 얻어 z-score로 변환하고 이를 다시 외부 API에서 얻은 데이터를 사용하여 백분위로 변환
### [마이페이지]
- 마이페이지
    - 사용자 정보, 아이 정보 관리 (CRUD)

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
- **문제상황** : API를 호출하여 데이터를 받아오는데, 데이터가  1개일 때는 데이터가 반환되지 않고 오류가 생김
- **이유** : 데이터가 여러개일 경우에는 배열 형식 [{}, {} , …, {}] 으로 데이터를 받지만, 데이터가 1개일 경우에는 그냥 객체{} 형태로 데이터를 가져옴. 객체에는 map() 메서드 사용 불가로 나오는 에러!
- **해결** : Array.isArray()로 배열인지 아닌지 먼저 확인 후 배열이 아니면 배열로 변환
<br/>

**✔️false의 조건**
- **문제상황** : 데이터의 값이 있는데 필수 정보가 부족하다는 오류가 있는 상황
- **이유** : `!데이터` 조건에서 데이터의 값이 0일 때 return됨.    
    +) 참고 :  **`!childData.months`가 `true`가 되는 경우**
    - null : 값이 없을 때
    - undefined : 값이 정의되지 않았을 때
    - **0 : 숫자 0은 false로 평가됨**
    - ‘' : 빈 문자열은 false로 평가됨
    - NaN : 숫자가 아닌 값
- **해결** : `데이터===null || 데이터===undefined` 시 return되게 조건을 바꾸어 0도 유효한 값으로 처리

## 개선목표
