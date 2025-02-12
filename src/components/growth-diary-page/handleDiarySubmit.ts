// export const handleDiarySubmit = async ({
//     newGrowData,
//     setNewGrowData,
//     inputRef,
// }) => {
//     if (!newGrowData.babyid) {
//         alert('아기를 선택하세요!');
//         return;
//     } else if (!newGrowData.height) {
//         inputRef.current.height?.focus();
//     } else if (!newGrowData.weight) {
//         inputRef.current.weight?.focus();
//     } else if (!newGrowData.head) {
//         inputRef.current.head?.focus();
//     } else {
//         try {
//             await request({
//                 babyid: newGrowData.babyid,
//                 height: Number(newGrowData.height),
//                 weight: Number(newGrowData.weight),
//                 head: Number(newGrowData.head),
//                 inputData: newGrowData.inputData,
//             });
//             alert('성장 기록이 추가되었습니다!');
//             dispatch(fetchgrowInfo(babyInfo));

//             // 입력 필드 초기화
//             setNewGrowData({
//                 babyid: newGrowData.babyid, // 선택된 아기는 유지
//                 id: 0,
//                 height: '',
//                 weight: '',
//                 head: '',
//                 inputData: new Date().toISOString().split('T')[0],
//             });
//         } catch (error) {
//             alert('기록 추가에 실패했습니다.');
//         }
//     }
// };
