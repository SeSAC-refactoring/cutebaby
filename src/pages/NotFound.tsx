import React from "react";
import layout from "../styles/commons/Layout.module.scss";

export const NotFound = () => {
  return (
    <div className={layout.mainAreaWrap}>
      <img className={layout.errorpage} src="/img/404.png" alt="test" />
    </div>
  );
};
