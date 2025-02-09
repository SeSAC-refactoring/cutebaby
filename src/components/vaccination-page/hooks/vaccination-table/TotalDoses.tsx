import React from "react";

export const TotalDoses: React.FC = () => {
  const doses = [3, 1, 5, 1, 4, 4, 4, "-", 2, 3, 2, 1, 2, 5, 2, 2, "-"];

  return (
    <div>
      <div
        style={{
          width: "71px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "56px",
          backgroundColor: "#93CBDF",
          fontSize: "22px",
          fontWeight: "bold",
          borderRight: "3px solid #E1E1E5",
          boxSizing: "border-box",
          position: "sticky",
          top: "0",
        }}
      >
        횟수
      </div>
      <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
        {doses.map((dose, i) => (
          <li
            key={i}
            style={{
              whiteSpace: "pre-line", // \n을 인식하여 줄바꿈 적용
              width: "71px",
              height: i === 10 ? "100px" : "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "2px solid #E1E1E5",
              borderRight: "3px solid #E1E1E5",
              boxSizing: "border-box",
            }}
          >
            {dose}
          </li>
        ))}
      </ul>
    </div>
  );
};
