# 도훈님!

- src/components/types.d.ts에 필요한 타입 정의해서 사용하시라고 파일을 따로 만들었습니다.
- components 폴더에 페이지별로 폴더를 만들어서 각 페이지에 필요한 컴포넌트와 hook을 넣어놨고,
- 혹시 다른 페이지에서도 쓸 것 같은 hook들은 src/hooks/ 폴더에 넣어놨습니다..! 설명도 파일에 적어두었어요!
  <br/><br/>

# 폴더 구조와 설명

- public/
    - index.html
    - favicon.ico
    - img/ <br/><br/>
- index.tsx
- App.tsx
- global.d.ts <br/><br/>
- src/
    - pages/
        - GrowthDiary.tsx
        - Home.tsx
        - Login.tsx
        - Mypage.tsx
        - SignUp.tsx
        - Vaccination.tsx <br/><br/>
    - components/
        - types.d.ts : 타입 정의
        - api-data/ : api 데이터 호출 관련 파일들 <br/><br/>
        - growth-diary-page/ : 페이지 별 컴포넌트
        - home-page/
        - login-page/
        - my-page/
        - sign-up-page/
        - vaccination-page/ <br/><br/>
    - hooks/ : 공통적으로 사용되는 hook 정의
    - styles/
    - server/
    - services/
