import React from "react";

export const DoseDate = () => {
  const headers = [
    "출생시",
    "4주이내",
    "1개월",
    "2개월",
    "4개월",
    "6개월",
    "12개월",
    "15개월",
    "18개월",
    "19~23개월",
    "24~35개월",
    "4세",
    "6세",
    "11세",
    "12세",
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {headers.map((header, i) => (
        <div
          key={i}
          style={{
            width: "121px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "56px",
            backgroundColor: "#93CBDF",
            fontSize: "22px",
            fontWeight: "bold",
            borderRight: "3px solid #E1E1E5",
            boxSizing: "border-box",
          }}
        >
          {header}
        </div>
      ))}
    </div>
  );
};
