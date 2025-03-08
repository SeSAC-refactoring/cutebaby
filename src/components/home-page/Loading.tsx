const Loading = () => {
    return (
        <div className="modalBg">
            <div className="whiteboxModal">
                <div className="response-state">
                    <img
                        src="/img/visuals/visual_loading_ggomul_04.svg"
                        alt="로딩이미지"
                    />
                    <div className="text">
                        <p>자료를 가져오고 있어요..</p>
                        <p>조금만 기다려주세요..</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
