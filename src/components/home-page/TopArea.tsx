import React from "react";

export const TopArea = () => {
  const username = sessionStorage.getItem("username") ?? "방문자";

  return (
    <section className="topArea">
      <div className="greeting">
        <strong>{username}</strong>
        님,
        <br />
        안녕하세요👋🏼
      </div>
      <div className="description">
        우리아이 예방접종을 관리하고, 성장일지를 기록해보세요:)
      </div>
    </section>
  );
};
