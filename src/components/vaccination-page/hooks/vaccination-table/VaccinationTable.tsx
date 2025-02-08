import React from "react";
import { Disease } from "./Disease";
import { VaccineType } from "./VaccineType";
import { DoseDate } from "./DoseDate";
import { TotalDoses } from "./TotalDoses";
import { VaccinationSchedule } from "./VaccinationSchedule";

export const VaccinationTable = () => {
  return (
    <div
      style={{
        width: "1638px",
        border: "2px solid black",
        backgroundColor: "#FFFFFF",
        padding: "80px 0px 0px 80px",
        borderRadius: "40px",
      }}
    >
      <h2
        style={{
          marginBottom: "32px",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        예방접종 관리
      </h2>
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
