import axios from 'axios';
import React from 'react';
import { Message } from '../types';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const fetchChatGPT = async (input: string) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: input }],
                max_tokens: 150,
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('✅ OpenAI 응답:', response.data);
        return response.data.choices[0].message.content; // GPT 응답 반환
    } catch (error) {
        console.error('ChatGPT API 요청 중 오류 발생', error);
        return 'OpenAI API 요청 중 오류가 발생했습니다.'; // 에러 메시지 반환 (기본 응답 제공)
    }
};
