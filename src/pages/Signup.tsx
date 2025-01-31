import React from 'react'

export default function Signup() {


  return (
    <div>
        <h1>회원가입</h1>
        <section>
            <h2>1. 보호자님 정보를 적어주세요</h2>
                 <input type="email" placeholder='이메일을 입력해주세요'/>
                 <input type="password" placeholder='비밀번호를 입력해주세요'/>
                 <input type="password" placeholder='비밀번호를 한번더 입력해주세요'/>
        <button>회원가입</button>
        </section>
        <section>
            <h2>2. 아기의 정보를 적어주세요</h2>
            <input type="text" placeholder='아기의 이름을 입력해주세요'/>
            <input type="date" placeholder='아기의 생일을 입력해주세요'/>

        </section>
    </div>
  )
}
