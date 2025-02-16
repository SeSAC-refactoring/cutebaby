// import styles from "../../styles/commons/LoadingScreen.module.scss";
import modal from "../../styles/Modal.module.scss";
import typography from "../../styles/commons/Typography.module.scss";

const Loading = () => {
  return (
    <div className={modal.modal_overlay}>
      <div className={modal.loadingContens}>
        <img src="/img/visuals/visual_loading_ggomul_04.svg" alt="" />
        <p className={typography.textLgMd}>
          자료를 가져오고 있어요..
          <br />
          조금만 기다려주세요..
        </p>
      </div>
    </div>
  );
};

export default Loading;
