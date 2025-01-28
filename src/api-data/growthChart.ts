import getData, { convertToJson } from './getData';

const serviceKey =
    'aBW%2F97Bvvsc8asD9I8qq50bFJd%2BMkvUNbeUhxpW%2FFLTUBWclU%2BXPryRrW4tHSEeH%2Fui5x%2BmnZtb4dp%2BKVY3EyQ%3D%3D';

// 영유아성장도표 LMS기준
const growthChartLmsApi = `https://api.odcloud.kr/api/15133061/v1/uddi:eac44a07-6bc4-418a-9bcc-a3f359dbee0f?&serviceKey=${serviceKey}`;

export async function fetchGrowthChartLms() {
    try {
        const jsonData = await getData(growthChartLmsApi); // JSON 데이터 받기
        console.log('jsonData:', jsonData);

        if (jsonData) {
            // 필요한 데이터를 찾아서 return 해야함
            return jsonData.data;
        } else {
            console.error('API 호출 실패');
            return [];
        }
    } catch (error) {
        console.error('데이터 가져오는 중 오류 발생:', error);
        return [];
    }
}

// 영유아성장도표 백분위수기준
const growthChartPercentileApi = `https://api.odcloud.kr/api/15133055/v1/uddi:b858c6f8-ea3d-4bbf-bea1-a7fd5b3ce670?page=1&perPage=99&serviceKey=${serviceKey}`;

export async function fetchGrowthChartPercentile() {
    try {
        const jsonData = await getData(growthChartPercentileApi);
        if (jsonData) {
            return jsonData.data;
        } else {
            console.error('API 호출 실패');
            return [];
        }
    } catch (error) {
        console.error('데이터 가져오는 중 오류 발생:', error);
        return [];
    }
}
