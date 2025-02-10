import React from 'react';
import { Disease } from './Disease';
import { VaccineType } from './VaccineType';
import { DoseDate } from './DoseDate';
import { TotalDoses } from './TotalDoses';
import { VaccinationSchedule } from './VaccinationSchedule';
import { VaccinationData } from '../../types';

interface VaccinationTableProps {
    selectedBabyVaccinationData: VaccinationData[];
}

export const VaccinationTable: React.FC<VaccinationTableProps> = ({
    selectedBabyVaccinationData,
}) => {
    return (
        <div
            style={
                {
                    // width: '1120px',
                }
            }
        >
            <div
                style={{
                    display: 'flex',
                    height: '492px',
                    overflow: 'auto',
                }}
            >
                <Disease />
                <VaccineType />
                <TotalDoses />
                <div>
                    <DoseDate />
                    <VaccinationSchedule
                        selectedBabyVaccinationData={
                            selectedBabyVaccinationData
                        }
                    />
                </div>
            </div>
        </div>
    );
};
