import React from "react";
import { doses } from "./VaccinationTableData";

export const TotalDoses: React.FC = () => {
  return (
    <div>
      <div>횟수</div>
      <ul>
        {doses.map((dose, i) => (
          <li key={i}>{dose}</li>
        ))}
      </ul>
    </div>
  );
};
