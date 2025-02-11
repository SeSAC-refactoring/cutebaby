import styles from "../../styles/Modal.module.scss";
import { Input } from "../commons/Input";
import tabs from "../../styles/commons/ChildrenTabs.module.scss";

export function PasswordEditModal() {
  return (
    <div className={styles.modal_container} style={{ margin: "400px" }}>
      <div className={styles.modal_title_wrap}>
        <div className={styles.modal_title}>비밀번호 수정</div>
        <div className={styles.X_btn}>X</div>
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
      <div className={styles.modal_button_container}>
        <button className={`${styles.modal_btn} ${styles.modal_cancel_button}`}>
          취소
        </button>
        <button className={`${styles.modal_btn} ${styles.modal_done_button}`}>
          완료
        </button>
      </div>
    </div>
  );
}

// props로 아이 정보 등록, 수정 구분하기
// 일단 아이 정보 등록으로 구현
export function BabyModal() {
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_title_wrap}>
        <div className={styles.modal_title}>아이 정보 등록</div>
        <div className={styles.X_btn}>X</div>
      </div>
      <img src="/img/Profile.png" alt="아기 사진" />
      <button className={styles.modal_img_button}>
        사진 등록
        <img src="img/image-add.png" alt="이미지 아이콘" />
      </button>
      <Input label="이름" placeholder="이름을 입력해주세요."></Input>
      <Input label="생년월일" placeholder="생년월일을 선택해주세요."></Input>
      <div className={tabs.button_group}>
        <div className={tabs.button_selected}>남아</div>
        <div className={tabs.button}>여아</div>
      </div>
      <div className={styles.modal_button_container}>
        <button className={`${styles.modal_btn} ${styles.modal_cancel_button}`}>
          취소
        </button>
        <button className={`${styles.modal_btn} ${styles.modal_done_button}`}>
          완료
        </button>
      </div>
    </div>
  );
}
