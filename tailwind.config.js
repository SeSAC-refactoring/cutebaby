/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.tsx"], // 프로젝트 전체의 모든 JSX, TSX 파일에서 Tailwind 사용 가능
  theme: {
    extend: {
      screens: {
        xs: "390px", // 390px 이상일 때 적용
      },
      colors: {
        "yellow-1": "#FEF9F1",
        "yellow-4": "#F6D9A7",
        "gray-10": "#3B3B41",
        "gray-8": "#5D5D67",
      },
      fontSize: {
        "3xs": ["10px", "14px"], // font-size: 10px; line-height: 14px; text-3xs로 사용
        "2xs": ["12px", "16px"],
        xs: ["14px", "18px"],
        bs: ["16px", "20px"],
        sm: ["18px", "22px"],
        md: ["20px", "24px"],
        lg: ["22px", "28px"],
        xl: ["24px", "28px"],
        "2xl": ["28px", "34px"],
        "3xl": ["32px", "38px"],
        "4xl": ["40px", "46px"],
      },
      fontWeight: {
        rg: "400", // font-weight: 400; font-rg로 사용
        md: "500",
        bd: "700",
      },
    },
  },
  plugins: [],
};
