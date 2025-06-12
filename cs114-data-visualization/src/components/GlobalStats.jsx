import {Chart as ReactChartJs} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import inversionRate from "../assets/inversionRate.png";

function sortStudentStatsByScore(studentStats, scoreName) {
    return studentStats.slice().sort((a, b) => a[scoreName] - b[scoreName]);
}

function GlobalStats({studentStats}) {
    const [chartData, setChartData] = useState(null);
    const [comparisonFeature, setComparisonFeature] = useState('totalSubmissions');
    const [scoreFeature, setScoreFeature] = useState('ck');
    const makeChartData = () => {
        const sortedStudentStats = sortStudentStatsByScore(studentStats, scoreFeature)
        const featureValues = sortedStudentStats.map((student) => student[comparisonFeature]);
        const scoreValues = sortedStudentStats.map((student) => student[scoreFeature]);
        const studentUsernames = sortedStudentStats.map((student) => student.username);
        setChartData({
            labels: studentUsernames,
            datasets: [
                {
                    label: 'Total Submissions',
                    data: featureValues,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    showLine: true,
                    borderWidth: 1,
                    yAxisID: 'y-right',
                    tension: 0.4,
                },
                {
                    label: 'CK Score',
                    data: scoreValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    yAxisID: 'y-left',
                    showLine: true,
                    tension: 0.4,
                }
            ]
        })
    }
    useEffect(() => {
        makeChartData();
    }, [comparisonFeature, scoreFeature, studentStats])
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                display: false,
                labels: {
                    font: {
                        size: 16,
                        family: 'Torus Pro',
                    },
                    color: 'white',
                }
            },
        },
        scales: {
            'y-left': {
                beginAtZero: true,
                ticks: {
                    color: '#b5b5b5',
                    font: {
                        size: 14,
                    }
                },
                position: 'left',
            },
            'y-right': {
                beginAtZero: true,
                ticks: {
                    callback: (value) => value,
                    color: '#b5b5b5',
                    font: {
                        size: 14,
                    }
                },
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                }
            },
            x: {
                ticks: {
                    display: false
                }
            }
        }
    };
    return (
        <main
            className='mx-20 border-1 flex flex-col items-center mt-8 mb-20 p-4 max-h-auto border-[#414141] rounded-lg bg-[#1A1A1A]'>
            <h1 className='text-4xl text-white mb-4'>Global Statistics</h1>
            {chartData && (
                <ReactChartJs
                    type={'line'}
                    data={chartData}
                    options={chartOptions}
                />
            )
            }
            <div className='flex justify-center mt-6'>
                <div className='flex flex-col items-center mr-10'>
                    <label className='text-[#9966ff] mb-2 text-xl font-semibold'>Comparison Feature</label>
                    <select
                        className='bg-[#2A2A2A] text-white border border-[#414141] rounded-lg p-2'
                        value={comparisonFeature}
                        onChange={(e) => setComparisonFeature(e.target.value)}
                    >
                        <option value='totalSubmissions'>Total Submissions</option>
                        <option value='problemTried'>Problem Tried</option>
                        <option value='problemSolved'>Problem Solved</option>
                        <option value='totalCompletionRateDelta'>Total Completion Rate Delta</option>
                        <option value='avgCompletionRateDelta'>Average Completion Rate Delta</option>
                        <option value='avgInverseSolvingRate'>Average Inverse Solving Rate</option>
                    </select>
                </div>
                <div className='flex flex-col items-center'>
                    <label className='text-[#4bc0c0] mb-2 text-xl font-semibold'>Score Feature</label>
                    <select
                        className='bg-[#2A2A2A] text-white border border-[#414141] rounded-lg p-2'
                        value={scoreFeature}
                        onChange={(e) => setScoreFeature(e.target.value)}
                    >
                        <option value='ck'>CK Score</option>
                        <option value='qt'>QT Score</option>
                        <option value='th'>TH Score</option>
                    </select>
                </div>

            </div>
            {comparisonFeature === 'avgInverseSolvingRate' && (
                <>
                    <div className={'flex flex-col justify-center items-center mt-4 w-fit'}>

                        <img src={inversionRate} alt='inversion rate bg-white rounded-lg'/>
                    </div>
                    <span className={'text-xl text-white mt-4'}>N: # of problems student solved (only count problems with studentTried ≥ 25)</span>
                    <span className={'text-white/40'}>chu thich vi roi qua, lo quen</span>
                </>
            )}
        </main>
    )
}

export default GlobalStats;