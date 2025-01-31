import React, { useState } from 'react';

export const useShowChart = () => {
    const [showChart, setShowChart] = useState<boolean>(false); // 차트 표시 여부
    return { showChart, setShowChart };
};
