import React from "react";
import { ChildData, LmsData, PercentileData, Percentiles } from "../types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { createChartData } from "./functions/createChartData";
import { getP97P3Value } from "./functions/getP97P3Value";
import { calculateChartOptions } from "./functions/calculateChartOptions";

// Chart.js에 필요한 모듈
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CalculateChartProps {
  childData: ChildData;
  filteredLmsDataByGender: LmsData[];
  filteredLmsDataByMonths: LmsData[];
  percentileData: PercentileData[]; // API에서 가져온 데이터 배열
  percentiles: Percentiles;
}

// 버튼 클릭 시 보여지는 차트 컴포넌트 (입력값에 따라 차트 변경)
export const CalculateChart: React.FC<CalculateChartProps> = ({
  childData,
  filteredLmsDataByGender,
  filteredLmsDataByMonths,
  percentileData,
  percentiles,
}) => {
  if (
    !childData ||
    !filteredLmsDataByGender ||
    !filteredLmsDataByMonths ||
    !percentileData
  )
    return <p>데이터가 부족합니다.</p>;

  console.log("filteredLmsDataByGender", filteredLmsDataByGender);
  console.log("filteredLmsDataByMonths", filteredLmsDataByMonths);
  console.log("percentileData", percentileData);
  console.log("percentiles", percentiles);

  let p97Height: { x: number; y: number }[] = [];
  let p3Height: { x: number; y: number }[] = [];
  let p97Weight: { x: number; y: number }[] = [];
  let p3Weight: { x: number; y: number }[] = [];
  let p97HeadCircumference: { x: number; y: number }[] = [];
  let p3HeadCircumference: { x: number; y: number }[] = [];

  const heightData = getP97P3Value("키", filteredLmsDataByGender);
  const weightData = getP97P3Value("몸무게", filteredLmsDataByGender);
  const headCircumferenceData = getP97P3Value(
    "머리둘레",
    filteredLmsDataByGender
  );

  // 신장 데이터
  if (childData.height) {
    p97Height = heightData.p97;
    p3Height = heightData.p3;
  }

  // 몸무게 데이터
  if (childData.weight) {
    p97Weight = weightData.p97;
    p3Weight = weightData.p3;
  }

  // 머리둘레 데이터
  if (childData.headCircumference) {
    p97HeadCircumference = headCircumferenceData.p97;
    p3HeadCircumference = headCircumferenceData.p3;
  }

  // 아이의 현재 데이터 (childData의 months를 X축 값으로 사용)
  const currentChildHeight = childData.height
    ? [{ x: childData.months, y: childData.height }]
    : [null];
  const currentChildWeight = childData.weight
    ? [{ x: childData.months, y: childData.weight }]
    : [null];
  const currentChildHeadCircumference = childData.headCircumference
    ? [{ x: childData.months, y: childData.headCircumference }]
    : [null];

  // chartOptions
  const heightChartOptions = calculateChartOptions("신장 (cm)"); // 키 차트
  const weightChartOptions = calculateChartOptions("몸무게 (kg)"); // 몸무게 차트
  const headChartOptions = calculateChartOptions("머리둘레 (cm)"); // 머리둘레 차트

  return (
    <div>
      {/* 그래프 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* 신장 그래프 */}
        {childData.height && (
          <div
            style={{
              width: "1120px",
              height: "522px",
              display: "flex",
              flexDirection: "column",
              padding: "32px 48px",
              fontSize: "16px",
              border: "4px solid #D1E9F1",
              boxSizing: "border-box",
              borderRadius: "32px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "24px",
              }}
            >
              키
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "440px",
                  height: "78px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F3F3F4",
                  border: "1px solid #E1E1E5",
                  borderRadius: "8px",
                }}
              >
                우리아이 키{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                >
                  {childData.height} cm
                </span>
              </div>
              <div
                style={{
                  width: "440px",
                  height: "78px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FDEADC",
                  border: "1px solid #FBD9C1",
                  borderRadius: "8px",
                }}
              >
                <p>
                  백분위
                  <span
                    style={{
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    {percentiles.height} %
                  </span>
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6F6F7B",
                    marginTop: "6px",
                  }}
                >
                  또래의{" "}
                  <span>
                    {percentiles.height
                      ? `상위 ${100 - percentiles.height}%`
                      : "데이터 없음"}
                  </span>
                  에 해당
                </p>
              </div>
            </div>
            <div style={{ height: "100%" }}>
              <Line
                // style={{ height: '280px' }}
                data={createChartData(
                  p97Height,
                  p3Height,
                  currentChildHeight,
                  "키"
                )}
                options={heightChartOptions}
              />
            </div>
          </div>
        )}

        {/* 몸무게 그래프 */}
        {childData.weight && (
          <div
            style={{
              width: "1120px",
              height: "522px",
              border: "4px solid #D1E9F1",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              padding: "32px 48px",
              fontSize: "16px",
              borderRadius: "32px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "24px",
              }}
            >
              몸무게
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "440px",
                  height: "78px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F3F3F4",
                  border: "1px solid #E1E1E5",
                  borderRadius: "8px",
                }}
              >
                우리아이 몸무게:{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                >
                  {childData.weight}cm
                </span>
              </div>
              <div
                style={{
                  width: "440px",
                  height: "78px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#E3F4EF",
                  border: "1px solid #CCEBE3",
                  borderRadius: "8px",
                }}
              >
                <p>
                  백분위
                  <span
                    style={{
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    {percentiles.weight}%
                  </span>
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6F6F7B",
                    marginTop: "6px",
                  }}
                >
                  또래의{" "}
                  <span>
                    {percentiles.weight
                      ? `상위 ${100 - percentiles.weight}%`
                      : "데이터 없음"}
                  </span>
                  에 해당
                </p>
              </div>
            </div>
            <div style={{ height: "100%" }}>
              <Line
                // style={{ height: '280px' }}
                data={createChartData(
                  p97Weight,
                  p3Weight,
                  currentChildWeight,
                  "몸무게"
                )}
                options={weightChartOptions}
              />
            </div>
          </div>
        )}

        {/* 머리둘레 그래프 */}
        {childData.headCircumference && (
          <div
            style={{
              width: "1120px",
              height: "522px",
              border: "4px solid #D1E9F1",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              padding: "32px 48px",
              fontSize: "16px",
              borderRadius: "32px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "24px",
              }}
            >
              머리둘레
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "440px",
                  height: "78px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F3F3F4",
                  border: "1px solid #E1E1E5",
                  borderRadius: "8px",
                }}
              >
                우리아이 머리둘레
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "10px",
                  }}
                >
                  {childData.headCircumference}cm
                </span>
              </div>
              <div
                style={{
                  width: "440px",
                  height: "78px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ECE9F9",
                  border: "1px solid #DDD8F5",
                  borderRadius: "8px",
                }}
              >
                <p>
                  백분위
                  <span
                    style={{
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    {percentiles.headCircumference}%
                  </span>
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6F6F7B",
                    marginTop: "6px",
                  }}
                >
                  또래의{" "}
                  <span>
                    {percentiles.headCircumference
                      ? `상위 ${100 - percentiles.headCircumference}%`
                      : "데이터 없음"}
                  </span>
                  에 해당
                </p>
              </div>
            </div>

            <div style={{ height: "100%" }}>
              <Line
                // style={{ height: '280px' }}
                data={createChartData(
                  p97HeadCircumference,
                  p3HeadCircumference,
                  currentChildHeadCircumference,
                  "머리둘레"
                )}
                options={headChartOptions}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
