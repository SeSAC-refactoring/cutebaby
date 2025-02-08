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
      }}
    >
      <h2>국가예방접종</h2>
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
