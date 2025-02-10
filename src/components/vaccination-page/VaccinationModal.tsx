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
      <div className={styles.modal_background}>
        <div className={styles.modal_container}>
          <div className={styles.modal_title_wrap}>
            <div className={styles.modal_title}>실접종일 입력</div>
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
          <input
            className={styles.modal_input}
            placeholder="2025-01-01"
          ></input>
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
