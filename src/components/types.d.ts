////////////////////////////////////////////////////////////////////////////
// # growth-diary-page
export interface ChildData {
    gender: 'male' | 'female';
    birthDate: Date; // 생년월일 ("YYYY-MM-DD" 형식)

    measurementDate: Date | null; // 측정일 ("YYYY-MM-DD" 형식)
    months: number | null;
    height: number | null;
    weight: number | null;
    headCircumference: number | null;
}

export interface ChartComponentProps {
    childData: ChildData;
    lmsData: any[]; // API에서 가져온 데이터 배열
    percentileData: any[]; // API에서 가져온 데이터 배열
}

////////////////////////////////////////////////////////////////////////////
// # home-page // 챗봇 기능

export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

////////////////////////////////////////////////////////////////////////////
// # vaccination-page

// ## vaccinationDetails
interface DiseaseList {
    cd: number;
    cdNm: string;
}

interface DiseaseInfo {
    message: string;
    title: string;
}

// ## vaccinationCenters

// - 지역(시/도), 도시(시/군/구) api data type
export interface Location {
    cd: number;
    cdNm: string;
}

// - 병원 목록 api data type
export interface VcnInfo {
    vcnNm: string;
    vcncd: number;
}
export interface Centers {
    expnYmd: number;
    orgAddr: string;
    orgTlno: string;
    orgcd: number;
    orgnm: string;
    vcnList: { vcnInfo: VcnInfo | VcnInfo[] };
}

// - selectiedLocation type
export interface SelectedLocation {
    province: string;
    city: string;
}

//
