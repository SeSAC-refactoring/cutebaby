import { Input } from "../commons/Input";

export function PasswordEditModal() {
  return (
    <div style={{ margin: "400px" }}>
      <div>
        <div>비밀번호 수정</div>
        <div>X</div>
      </div>
      <Input
        label="현재 비밀번호"
        placeholder="현재 비밀번호를 입력해주세요."
      ></Input>
      <Input
        label="새로운 비밀번호"
        placeholder="비밀번호를 입력해주세요."
      ></Input>
      <Input
        label="비밀번호 확인"
        placeholder="비밀번호를 한 번 더 입력해주세요."
      ></Input>
      <div>
        <button>취소</button>
        <button>완료</button>
      </div>
    </div>
  );
}

// props로 아이 정보 등록, 수정 구분하기
// 일단 아이 정보 등록으로 구현
export function BabyModal() {
  return (
    <div>
      <div>
        <div>아이 정보 등록</div>
        <div>X</div>
      </div>
      <img src="/img/Profile.png" alt="아기 사진" />
      <button>
        사진 등록
        <img src="img/icons/i-profile-photo-s20.svg" alt="이미지 아이콘" />
      </button>
      <Input label="이름" placeholder="이름을 입력해주세요."></Input>
      <Input label="생년월일" placeholder="생년월일을 선택해주세요."></Input>
      <div>
        <div>남아</div>
        <div>여아</div>
      </div>
      <div>
        <button>취소</button>
        <button>완료</button>
      </div>
    </div>
  );
}
