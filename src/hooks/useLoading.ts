import { useCallback, useState } from 'react';

// isLoading: 로딩 상태
// startLoading(): isLoading을 ture로: 로딩 시작 시점에 사용
// stopLoading(): isLoading을 false로: 로딩 끝나는 시점에 사용
export const useLoading = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const startLoading = useCallback(() => setIsLoading(true), []);
    const stopLoading = useCallback(() => setIsLoading(false), []);

    return { isLoading, startLoading, stopLoading };
};
