/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,scss}", "./index.tsx"], // Tailwind 사용할 파일
  theme: {
    extend: {
      screens: {
        lg: "1280px",
        md: "1024px", // 768px 이상일 때 적용
        sm: "768px", // 768px 이상일 때 적용
        xs: "390px", // 390px 이상일 때 적용
        "max-xs": { max: "389px" }, // 389px 이하
      },

      colors: {
        white: "#FFFFFF", // bg-white 형식으로 사용하세요
        black: "#000000",
        gray: {
          bg: "#fdfdfd", // background 컬러 // bg-gray-bg 형식으로 사용하세요
          0: "#f9f9f9", // text-gray-0 형식으로 사용하세요
          1: "#f3f3f4",
          2: "#e1e1e5",
          3: "#cacad0",
          4: "#b1b1ba",
          5: "#9999a5",
          6: "#838391",
          7: "#6f6f7b",
          8: "#5d5d67",
          9: "#4b4b53",
          10: "#3b3b41",
        },
        coral: {
          0: "#6c4b4a",
          1: "#fef6f6",
          2: "#fceae9",
          3: "#f9d9d8",
          4: "#f6c7c6",
          5: "#f4b6b4",
          6: "#f1a6a4",
          8: "#ab7674",
          7: "#cd8d8b",
          9: "#895f5d",
        },
        red: {
          0: "#71272b",
          1: "#ffeeef",
          2: "#fed7d9",
          3: "#feb7bb",
          4: "#fd959b",
          5: "#fd757d",
          6: "#fc5760",
          7: "#d64a52",
          8: "#b33e44",
          9: "#903237",
        },
        yellow: {
          0: "#6c5734",
          1: "#fef9f1",
          2: "#fcf0de",
          3: "#f9e5c3",
          4: "#f6d9a7",
          5: "#f4cd8d",
          6: "#f1c274",
          7: "#cda563",
          8: "#ab8a52",
          9: "#896f42",
        },
        orange: {
          0: "#6f4b31",
          1: "#fef6f1",
          2: "#fdeadc",
          3: "#fbd9c1",
          4: "#f9c7a4",
          5: "#f8b688",
          6: "#f6a66e",
          7: "#d18d5e",
          8: "#af764e",
          9: "#8c5f3f",
        },
        green: {
          0: "#3e5e55",
          1: "#f3faf8",
          2: "#e3f4ef",
          3: "#ccebe3",
          4: "#b5e2d5",
          5: "#9ed9c9",
          6: "#89d1bd",
          7: "#74b2a1",
          8: "#619486",
          9: "#4e776c",
        },
        blue: {
          0: "#425b64",
          1: "#f4fafc",
          2: "#e5f3f7",
          3: "#d1e9f1",
          4: "#bbdeeb",
          5: "#a6d4e5",
          6: "#93cbdf",
          7: "#7dadbe",
          8: "#68909e",
          9: "#54747f",
        },
        purple: {
          0: "#4f4a68",
          1: "#f7f6fd",
          2: "#ece9f9",
          3: "#ddd8f5",
          4: "#cdc6f1",
          5: "#beb5ec",
          6: "#b0a5e8",
          7: "#968cc5",
          8: "#7d75a5",
          9: "#645e84",
        },
        kakao: {
          0: "#6b6000",
          1: "#fffce6",
          2: "#fff7b0",
          3: "#fff38a",
          4: "#feee54",
          5: "#feea33",
          6: "#fee500",
          7: "#e7d000",
          8: "#b4a300",
          9: "#8c7e00",
        },
      },

      fontSize: {
        "3xs": ["10px", "14px"], // font-size: 10px; line-height: 14px; // text-3xs로 사용
        "2xs": ["12px", "16px"],
        xs: ["14px", "18px"],
        bs: ["16px", "20px"],
        sm: ["18px", "22px"],
        md: ["20px", "24px"],
        lg: ["22px", "26px"],
        xl: ["24px", "28px"],
        "2xl": ["28px", "32px"],
        "3xl": ["32px", "40px"],
        "4xl": ["40px", "48px"],
      },

      fontWeight: {
        rg: "400", // font-weight: 400; // font-rg로 사용
        md: "500",
        bd: "700",
      },
    },
  },
  plugins: [],
};
