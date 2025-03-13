import { VaccinationScheduleData } from "../../types";

export const diseasesData = [
  { name: "B형간염", vaccinationid: 1 },
  { name: "결핵", vaccinationid: 2 },
  { name: "디프테리아/\n파상풍/\n백일해", vaccinationid: [3, 4] },
  { name: "폴리오", vaccinationid: 5 },
  { name: "b형헤모필루스\n인플루엔자", vaccinationid: 6 },
  { name: "폐렴구균\n감염증", vaccinationid: [7, 8] },
  { name: "로타바이러스\n감염증", vaccinationid: [9, 10] }, // RV1/RV5 (두 개 중 하나)
  { name: "홍역/\n유행성이하선염/\n풍진", vaccinationid: 11 },
  { name: "수두", vaccinationid: 12 },
  { name: "A형간염", vaccinationid: 13 },
  { name: "일본뇌염", vaccinationid: [14, 15] }, // JEV(불활성화) / JEV(약독화) 둘 다 포함
  { name: "사람유두종\n바이러스감염증", vaccinationid: 16 },
  { name: "인플루엔자", vaccinationid: 17 },
];

export const diseasesNameID = [
  [0], //0개월
  [1], //4주이내
  [0], // 1개월
  [2, 3, 4, 5, 6], //2개월
  [2, 3, 4, 5, 6], //4개월
  [0, 2, 3, 4, 5, 6, 12], //6개월
  [3, 4, 5, 7, 8, 9, 10, 12], //12개월
  [2, 3, 4, 5, 7, 8, 9, 10, 12], //15개월
  [2, 3, 9, 10, 12], //18개월
  [9, 10, 12], //19-23개월
  [5, 9, 10, 12], //24-35개월
  [2, 3, 5, 7, 12], //만4세
  [2, 3, 5, 10, 12], //만6세
  [2, 5, 11, 12], //만11세
  [2, 5, 10, 11, 12], //만11세
];

export const vaccinesData = [
  { name: "HepB", months: [0, 2, 5], vaccinationid: 1, doses: 3 },
  { name: "BCG(피내용)", months: [1], vaccinationid: 2, doses: 1 },
  { name: "DTaP", months: [3, 4, 5, 7, 8, 11, 12], vaccinationid: 3, doses: 5 },
  { name: "Tdap/Td", months: [13, 14], vaccinationid: 4, doses: 1 },
  {
    name: "IPV",
    months: [3, 4, 5, 6, 7, 8, 11, 12],
    vaccinationid: 5,
    doses: 4,
  },
  { name: "Hib", months: [3, 4, 5, 6, 7], vaccinationid: 6, doses: 4 },
  { name: "PCV", months: [3, 4, 5, 6, 7], vaccinationid: 7, doses: 4 },
  { name: "PPSV", months: [10, 11, 12, 13, 14], vaccinationid: 8, doses: "-" },
  { name: "RV1", months: [3, 4], vaccinationid: 9, doses: 2 },
  { name: "RV5", months: [3, 4, 5], vaccinationid: 10, doses: 3 },
  { name: "MMR", months: [6, 7, 11, 12], vaccinationid: 11, doses: 2 },
  { name: "VAR", months: [6, 7], vaccinationid: 12, doses: 1 },
  { name: "HepA", months: [6, 7, 8, 9, 10], vaccinationid: 13, doses: 2 },
  {
    name: "JEV(불활성화 백신)",
    months: [6, 7, 8, 9, 10, 12, 14],
    vaccinationid: 14,
    doses: 5,
  },
  {
    name: "JEV(약독화 생백신)",
    months: [6, 7, 8, 9, 10],
    vaccinationid: 15,
    doses: 2,
  },
  { name: "HPV", months: [14], vaccinationid: 16, doses: 2 },
  {
    name: "IIV",
    months: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    vaccinationid: 17,
    doses: "7",
  },
];

export const doses = [3, 1, 5, 1, 4, 4, 4, "-", 2, 3, 2, 1, 2, 5, 2, 2, "-"];

