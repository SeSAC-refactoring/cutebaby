import React from 'react';
import { Disease } from './Disease';
import { VaccineType } from './VaccineType';
import { DoseDate } from './DoseDate';
import { TotalDoses } from './TotalDoses';
import { VaccinationSchedule } from './VaccinationSchedule';

export const VaccinationTable = () => {
    return (
        <div>
            <h2>국가예방접종</h2>
            <div
                style={{
                    display: 'flex',
                }}
            >
                <Disease />
                <VaccineType />
                <TotalDoses />
                <div>
                    <DoseDate />
                    <VaccinationSchedule />
                </div>
            </div>
        </div>
    );
};
