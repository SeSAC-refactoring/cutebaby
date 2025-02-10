////////////////////////////////////////////////////////////////////////////
// # 서버에서 가져온 아기 정보
export interface babyinfo {
    babyid: number;
    babyname: string;
    birthday: string;
    gender: string;
    picture: null | File;
}

export interface BabyState {
    babyInfo: babyinfo[];
    nothingBaby: boolean;
    loading: boolean;
    error: string | null;
}

//////////////////////////////////////////////////////
// # 서버에서 가져온 아기의 성장기록 정보
export interface newGrowData {
    babyid: number | null;
    id : number;
    height: number | string;
    weight: number | string;
    head: number | stirng;
    inputData: string;
    
}

//////////////////////////////////////////////////////
// # 서버에서 가져온 백신 정보
export interface VaccinationData {
    babyid: number;
    vaccinationid: number;
    dosenumber: number;
    dosedate: string;
}

////////////////////////////////////////////////////////////////////////////
// # 성장상태 측정계산기
export interface ChildData {
    gender: 'male' | 'female' | null;
    birthDate: Date | null; // 생년월일 ("YYYY-MM-DD" 형식)

    measurementDate: Date | null; // 측정 ("YYYY-MM-DD" 형식)
    months: number | null;
    height: number | null;
    weight: number | null;
    headCircumference: number | null;
}

export interface LmsData {
    개월수구분코드: number;
    개월수구분코드명: string;
    성별코드: number; // 성별 ( 1 = 남아, 2 = 여아)
    성별코드명: string;
    영유아성장도표L값: number;
    영유아성장도표M값: number;
    영유아성장도표S값: number;
    영유아성장도표시작월: number;
    영유아성장도표종료월: number;
    영유아성장종류코드: number;
    영유아성장종류코드명: string;
}

export interface PercentileData {
    백분위수: number;
    영유아성장도표시작Z값: string;
    영유아성장도표종료Z값: string;
}

export interface Percentiles {
    height: number | null;
    weight: number | null;
    headCircumference: number | null;
}

//////////////////////////////////////////////////////
// # 예방접종 스케쥴 정보
export interface VaccinationScheduleData {
    text?: string;
    vaccinationid?: number;
    dosenumber?: number;
    colSpan?: number;
}

////////////////////////////////////////////////////////////////////////////
// # vaccinationDetails api 데이터 타입
interface DiseaseList {
    cd: number;
    cdNm: string;
}

interface DiseaseInfo {
    message: string;
    title: string;
}

////////////////////////////////////////////////////////////////////////////
// # vaccinationCenters 데이터 타입
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

////////////////////////////////////////////////////////////////////////////
// # 홈의 챗봇 기능
export interface Message {
    role: 'user' | 'assistant';
    content: string;
}
