import React from "react";
import { Disease } from "./Disease";
import { VaccineType } from "./VaccineType";
import { DoseDate } from "./DoseDate";
import { TotalDoses } from "./TotalDoses";
import { VaccinationSchedule } from "./VaccinationSchedule";
import { Link } from "react-router-dom";
import { ChildrenTabs } from "../../../commons/ChildrenTabs";
import styles from "../styles/Vaccination.module.scss";

export const VaccinationTable = () => {
  return (
    <div
      style={{
        width: "1120px",
        // border: "2px solid black",
        // backgroundColor: "#FFFFFF",
        // padding: "80px 0px 0px 80px",
        // borderRadius: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "492px",
          overflow: "auto",
        }}
      >
        <Disease />
        <VaccineType />
        <TotalDoses />
        <div>
          <DoseDate />
          <VaccinationSchedule />
        </div>
      </div>
    </div>
  );
};