export const vaccinationScheduleData: VaccinationScheduleData[][] = [
  [
    { text: "HepB 1차", vaccinationid: 1, dosenumber: 1, colSpan: 1 },

    { text: "HepB 2차", vaccinationid: 1, dosenumber: 2, colSpan: 1 },

    { text: "HepB 3차", vaccinationid: 1, dosenumber: 3, colSpan: 1 },
  ],
  [{ text: "BCG 1회", vaccinationid: 2, dosenumber: 1, colSpan: 1 }],
  [
    { text: "DTaP 1차", vaccinationid: 3, dosenumber: 1, colSpan: 1 },
    { text: "DTaP 2차", vaccinationid: 3, dosenumber: 2, colSpan: 1 },
    { text: "DTaP 3차", vaccinationid: 3, dosenumber: 3, colSpan: 1 },
    { text: "DTaP 4차", vaccinationid: 3, dosenumber: 4, colSpan: 2 },

    { text: "DTaP 5차", vaccinationid: 3, dosenumber: 5, colSpan: 2 },
  ],
  [{ text: "Tdap/Td 6차", vaccinationid: 4, dosenumber: 6, colSpan: 2 }],
  [
    { text: "IPV 1차", vaccinationid: 5, dosenumber: 1, colSpan: 1 },
    { text: "IPV 2차", vaccinationid: 5, dosenumber: 2, colSpan: 1 },
    { text: "IPV 3차", vaccinationid: 5, dosenumber: 3, colSpan: 4 },

    { text: "IPV 4차", vaccinationid: 5, dosenumber: 4, colSpan: 2 },
  ],
  [
    { text: "Hib 1차", vaccinationid: 6, dosenumber: 1, colSpan: 1 },
    { text: "Hib 2차", vaccinationid: 6, dosenumber: 2, colSpan: 1 },
    { text: "Hib 3차", vaccinationid: 6, dosenumber: 3, colSpan: 1 },
    { text: "Hib 4차", vaccinationid: 6, dosenumber: 4, colSpan: 2 },
  ],
  [
    { text: "PCV 1차", vaccinationid: 7, dosenumber: 1, colSpan: 1 },
    { text: "PCV 2차", vaccinationid: 7, dosenumber: 2, colSpan: 1 },
    { text: "PCV 3차", vaccinationid: 7, dosenumber: 3, colSpan: 1 },
    { text: "PCV 4차", vaccinationid: 7, dosenumber: 4, colSpan: 2 },
  ],
  [
    {
      text: "고위험군에 한하여 접종",
      vaccinationid: 8,
      dosenumber: 1,
      colSpan: 5,
    },
  ],
  [
    { text: "RV 1차", vaccinationid: 9, dosenumber: 1, colSpan: 1 },
    { text: "RV 2차", vaccinationid: 9, dosenumber: 2, colSpan: 1 },
  ],
  [
    { text: "RV 1차", vaccinationid: 10, dosenumber: 1, colSpan: 1 },
    { text: "RV 2차", vaccinationid: 10, dosenumber: 2, colSpan: 1 },
    { text: "RV 3차", vaccinationid: 10, dosenumber: 3, colSpan: 1 },
  ],
  [
    { text: "MMR 1차", vaccinationid: 11, dosenumber: 1, colSpan: 2 },

    { text: "MMR 2차", vaccinationid: 11, dosenumber: 2, colSpan: 2 },
  ],
  [{ text: "VAR 1회", vaccinationid: 12, dosenumber: 1, colSpan: 2 }],
  [{ text: "HepA 1~2차", vaccinationid: 13, dosenumber: 0, colSpan: 5 }],
  [
    { text: "IJEV 1~2차", vaccinationid: 14, dosenumber: 0, colSpan: 4 },
    { text: "IJEV 3차", vaccinationid: 14, dosenumber: 3, colSpan: 1 },

    { text: "IJEV 4차", vaccinationid: 14, dosenumber: 4, colSpan: 1 },

    { text: "IJEV 5차", vaccinationid: 14, dosenumber: 5, colSpan: 1 },
  ],
  [
    { text: "LJEV 1차", vaccinationid: 15, dosenumber: 1, colSpan: 4 },
    { text: "LJEV 2차", vaccinationid: 15, dosenumber: 2, colSpan: 1 },
  ],
  [{ text: "HPV 1~2차", vaccinationid: 16, dosenumber: 0, colSpan: 2 }],
  [
    {
      text: "IIV 매년 접종",
      vaccinationid: 17,
      dosenumber: 0,
      colSpan: 10,
    },
  ],
];
