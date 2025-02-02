import React, { useState } from 'react';

// 보여주고 안보여주고 boolean값으로 useState
export const useShow = () => {
    const [show, setShow] = useState<boolean>(false); // 차트 표시 여부
    return { show, setShow };
};
