import dateData from '../../../Data Transforms/data/studentStatsWithDates.json'
import * as d3 from 'd3';
import {useState} from 'react'

const MAX_COUNT = 178;

function fillMissingDays(studentDate) {
    const dataMap = new Map(
        studentDate.map(d => [
            new Date(d.date).toISOString().slice(0, 10),
            d.count
        ])
    );
    const start = new Date(`2024-01-01`);
    const end = new Date(`2024-12-31`);
    const result = [];
    let current = new Date(start);

    while (current <= end) {
        const iso = current.toISOString().slice(0, 10);
        result.push({
            date: new Date(current),
            count: dataMap.get(iso) || 0
        });
        current.setDate(current.getDate() + 1);
    }

    return result;
}

function mapToWeek(data) {
    const weeks = [];
    let week = [];
    let currMonth = data[0].date.getMonth();
    data.forEach((d, index) => {
        const day = d.date.getDay();
        if (week.length === 0 && day !== 0) {
            for (let i = 0; i < day; i++) {
                week.push(null)
            }
        }
        week.push(d);
        if (day === 6 || index === data.length - 1) {
            weeks.push({
                week,
                month: currMonth
            })
            week = [];
            if (index !== data.length - 1) {
                currMonth = data[index + 1].date.getMonth();
            }
        }
    })
    return weeks;
}

function detectMonthChange(heatmapData, i) {
    if (i === heatmapData.length - 1) return false;
    return heatmapData[i].month !== heatmapData[i + 1].month;
}

const colorInterpolator = d3.scaleLinear()
    .domain([Math.log(1), Math.log(MAX_COUNT)*2])
    .interpolate(d3.interpolateLab)
    .range(['#1a1a1a', '#7fffa7']);


function DateHeatmap({username}) {
    const [hoveringDate, setHoveringDate] = useState(null);
    const studentDate = dateData.find(student => student.username === username).dates;
    const filledData = fillMissingDays(studentDate);
    //console.log(filledData);
    const heatmapData = mapToWeek(filledData);
    //console.log(heatmapData);
    return (
        <div
            className={'flex flex-col items-center justify-center w-full p-3 border-1 border-[#414141] rounded-lg p-4 bg-[#2A2A2A] mt-6'}>
            <h3 className={'text-2xl font-semibold text-green-300'}>Date Heatmap</h3>
            <div className={'heatmap flex mt-6 w-full h-auto'}>
                <div className={'flex flex-col items-center justify-center mr-6'}>
                    <div className={'text-center text-xs font-semibold text-gray-400 mb-1'}>Sun</div>
                    <div className={'text-center text-xs font-semibold text-gray-400 mb-1'}>Mon</div>
                    <div className={'text-center text-xs font-semibold text-gray-400 mb-1'}>Tue</div>
                    <div className={'text-center text-xs font-semibold text-gray-400 mb-1'}>Wed</div>
                    <div className={'text-center text-xs font-semibold text-gray-400 mb-1'}>Thu</div>
                    <div className={'text-center text-xs font-semibold text-gray-400 mb-1'}>Fri</div>
                    <div className={'text-center text-xs font-semibold text-gray-400 mb-1'}>Sat</div>
                </div>
                {heatmapData.map((week, weekIndex) => (
                    <div key={weekIndex} className={`${detectMonthChange(heatmapData, weekIndex) ? 'mr-2' : 'mr-0.5'} flex flex-col w-full `}>
                        {week.week.map((d, index) => (
                            <>
                            <div key={index}
                                 className={
                                    `w-full aspect-square flex items-center justify-center m-0.5 rounded-sm`
                                 }
                                 style={{ backgroundColor: d ? (d.count !== 0 ? colorInterpolator(Math.log(d.count)*1.5) : '#1A1A1A') : 'transparent' }}
                                    onMouseEnter={() => {
                                        if (d) {
                                            setHoveringDate(d.date);
                                        }
                                    }}
                                    onMouseLeave={() => setHoveringDate(null)}
                            />
                                {hoveringDate && d && hoveringDate.toISOString().slice(0, 10) === d.date.toISOString().slice(0, 10) && (
                                    <div className={'absolute bg-gray-800 text-white text-xs p-1 rounded-md transform -translate-y-full mt-1'}>
                                        {d.date.toISOString().slice(0, 10)}: {d.count} submissions
                                    </div>
                                )}
                            </>
                        ))

                        }
                    </div>
                )
                )}
            </div>

        </div>
    )
}

export default DateHeatmap;