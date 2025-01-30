export interface ChildData {
    gender: 'male' | 'female';
    birthDate: Date; // 생년월일 ("YYYY-MM-DD" 형식)

    measurementDate: Date | null; // 측정일 ("YYYY-MM-DD" 형식)
    height: number | null;
    weight: number | null;
    headCircumference: number | null;
}

export interface ChartComponentProps {
    childData: ChildData;
    growthData: any[]; // API에서 가져온 데이터 배열
    percentileData: any[]; // API에서 가져온 데이터 배열
}
