import getData, { convertToJson } from './getData';

// 예방접종 대상 감염병 기준 목록 조회
const vaccinationDiseaseListApi: string =
    'http://apis.data.go.kr/1790387/vcninfo/getCondVcnCd?serviceKey=aBW%2F97Bvvsc8asD9I8qq50bFJd%2BMkvUNbeUhxpW%2FFLTUBWclU%2BXPryRrW4tHSEeH%2Fui5x%2BmnZtb4dp%2BKVY3EyQ%3D%3D';

// 데이터 가져오기
export async function fetchVaccinationDiseaseList() {
    try {
        const xmlData = await getData(vaccinationDiseaseListApi);
        if (xmlData) {
            const jsonData = convertToJson(xmlData); // XML -> JSON 변환
            return jsonData.response.body.items.item; // vaccinationDiseaseList 반환
        } else {
            console.error('API 호출 실패');
            return [];
        }
    } catch (error) {
        console.error('데이터 가져오는 중 오류 발생:', error);
        return [];
    }
}
