import React from "react";
import { diseasesName } from "./VaccinationTableData";

export const Disease: React.FC = () => {
  return (
    <div>
      <div>대상 감염병</div>
      <ul>
        {diseasesName.map((disease, i) => (
          <li
            key={i}
            style={{
              height:
                i === 2 || i === 5 || i === 6 || i === 7 || i === 10
                  ? "100px"
                  : "50px",
            }}
          >
            {disease}
          </li>
        ))}
      </ul>
    </div>
  );
};
