// import styles from "../../styles/Vaccination.module.scss";
import styles from "../../styles/Modal.module.scss";
import { Input } from "../commons/Input";

export default function VaccinationModal({ setIsOpen }: any) {
  return (
    <div
      className={styles.modal_overlay}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div className={styles.modalWrap}>
        <div className={styles.modal_container}>
          <div className={styles.modal_title_wrap}>
            <div className={styles.modal_title}>기록 수정</div>
            <div
              onClick={() => {
                setIsOpen(false);
              }}
              style={{
                fontSize: "40px",
              }}
            >
              X
            </div>
          </div>
          <input className={styles.modal_input}></input>
          <input className={styles.modal_input}></input>
          <input className={styles.modal_input}></input>
          <div className={styles.modal_button_container}>
            <button
              className={`${styles.modal_btn} ${styles.modal_cancel_button}`}
            >
              취소
            </button>
            <button
              className={`${styles.modal_btn} ${styles.modal_done_button}`}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
