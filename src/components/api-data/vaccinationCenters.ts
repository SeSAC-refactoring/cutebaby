import getData, { convertToJson } from './getData';

// 예방접종 대상 감염병 기준 목록 (시, 도)조회
const provinceApi: string =
    'https://apis.data.go.kr/1790387/orglist3/getCondBrtcCd3?ServiceKey=aBW%2F97Bvvsc8asD9I8qq50bFJd%2BMkvUNbeUhxpW%2FFLTUBWclU%2BXPryRrW4tHSEeH%2Fui5x%2BmnZtb4dp%2BKVY3EyQ%3D%3D';
export async function fetchProvince() {
    try {
        const xmlData = await getData(provinceApi);
        if (xmlData) {
            const jsonData = convertToJson(xmlData); // XML -> JSON 변환
            return jsonData.response.body.items.item;
        } else {
            console.error('API 호출 실패');
            return [];
        }
    } catch (error) {
        console.error('데이터 가져오는 중 오류 발생:', error);
        return [];
    }
}

// 예방접종 대상 감염병 기준 목록 (시, 군, 구)조회
const cityApi = (cd: number): string => {
    return `https://apis.data.go.kr/1790387/orglist3/getCondSggCd3?serviceKey=aBW%2F97Bvvsc8asD9I8qq50bFJd%2BMkvUNbeUhxpW%2FFLTUBWclU%2BXPryRrW4tHSEeH%2Fui5x%2BmnZtb4dp%2BKVY3EyQ%3D%3D&brtcCd=${cd}`;
};
export async function fetchCity(cd: number) {
    try {
        const xmlData = await getData(cityApi(cd));

        if (xmlData) {
            const jsonData = convertToJson(xmlData); // XML -> JSON 변환
            return jsonData.response.body.items.item;
        } else {
            console.error('API 호출 실패');
            return {};
        }
    } catch (error) {
        console.error('데이터 가져오는 중 오류 발생:', error);
        return {};
    }
}

// 어린이 국가예방접종 위탁의료기관 조회
// `https://apis.data.go.kr/1790387/orglist3/getOrgList3?serviceKey=aBW%2F97Bvvsc8asD9I8qq50bFJd%2BMkvUNbeUhxpW%2FFLTUBWclU%2BXPryRrW4tHSEeH%2Fui5x%2BmnZtb4dp%2BKVY3EyQ%3D%3D&pageNo=${페이지수}&numOfRows=${한 페이지당 표출 데이터 수}&brtcCd=${시도}&sggCd=${시군구}&searchTpcd=${ORG / ADDR}&searchWord=${searchWord}`

const vaccinationDiseaseInfoApi = (
    pagenumber: number,
    province: number,
    city: number,
    searchType: string = '',
    searchWord: string = ''
): string => {
    // 검색유형과 검색어가 없을 때 처리
    const searchParams =
        searchType && searchWord
            ? `&searchTpcd=${searchType}&searchWord=${searchWord}`
            : '';
    return `https://apis.data.go.kr/1790387/orglist3/getOrgList3?serviceKey=aBW%2F97Bvvsc8asD9I8qq50bFJd%2BMkvUNbeUhxpW%2FFLTUBWclU%2BXPryRrW4tHSEeH%2Fui5x%2BmnZtb4dp%2BKVY3EyQ%3D%3D&pageNo=${pagenumber}&numOfRows=10&brtcCd=${province}&sggCd=${city}${searchParams}`;
};

export async function fetchVaccinationCenters(
    pagenumber: number,
    province: number,
    city: number,
    searchType: string = '',
    searchWord: string = ''
) {
    try {
        const xmlData = await getData(
            vaccinationDiseaseInfoApi(
                pagenumber,
                province,
                city,
                searchType,
                searchWord
            )
        );

        if (xmlData) {
            const jsonData = convertToJson(xmlData); // XML -> JSON 변환
            return jsonData.response.body.items.item;
        } else {
            console.error('API 호출 실패');
            return {};
        }
    } catch (error) {
        console.error('데이터 가져오는 중 오류 발생:', error);
        return {};
    }
}
