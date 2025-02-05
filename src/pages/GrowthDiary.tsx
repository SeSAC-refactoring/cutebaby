import { DiaryChart } from '../components/growth-diary-page/DiaryChart';
import { GrowthCalculate } from '../components/growth-diary-page/GrowthCalculate';
import { DiaryTable } from '../components/growth-diary-page/DiaryTable';
import { BabyList } from '../components/commons/BabyList';
import { DiaryInputArea } from '../components/growth-diary-page/DiaryInputArea';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useSelectBaby } from '../hooks/useSelectBaby';

export default function GrowthDiary() {
    const { babyInfo, nothingBaby } = useSelector(
        (state: RootState) => state.baby
    );
    const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);

    return (
        <>
            <div>
                <div>
                    <p>성장기록</p>
                    <p>우리 아이의 성장을 기록하고 상태를 확인해보세요 :)</p>
                </div>
                <button>성장상태 계산</button>
            </div>
            <div>
                <BabyList
                    babyInfo={babyInfo}
                    nothingBaby={nothingBaby}
                    handleSelectBaby={handleSelectBaby}
                    selectedBabyId={selectedBabyId}
                />
                <div>
                    <div>
                        <DiaryInputArea />
                        <button>+ 기록추가</button>
                    </div>

                    <DiaryTable
                        babyInfo={babyInfo}
                        nothingBaby={nothingBaby}
                        selectedBabyId={selectedBabyId}
                    />
                    <DiaryChart />
                </div>
            </div>

            {/* 계산하는 페이지 / 모달 예정??  */}
            <br />
            <hr />
            <GrowthCalculate />
        </>
    );
}
