// export const handleDiaryKeyDown = (
//     inputRef,

//     e: React.KeyboardEvent<HTMLInputElement>
// ) => {
//     if (e.key === 'Enter') {
//         e.preventDefault(); // 기본 Enter 동작(폼 제출) 방지

//         if (e.currentTarget.id === 'height') {
//             inputRef.current.weight?.focus(); // 체중 입력 필드로 이동
//         } else if (e.currentTarget.id === 'weight') {
//             inputRef.current.head?.focus(); // 머리둘레 입력 필드로 이동
//         } else if (e.currentTarget.id === 'head') {
//             handleDiarySubmit(); // 마지막 필드(머리둘레)에서 Enter 누르면 자동으로 제출
//         }
//     }
// };
