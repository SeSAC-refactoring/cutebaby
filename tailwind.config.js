/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.tsx'], // 프로젝트 전체의 모든 JSX, TSX 파일에서 Tailwind 사용 가능
    theme: {
        extend: {
            screens: {
                xs: '390px', // 390px 이상일 때 적용
            },
        },
    },
    plugins: [],
};
