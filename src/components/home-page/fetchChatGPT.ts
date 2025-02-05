// Gemini - google
import { GoogleGenerativeAI } from '@google/generative-ai';

// 환경변수에서 API 키 가져오기
const API_KEY: string = process.env.REACT_APP_GEMINI_API_KEY ?? '';
const genAI = new GoogleGenerativeAI(API_KEY);

export const fetchGemini = async (input: string) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Gemini 모델을 가져옴
        // 새로운 채팅 시작
        const chat = model.startChat({
            history: [], // 이전 대화 내용 없이 새 채팅 시작
            generationConfig: {
                // maxOutputTokens: 150, // 응답 최대 길이 설정
            },
        });
        // 사용자 입력 메시지 전송
        const result = await chat.sendMessage(input); // 사용자가 입력한 input 값을 Gemini 모델에 전송
        const response = await result.response; // Gemini 모델이 생성한 응답 객체
        const text = await response.text(); // 응답은  JSON 객체 형태로 오기 때문에 string 형태로 변환 // text 변수에 Gemini가 생성한 답변이 문자열로 저장됨
        return text;
    } catch (error) {
        console.error('Gemini API 요청 중 오류 발생', error);
        return 'Google Gemini API 요청 중 오류가 발생했습니다.'; // 에러 메시지 반환 (기본 응답 제공)
    }
};

// Open AI - ChatGPT
// const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
// const API_URL = 'https://api.openai.com/v1/chat/completions';
// export const fetchChatGPT = async (input: string) => {
//     try {
//         const response = await axios.post(
//             API_URL,
//             {
//                 model: 'gpt-3.5-turbo',
//                 messages: [{ role: 'user', content: input }],
//                 max_tokens: 150,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${API_KEY}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );
//         console.log('✅ OpenAI 응답:', response.data);
//         return response.data.choices[0].message.content; // GPT 응답 반환
//     } catch (error) {
//         console.error('ChatGPT API 요청 중 오류 발생', error);
//         return 'OpenAI API 요청 중 오류가 발생했습니다.'; // 에러 메시지 반환 (기본 응답 제공)
//     }
// };
