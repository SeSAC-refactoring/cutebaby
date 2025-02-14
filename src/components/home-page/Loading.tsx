// import styles from "../../styles/commons/LoadingScreen.module.scss";
import modal from "../../styles/Modal.module.scss";

const Loading = () => {
  return (
    <div className={modal.modal_overlay}>
      <div></div>
      <p>로딩 중...</p>
    </div>
  );
};

export default Loading;
